const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}

const greek = /[Α-Ωα-ωΆ-ώ]/;

function stripTranslationDictionaries(source) {
  return source
    .replace(/const translations = \{[\s\S]*?\n\};\n/, '')
    .replace(/translations\.el = \{[\s\S]*?\n\};\n/, '')
    .replace(/legacyDefaultAccountNames = \[[^\]]*\]/, 'legacyDefaultAccountNames = []')
    .replace(/legacy: \[[^\]]*\]/g, 'legacy: []');
}

const appLogic = stripTranslationDictionaries(js);

const renderFunctionPattern = /function (render\w+|smartInsightMessages|applyStaticTranslations|show\w+Message)\([^)]*\) \{[\s\S]*?\n\}/g;
const renderBodies = [...appLogic.matchAll(renderFunctionPattern)].map((match) => match[0]);
assert(renderBodies.length > 0, 'render helpers must exist for i18n audit');
renderBodies.forEach((body) => {
  assert(!greek.test(body), `English render helpers must not contain hardcoded Greek UI text: ${body.slice(0, 80)}...`);
});

const addSection = html.match(/<section id="add"[\s\S]*?<\/section>/)?.[0] || '';
['Type', 'Amount (€)', 'Category', 'Account', 'Note', 'Date', 'Repeats monthly'].forEach((label) => {
  assert(addSection.includes(label), `English add form must include ${label}`);
});
['Τύπος', 'Ποσό', 'Κατηγορία', 'Λογαριασμός', 'Σημείωση', 'Ημερομηνία', 'Επαναλαμβάνεται'].forEach((label) => {
  assert(!addSection.includes(label), `English add form must not include Greek label ${label}`);
});

assert(/function getLocalizedCategoryName\(category, type = ""\)/.test(js), 'getLocalizedCategoryName helper is required');
assert(/function getLocalizedAccountName\(account\)/.test(js), 'getLocalizedAccountName helper is required');
assert(/legacyDefaultAccountNames/.test(js), 'legacy default account names must be recognized');

