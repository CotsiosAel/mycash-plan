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

const addSection = html.match(/<section id="add"[\s\S]*?<\/section>/)?.[0] || '';
assert(addSection, 'Add transaction screen markup must exist');
['Type', 'Amount (€)', 'Category', 'Account', 'Note', 'Date', 'Repeats monthly'].forEach((label) => {
  assert(addSection.includes(label), `English Add transaction screen must render ${label}`);
});
['Τύπος', 'Ποσό', 'Κατηγορία', 'Λογαριασμός', 'Σημείωση', 'Ημερομηνία', 'Επαναλαμβάνεται'].forEach((label) => {
  assert(!addSection.includes(label), `English Add transaction screen must not render Greek label ${label}`);
});

assert(/localStorage\.setItem\(storageKeys\.language, activeLanguage\)/.test(js), 'language switching must persist to localStorage');
assert(/let activeLanguage = localStorage\.getItem\(storageKeys\.language\) \|\| "en"/.test(js), 'language must be restored from localStorage on reopen');
assert(/function setControlLabelText\(controlId, key\)/.test(js), 'Add transaction labels must be translated through actual control labels');
assert(!/label:has\(#(?:type|amount|note|date)\)/.test(js), 'Add transaction labels must not depend on CSS :has selectors');

const sandbox = { Date, Intl };
vm.createContext(sandbox);
vm.runInContext(`
const today = new Date('2026-07-08T12:00:00');
const state = {
  selectedMonth: new Date(2026, 6, 1),
  transactions: [
    { id: 'base', type: 'income', amount: 653, category: 'Initial', date: '2026-07-08', recurring: false, accountId: 'main' },
    { id: 'salary', type: 'income', amount: 2000, category: 'Salary', date: '2026-07-09', recurring: true, accountId: 'main' },
  ],
  accounts: [{ id: 'main', name: 'Main account', startingBalance: 0, archived: false }],
};
function formatDateInputValue(date) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); return year + '-' + month + '-' + day; }
function parseLocalDate(dateValue) { const date = new Date(String(dateValue) + 'T00:00:00'); return Number.isNaN(date.getTime()) ? null : date; }
function localDateOnly(dateValue = new Date()) { if (dateValue instanceof Date) return formatDateInputValue(dateValue); const parsed = parseLocalDate(dateValue); return parsed ? formatDateInputValue(parsed) : ''; }
function todayInputValue() { return localDateOnly(today); }
function isEffectiveTransactionDate(dateValue) { const transactionDate = localDateOnly(dateValue); return Boolean(transactionDate) && transactionDate <= localDateOnly(today); }
function isTransactionEffective(transactionDate) { return isEffectiveTransactionDate(transactionDate); }
function recurringDisplayDate(startDate, year, month) { const originalDate = new Date(String(startDate) + 'T00:00:00'); const day = originalDate.getDate(); const lastDayOfSelectedMonth = new Date(year, month + 1, 0).getDate(); return formatDateInputValue(new Date(year, month, Math.min(day, lastDayOfSelectedMonth))); }
function normalizeMatchText(value) { return String(value || '').trim().toLocaleLowerCase('el-GR').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/\\s+/g, ' '); }
function transactionRecurringSourceId(transaction) { return transaction.recurringSourceId || transaction.sourceRecurringId || transaction.sourceId || transaction.parentRecurringId || transaction.generatedFromId || ''; }
function transactionAccountMatchKey(transaction) { return [transaction.accountId || '', transaction.fromAccountId || '', transaction.toAccountId || ''].join('|'); }
${js.match(/function selectedMonthTransactions\(includeFuture = false\) \{[\s\S]*?\n\}/)[0]}
function selectedMonthStatus() { return 'current'; }
${js.match(/function transactionsMatchRecurringOccurrence\(recurringOccurrence, recordedTransaction\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function recordedTransactionExistsForRecurringOccurrence\(recurringOccurrence\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function upcomingTransactionsForSelectedMonth\(\) \{[\s\S]*?\n\}/)[0]}
${js.match(/function sumByType\(transactions, type\) \{[\s\S]*?\n\}/)[0]}
function accountTransactionsThroughDate(endDate) { return state.transactions.filter((transaction) => isEffectiveTransactionDate(transaction.date)); }
function totalAvailableAccountBalance(accounts, transactions) { return transactions.reduce((sum, transaction) => sum + (transaction.type === 'income' ? transaction.amount : -transaction.amount), 0); }
this.currentBalance = totalAvailableAccountBalance(state.accounts, accountTransactionsThroughDate(today));
this.upcoming = upcomingTransactionsForSelectedMonth();
this.expectedIncome = sumByType(this.upcoming, 'income');
this.forecast = this.currentBalance + this.expectedIncome - sumByType(this.upcoming, 'expense');
this.upcomingIncomeLine = this.upcoming.find((transaction) => transaction.type === 'income');
`, sandbox);

assert(sandbox.currentBalance === 653, 'future income tomorrow must not affect current balance');
assert(sandbox.expectedIncome === 2000, 'future income tomorrow must appear in Expected income');
assert(sandbox.forecast === 2653, 'forecast must include future income');
assert(sandbox.upcomingIncomeLine.category === 'Salary' && sandbox.upcomingIncomeLine.amount === 2000 && sandbox.upcomingIncomeLine.displayDate === '2026-07-09', 'upcoming income list data must include Salary, €2,000.00, and 2026-07-09');

console.log('✅ upcoming transactions and language smoke check passed');
