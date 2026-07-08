const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}

assert(/id="budgetAlertToast"/.test(html), 'budget alert toast element is missing from index.html');
assert(/role="alert"/.test(html), 'budget alert toast must use role="alert" for immediate in-app announcement');
assert(/\.budget-alert-toast\s*\{[^}]*position:\s*fixed/i.test(css), 'budget alert toast must be fixed above the app UI');
assert(/\.budget-alert-toast\[hidden\]\s*\{[^}]*display:\s*none/i.test(css), 'hidden budget alert CSS rule is missing');
assert(/z-index:\s*(1[0-9]{2,}|[2-9][0-9]{2,})/i.test(css.match(/\.budget-alert-toast\s*\{[^}]*\}/i)?.[0] || ''), 'budget alert toast z-index must be high enough to stay above mobile UI');

const showMatch = js.match(/function showBudgetAlert\(alert\) \{[\s\S]*?\n\}/);
assert(showMatch, 'showBudgetAlert function is missing');

const toast = { textContent: '', className: '', hidden: true };
const sandbox = {
  elements: { budgetAlertToast: toast },
  clearTimeout,
  setTimeout: () => 1,
};
vm.createContext(sandbox);
vm.runInContext(`${showMatch[0]}; showBudgetAlert({ level: 'danger', message: 'Ξεπέρασες το όριο για Φαγητό κατά €20.' });`, sandbox);

assert(toast.hidden === false, 'showBudgetAlert did not make the DOM toast visible');
assert(toast.textContent === 'Ξεπέρασες το όριο για Φαγητό κατά €20.', 'showBudgetAlert did not write the expected alert text');
assert(/danger/.test(toast.className), 'showBudgetAlert did not apply the alert level class');

const defaultExpenseMatch = js.match(/const defaultExpenseCategories = defaultCategoryDefinitions\.expense\.map/);
const defaultIncomeMatch = js.match(/const defaultIncomeCategories = defaultCategoryDefinitions\.income\.map/);
const categoryOptionsMatch = js.match(/function updateCategoryOptions\(selectedValue = elements\.category\.value\) \{[\s\S]*?\n\}/);
const syncAddFormMatch = js.match(/function syncAddTransactionForm\(selectedCategory = elements\.category\.value\) \{[\s\S]*?\n\}/);
assert(defaultExpenseMatch, 'default expense categories are missing from app.js');
assert(defaultIncomeMatch, 'default income categories are missing from app.js');
assert(categoryOptionsMatch, 'updateCategoryOptions function is missing');
assert(syncAddFormMatch, 'syncAddTransactionForm function is missing');

const categorySelect = { value: '', innerHTML: '' };
const categorySandbox = {
  defaultExpenseCategories: ['home', 'food', 'coffee', 'supermarket', 'transport', 'bills', 'entertainment', 'health', 'child', 'pet', 'other'],
  defaultIncomeCategories: ['salary', 'business', 'gift', 'sale', 'other'],
  getLocalizedCategoryName: (category) => category,
  canonicalCategoryName: (category) => category,
  state: { customCategories: { income: [], expense: [] } },
  elements: {
    type: { value: 'expense' },
    category: categorySelect,
    categoryLabel: { hidden: false },
    accountLabel: { hidden: false },
    recurring: { closest: () => ({ hidden: false }) },
    transferFields: { hidden: true },
    account: { required: true },
  },
  escapeHtml: (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;",
  })[character]),
};

vm.createContext(categorySandbox);
vm.runInContext(`
  function allCategoriesForType(type) {
    const defaults = type === "expense" ? defaultExpenseCategories : defaultIncomeCategories;
    const custom = state?.customCategories?.[type] || [];
    return [...new Set([...defaults, ...custom])];
  }
  function normalizedTransactionType(type) {
    return type === "income" ? "income" : "expense";
  }
  function categoriesForType(type) {
    return allCategoriesForType(normalizedTransactionType(type));
  }
  function updateTransactionTypeUi() {
    const isTransfer = elements.type.value === "transfer";
    elements.categoryLabel.hidden = isTransfer;
    elements.accountLabel.hidden = isTransfer;
    elements.recurring.closest("label").hidden = isTransfer;
    elements.transferFields.hidden = !isTransfer;
    elements.category.required = !isTransfer;
    elements.account.required = !isTransfer;
  }
  ${categoryOptionsMatch[0]}
  ${syncAddFormMatch[0]}
  function render() {
    syncAddTransactionForm();
  }
`, categorySandbox);

vm.runInContext(`elements.type.value = "expense"; elements.category.value = "salary"; render();`, categorySandbox);
assert(categorySelect.value === categorySandbox.defaultExpenseCategories[0], 'expense type should auto-correct an income category to the first expense category');
assert(!categorySelect.innerHTML.includes('value="salary"'), 'expense category dropdown must not include the income category "Μισθός"');

vm.runInContext(`elements.type.value = "income"; updateCategoryOptions("food");`, categorySandbox);
assert(categorySelect.value === categorySandbox.defaultIncomeCategories[0], 'income type should auto-correct an expense category to the first income category');
assert(!categorySelect.innerHTML.includes('value="food"'), 'income category dropdown must not include the expense category "Φαγητό"');

console.log('✅ budget alert smoke check passed');
