const fs = require('fs');
const path = require('path');

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
assert(!greek.test(html), 'English default HTML must not contain Greek app-generated UI text');
assert(/data-i18n=/.test(html), 'Static HTML must declare data-i18n keys');
assert(/data-i18n-placeholder=/.test(html), 'Static HTML placeholders must declare data-i18n-placeholder keys');
assert(/data-i18n-aria-label=/.test(html), 'Static HTML aria labels must declare data-i18n-aria-label keys');
assert(/function applyStaticTranslations\(\) \{[\s\S]*?querySelectorAll\("\[data-i18n\]"\)/.test(js), 'applyStaticTranslations must translate data-i18n elements generically');
assert(/querySelectorAll\("\[data-i18n-placeholder\]"\)/.test(js), 'applyStaticTranslations must translate placeholders generically');
assert(/querySelectorAll\("\[data-i18n-aria-label\]"\)/.test(js), 'applyStaticTranslations must translate aria labels generically');
assert(/localStorage\.setItem\(storageKeys\.language, activeLanguage\)/.test(js), 'Language choice must persist to localStorage');
assert(/defaultCategoryDefinitions/.test(js) && /id: "transport"/.test(js) && /id: "salary"/.test(js), 'Default categories must use stable ids');
assert(/legacy: \["Transport", "Μεταφορές"\]/.test(js), 'Greek legacy default categories must be recognized for migration/display');
assert(/return definition \? definition\.id : name;/.test(js), 'Default categories must canonicalize to stable ids without rewriting custom names');
assert(/getLocalizedCategoryName\(category, type = ""\)/.test(js), 'Default and legacy category display must be localized through getLocalizedCategoryName');

console.log('✅ i18n guard smoke check passed');
