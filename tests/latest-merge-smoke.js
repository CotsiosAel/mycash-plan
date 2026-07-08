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

assert(/<article class="card language-card">[\s\S]*<select id="languageSelect">[\s\S]*<option value="en" data-i18n="english">English<\/option>[\s\S]*<option value="el" data-i18n="greek">Greek<\/option>/i.test(html), 'Settings must render a visible English/Greek language selector');
assert(/language:\s*"mycash-plan-language"/.test(js), 'language storage key is missing');
assert(/localStorage\.setItem\(storageKeys\.language, activeLanguage\)/.test(js), 'selected language must be saved to localStorage');
assert(/function isEffectiveTransactionDate\(dateValue\)/.test(js), 'shared effective transaction date helper is missing');
assert(/function accountBalance\([\s\S]*?isEffectiveTransactionDate\(transaction\.displayDate \|\| transaction\.date\)/.test(js), 'account balances must filter future-dated transactions');

const sandbox = { Date };
vm.createContext(sandbox);
vm.runInContext(`
  function formatDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
  function parseLocalDate(dateValue) {
    const date = new Date(String(dateValue) + "T00:00:00");
    return Number.isNaN(date.getTime()) ? null : date;
  }
  ${js.match(/function localDateOnly\(dateValue = new Date\(\)\) \{[\s\S]*?\n\}/)[0]}
  ${js.match(/function isEffectiveTransactionDate\(dateValue\) \{[\s\S]*?\n\}/)[0]}
`, sandbox);

assert(sandbox.isEffectiveTransactionDate('2026-07-08'), 'today should be effective');
assert(!sandbox.isEffectiveTransactionDate('2999-07-09'), 'future transaction should not be effective');

console.log('✅ latest merge smoke check passed');
