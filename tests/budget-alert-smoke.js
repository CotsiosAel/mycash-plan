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
console.log('✅ budget alert smoke check passed');