const sandbox = { Date, Intl };
vm.createContext(sandbox);
vm.runInContext(`
const today = new Date('2026-07-08T12:00:00');
const activeLanguage = 'en';
const translations = {
  en: {
    defaultCategoryTransport: 'Transport',
    defaultCategorySalary: 'Salary',
    defaultCategoryBills: 'Bills',
    defaultCategoryCoffee: 'Coffee',
    defaultAccountName: 'Main account',
    other: 'Other',
    biggestCategoryInsight: 'Biggest {category}',
    noExpenseInsight: 'No expenses',
    positiveBalanceInsight: 'Positive',
    income: 'Income',
    expense: 'Expense',
  },
};
function currentLanguage() { return activeLanguage; }
function t(key, params = {}) {
  const value = translations.en[key] ?? key;
  return String(value).replace(/\\{(\\w+)\\}/g, (_, name) => params[name] ?? '');
}
const defaultCategoryDefinitions = {
  expense: [
    { id: 'transport', key: 'defaultCategoryTransport', legacy: ['Transport', 'Μεταφορές'] },
    { id: 'bills', key: 'defaultCategoryBills', legacy: ['Bills', 'Λογαριασμοί'] },
    { id: 'coffee', key: 'defaultCategoryCoffee', legacy: ['Coffee', 'Καφές'] },
    { id: 'other', key: 'other', legacy: ['Other', 'Άλλο'] },
  ],
  income: [
    { id: 'salary', key: 'defaultCategorySalary', legacy: ['Salary', 'Μισθός'] },
    { id: 'other', key: 'other', legacy: ['Other', 'Άλλο'] },
  ],
};
const legacyDefaultAccountNames = ['Μετρητά', 'Κύριος λογαριασμός', 'Main account'];
const defaultAccountId = 'acc_default_cash';
function formatDateInputValue(date) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); return year + '-' + month + '-' + day; }
function parseLocalDate(dateValue) { const date = new Date(String(dateValue) + 'T00:00:00'); return Number.isNaN(date.getTime()) ? null : date; }
function localDateOnly(dateValue = new Date()) { if (dateValue instanceof Date) return formatDateInputValue(dateValue); const parsed = parseLocalDate(dateValue); return parsed ? formatDateInputValue(parsed) : ''; }
function todayInputValue() { return localDateOnly(today); }
function isEffectiveTransactionDate(dateValue) { const transactionDate = localDateOnly(dateValue); return Boolean(transactionDate) && transactionDate <= localDateOnly(today); }
function isTransactionEffective(transactionDate) { return isEffectiveTransactionDate(transactionDate); }
${js.match(/function normalizedCategoryName\(category\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function normalizedAccountName\(name\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function defaultCategoryDefinition\(category, type\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function getLocalizedCategoryName\(category, type = ""\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function isLegacyDefaultAccount\(account\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function getLocalizedAccountName\(account\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function recurringDisplayDate\(startDate, year, month\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function normalizeMatchText\(value\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function transactionRecurringSourceId\(transaction\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function transactionAccountMatchKey\(transaction\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function selectedMonthTransactions\(includeFuture = false\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function transactionsMatchRecurringOccurrence\(recurringOccurrence, recordedTransaction\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function recordedTransactionExistsForRecurringOccurrence\(recurringOccurrence\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function upcomingTransactionsForSelectedMonth\(\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function sumByType\(transactions, type\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function smartInsightMessages\(stats\) \{[\s\S]*?\n\}/)[0]}
const state = {
  selectedMonth: new Date(2026, 6, 1),
  transactions: [
    { id: 'base', type: 'income', amount: 653, category: 'Initial', date: '2026-07-08', recurring: false, accountId: 'main' },
    { id: 'salary', type: 'income', amount: 2000, category: 'Salary', date: '2026-07-09', recurring: true, accountId: 'main' },
  ],
  accounts: [{ id: 'main', name: 'Main account', startingBalance: 0, archived: false }],
};
function selectedMonthStatus() { return 'current'; }
function accountTransactionsThroughDate(endDate) {
  const endDateOnly = localDateOnly(endDate);
  return state.transactions.flatMap((transaction) => {
    const originalDate = parseLocalDate(transaction.date);
    if (!originalDate || localDateOnly(originalDate) > endDateOnly) return [];
    if (!transaction.recurring) return [{ ...transaction }];
    const occurrences = [];
    for (let cursor = new Date(originalDate.getFullYear(), originalDate.getMonth(), 1); cursor <= endDate; cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)) {
      const displayDate = recurringDisplayDate(transaction.date, cursor.getFullYear(), cursor.getMonth());
      if (isEffectiveTransactionDate(displayDate) && displayDate <= endDateOnly) {
        occurrences.push({ ...transaction, displayDate, isVirtualRecurring: true });
      }
    }
    return occurrences;
  });
}
function totalAvailableAccountBalance(accounts, transactions) {
  return transactions.reduce((sum, transaction) => sum + (transaction.type === 'income' ? transaction.amount : -transaction.amount), 0);
}
function euroFormat(value) { return '€' + Number(value).toFixed(2); }
const euro = { format: euroFormat };
this.currentBalance = totalAvailableAccountBalance(state.accounts, accountTransactionsThroughDate(today));
this.upcoming = upcomingTransactionsForSelectedMonth();
this.expectedIncome = sumByType(this.upcoming, 'income');
this.forecast = this.currentBalance + this.expectedIncome - sumByType(this.upcoming, 'expense');
this.insights = smartInsightMessages({
  expenses: 100,
  biggestExpenseCategory: 'transport',
  averageDailyExpense: 10,
  exceededBudgetsCount: 0,
  balance: 50,
});
this.localizedDefaults = {
  transport: getLocalizedCategoryName('Μεταφορές', 'expense'),
  salary: getLocalizedCategoryName('Μισθός', 'income'),
  bills: getLocalizedCategoryName('Λογαριασμοί', 'expense'),
  coffee: getLocalizedCategoryName('Καφές', 'expense'),
};
this.customCategory = getLocalizedCategoryName('Ταβέρνα', 'expense');
this.localizedDefaultAccount = getLocalizedAccountName({ id: defaultAccountId, name: 'Κύριος λογαριασμός' });
`, sandbox);

assert(sandbox.currentBalance === 653, 'future recurring income tomorrow must not affect current balance');
assert(sandbox.expectedIncome === 2000, 'future recurring income tomorrow must appear in expected income');
assert(sandbox.forecast === 2653, 'forecast must include future recurring income');
assert(sandbox.upcoming.some((transaction) => transaction.type === 'income' && transaction.amount === 2000 && transaction.displayDate === '2026-07-09'), 'upcoming list must include tomorrow recurring income');
assert(sandbox.localizedDefaults.transport === 'Transport', 'Μεταφορές must display as Transport in English');
assert(sandbox.localizedDefaults.salary === 'Salary', 'Μισθός must display as Salary in English');
assert(sandbox.localizedDefaults.bills === 'Bills', 'Λογαριασμοί must display as Bills in English');
assert(sandbox.localizedDefaults.coffee === 'Coffee', 'Καφές must display as Coffee in English');
assert(sandbox.customCategory === 'Ταβέρνα', 'custom categories must remain unchanged');
assert(sandbox.localizedDefaultAccount === 'Main account', 'legacy default account must localize in English');
sandbox.insights.forEach((message) => {
  assert(!greek.test(message), `dashboard insight messages must not contain Greek in English mode: ${message}`);
});

console.log('✅ professional i18n and upcoming smoke check passed');
