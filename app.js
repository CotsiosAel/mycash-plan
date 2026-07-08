const appVersion = "2.3.4";

const storageKeys = {
  transactions: "mycash-plan-transactions",
  goals: "mycash-plan-goals",
  budgets: "mycash-plan-budgets",
  security: "mycash-plan-security",
  sessionUnlocked: "mycash-plan-session-unlocked",
  customCategories: "mycash-plan-custom-categories",
  onboardingSeen: "mycash-plan-onboarding-seen",
  accounts: "mycash-plan-accounts",
  language: "mycash-plan-language",
};

const defaultAccountName = "Main account";
const legacyDefaultAccountName = "Μετρητά";
const defaultAccountId = "acc_default_cash";

const translations = {
  en: {
    appDescription: "MyCash Plan - personal financial planning in euros.", personalCash: "Personal cash flow", lockNow: "Lock now", mainNavigation: "Main navigation", dashboard: "Dashboard", home: "Home", add: "Add", history: "History", goals: "Goals", settings: "Settings",
    selectDashboardMonth: "Select dashboard month", selectHistoryMonth: "Select history month", previousMonth: "Previous month", nextMonth: "Next month", monthlyBalance: "Monthly balance", monthIncome: "Monthly income", monthExpenses: "Monthly expenses", accountBalances: "Account balances", upcomingTransactions: "Upcoming transactions", monthlyStats: "Monthly statistics", expensesByCategory: "Expenses by category", monthlyBudgets: "Monthly budgets", savingsProgress: "Savings progress", setGoalStart: "Set a goal to get started.", friendlyDefault: "Let's organize your money calmly.", noActiveAccounts: "There are no active accounts.", totalAvailableBalance: "Total available balance", notMonthlyIncome: "Does not count as monthly income.", expectedIncome: "Expected income", expectedExpenses: "Expected expenses", forecastAfterUpcoming: "Forecast after upcoming transactions", upcomingHelper: "Only transactions that have not been recorded yet are shown.", noUpcomingPast: "There are no upcoming transactions for a past month.", noUpcomingMonth: "There are no upcoming transactions for this month.", monthly: "Monthly", dueSoon: "Due soon", record: "Record", more: "more", alreadyRecorded: "This transaction has already been recorded.", upcomingRecorded: "The upcoming transaction was recorded.", defaultBadge: "Default", categoriesCount: "{count} categories", archived: "Archived", rename: "Rename", archive: "Archive", dueDateDetails: "{name} — {amount} — {date}",
    newTransaction: "New transaction", editTransaction: "Edit transaction", type: "Type", income: "Income", expense: "Expense", transfer: "Transfer", amount: "Amount (€)", category: "Category", account: "Account", fromAccount: "From account", toAccount: "To account", note: "Note", optionalDescription: "Optional description", date: "Date", recurringMonthly: "Repeats monthly", save: "Save", saveChanges: "Save changes", cancelEdit: "Cancel edit", transactionAdded: "Transaction added successfully.", changesSaved: "Changes saved successfully.", edit: "Edit", delete: "Delete", confirmDeleteRecurring: "This transaction repeats every month. Are you sure you want to delete it?", confirmDeleteTransaction: "Are you sure you want to delete this transaction?",
    historyMonthSummary: "Monthly history summary", advancedFilters: "Advanced history filters", searchTransactions: "Search transactions", searchTransactionsPlaceholder: "Search transactions...", transactionTypeFilter: "Transaction type filter", categoryFilter: "Transaction category filter", accountFilter: "Account filter", recurringFilter: "Monthly transaction filter", all: "All", allCategories: "All categories", allAccounts: "All accounts", recurring: "Monthly", oneTime: "One-time", clearFilters: "Clear filters", balance: "Balance", noTransactionsMonth: "There are no transactions for this month.", addIncomeExpenseStart: "Add income or expenses to get started.", noFilteredTransactions: "No transactions found with these filters.", tryDifferentSearch: "Try a different search or clear the filters.", transactions: "Transactions",
    categoryBudgets: "Budgets by category", setMonthlyLimit: "Set a monthly expense limit for each category.", saveBudgets: "Save budgets", savingsGoal: "Savings goal (€)", currentSaved: "Current saved amount (€)", updateGoal: "Update goal", noGoal: "No goal has been set yet.", savedOfGoal: "You have saved {saved} of {goal}.", budgetsSavedHint: "Set budgets from Goals to track your limits.", withinBudget: "Within budget", nearLimit: "Near limit", overBudget: "Over budget", spentOf: "{spent} of {budget}",
    appInfo: "App information", version: "Version", localData: "Your data is stored locally on your device.", syncFuture: "Account sync will be added in a future release.", checkUpdate: "Check for updates", security: "App security", pinHelp: "Set a PIN to protect your financial information.", walletsAccounts: "Wallets & Accounts", organizeMoney: "Organize where your money is.", accountName: "Account name", accountNamePlaceholder: "e.g. Main account, Revolut, Bank", accountType: "Type", cash: "Cash", bank: "Bank", card: "Card", savings: "Savings", other: "Other", startingBalance: "Starting balance", addAccount: "Add account", backupExport: "Backup & data export", backupHelp: "Your data is stored locally on your device. Keep a backup if you change device or browser.", downloadBackup: "Download backup", exportCsv: "Export CSV", restoreBackup: "Restore from backup", categories: "Categories", customCategoriesHelp: "Create your own categories for income and expenses.", categoryType: "Category type", categoryName: "Category name", categoryNamePlaceholder: "e.g. Gym, Delivery, Fuel", addCategory: "Add category", incomeCategories: "Income categories", expenseCategories: "Expense categories", openList: "Open list", dataManagement: "Data management", deleteDataHelp: "Delete transactions, goals, budgets and custom categories from this device.", clearAllData: "Delete all data", language: "Language", english: "English", greek: "Ελληνικά", languageSaved: "Language saved.", dataCleared: "Data was deleted.", updateChecked: "Update check completed.", updateCheckFailed: "Could not check for updates.", backupCreated: "Backup was created successfully.", csvCreated: "CSV was created successfully.", invalidBackup: "The backup file is not valid.", backupRestored: "Backup restored successfully.",
    welcome: "Welcome to MyCash Plan", onboardingText1: "Track income, expenses, budgets and savings goals.", onboardingText2: "Your data stays on your device. Keep a backup from Settings.", getStarted: "Get started", enterPin: "Enter PIN", unlock: "Unlock", wrongPin: "Wrong PIN. Try again.", default: "Default", archived: "Archived", rename: "Rename", archive: "Archive", appLocked: "PIN is active", enablePin: "Enable PIN", confirmPin: "Confirm PIN", changePin: "Change PIN", disablePin: "Disable PIN", currentPin: "Current PIN", newPin: "New PIN", confirmNewPin: "Confirm new PIN", saveNewPin: "Save new PIN",
    defaultCategoryHome: "Home", defaultCategoryFood: "Food", defaultCategoryCoffee: "Coffee", defaultCategorySupermarket: "Supermarket", defaultCategoryTransport: "Transport", defaultCategoryBills: "Bills", defaultCategoryEntertainment: "Entertainment", defaultCategoryHealth: "Health", defaultCategoryChild: "Child", defaultCategoryPet: "Pet", defaultCategorySalary: "Salary", defaultCategoryBusiness: "Business", defaultCategoryGift: "Gift", defaultCategorySale: "Sale", defaultExpenseCategories: ["Home", "Food", "Coffee", "Supermarket", "Transport", "Bills", "Entertainment", "Health", "Child", "Pet", "Other"], defaultIncomeCategories: ["Salary", "Business", "Gift", "Sale", "Other"], duplicateAccountWarning: "Similar accounts were found. You can archive the one you do not use.", defaultAccountName: "Main account", transferCategory: "Transfer", noExpensesMonth: "There are no expenses for this month. Good start!", noStats: "There is not enough data for this month's statistics.", biggestCategory: "Biggest category", totalIncome: "Total income", totalExpenses: "Total expenses", averageDailyExpense: "Average daily expense", exceededBudgets: "Exceeded budgets", whereExpensesWent: "Where expenses went", statsHelper: "Percentage of total monthly expenses.", noCategoryAnalysis: "There are no expenses for category analysis.", startFirstTransaction: "Start by adding your first income or expense.", positiveBalance: "Great! You are keeping a positive balance this month.", negativeBalance: "Warning: expenses exceed income. Small changes help.", evenBalance: "Income and expenses are balanced this month.", transactionSaved: "Transaction saved successfully.", noExpenseInsight: "You have no expenses this month. Good start!", biggestCategoryInsight: "Your biggest expense category is {category}.", averageDailyExpenseInsight: "Your average daily expense is {amount}.", exceededBudgetsInsight: "You have exceeded {count} budget this month.", exceededBudgetsInsightPlural: "You have exceeded {count} budgets this month.", negativeBalanceInsight: "Expenses exceed income. Watch your next moves.", positiveBalanceInsight: "You are keeping a positive balance this month.", confirmClearData: "Are you sure you want to delete all data? This action cannot be undone.", confirmRemovePin: "Do you also want to remove the PIN?", confirmRestoreBackup: "Restore will replace your current data. Continue?", budgetExceededAlert: "You exceeded the limit for {category} by {amount}.", budgetNearAlert: "You are near the limit for {category}. You have spent {spent} of {budget}.", pinActive: "PIN is active", enablePin: "Enable PIN", currentPin: "Current PIN", newPin: "New PIN", confirmPin: "Confirm PIN", confirmNewPin: "Confirm new PIN", saveNewPin: "Save new PIN", disablePin: "Disable PIN", pinRequired: "PIN must be exactly 4 digits.", pinMismatch: "PINs do not match.", newPinMismatch: "New PINs do not match.", pinEnabled: "PIN was enabled successfully.", wrongCurrentPin: "The current PIN is not correct.", pinChanged: "PIN changed successfully.", pinDisabled: "PIN disabled successfully.", categoryNameRequired: "Enter a category name.", categoryExists: "This category already exists.", categoryAdded: "Category added.", confirmDeleteCategory: "Are you sure you want to delete this category?", confirmDeleteCategoryWithTransactions: "There are transactions in this category. If you delete it, old transactions will remain as they are.", categoryDeleted: "Category deleted.", accountNameRequired: "Enter an account name.", accountExists: "An account with this name already exists.", accountAdded: "Account added.", promptNewAccountName: "New account name", accountRenamed: "Account renamed.", needsActiveAccount: "At least one active account is required.", confirmArchiveAccountWithTransactions: "There are transactions in this account. It will be archived and old transactions will remain.", accountArchived: "Account archived.", accountDeleted: "Account deleted.", lockNowSecurity: "Lock now", confirmDeleteTransaction: "Are you sure you want to delete this transaction?", confirmDeleteRecurring: "This transaction repeats every month. Are you sure you want to delete it?",
  },
  el: {}
};
translations.el = {
  ...translations.en,
  appDescription: "MyCash Plan - προσωπικός οικονομικός προγραμματισμός σε ευρώ.", personalCash: "Προσωπικό ταμείο", lockNow: "Κλείδωμα τώρα", mainNavigation: "Κύρια πλοήγηση", dashboard: "Πίνακας ελέγχου", home: "Αρχική", add: "Προσθήκη", history: "Ιστορικό", goals: "Στόχοι", settings: "Ρυθμίσεις",
  selectDashboardMonth: "Επιλογή μήνα για τον πίνακα ελέγχου", selectHistoryMonth: "Επιλογή μήνα για το ιστορικό", previousMonth: "Προηγούμενος μήνας", nextMonth: "Επόμενος μήνας", monthlyBalance: "Υπόλοιπο μήνα", monthIncome: "Έσοδα μήνα", monthExpenses: "Έξοδα μήνα", accountBalances: "Υπόλοιπα λογαριασμών", upcomingTransactions: "Προσεχείς κινήσεις", monthlyStats: "Στατιστικά μήνα", expensesByCategory: "Έξοδα ανά κατηγορία", monthlyBudgets: "Budgets μήνα", savingsProgress: "Πρόοδος αποταμίευσης", setGoalStart: "Όρισε στόχο για να ξεκινήσεις.", friendlyDefault: "Ας οργανώσουμε τα χρήματά σου με ηρεμία.",
  newTransaction: "Νέα συναλλαγή", editTransaction: "Επεξεργασία συναλλαγής", type: "Τύπος", income: "Έσοδο", expense: "Έξοδο", transfer: "Μεταφορά", amount: "Ποσό (€)", category: "Κατηγορία", account: "Λογαριασμός", fromAccount: "Από λογαριασμό", toAccount: "Προς λογαριασμό", note: "Σημείωση", optionalDescription: "Προαιρετική περιγραφή", date: "Ημερομηνία", recurringMonthly: "Επαναλαμβάνεται κάθε μήνα", save: "Αποθήκευση", saveChanges: "Αποθήκευση αλλαγών", cancelEdit: "Ακύρωση επεξεργασίας", transactionAdded: "Η συναλλαγή προστέθηκε επιτυχώς.", changesSaved: "Οι αλλαγές αποθηκεύτηκαν επιτυχώς.", edit: "Επεξεργασία", delete: "Διαγραφή",
  all: "Όλα", allCategories: "Όλες οι κατηγορίες", allAccounts: "Όλοι οι λογαριασμοί", recurring: "Μηνιαίες", oneTime: "Μη μηνιαίες", clearFilters: "Καθαρισμός φίλτρων", noTransactionsMonth: "Δεν υπάρχουν συναλλαγές για αυτόν τον μήνα.", addIncomeExpenseStart: "Πρόσθεσε έσοδα ή έξοδα για να ξεκινήσεις.", noFilteredTransactions: "Δεν βρέθηκαν συναλλαγές με αυτά τα φίλτρα.", tryDifferentSearch: "Δοκίμασε διαφορετική αναζήτηση ή καθάρισε τα φίλτρα.", searchTransactionsPlaceholder: "Αναζήτηση συναλλαγών...", balance: "Υπόλοιπο",
  categoryBudgets: "Budgets ανά κατηγορία", setMonthlyLimit: "Όρισε μηνιαίο όριο εξόδων για κάθε κατηγορία.", saveBudgets: "Αποθήκευση budgets", savingsGoal: "Στόχος αποταμίευσης (€)", currentSaved: "Τρέχον αποταμιευμένο ποσό (€)", updateGoal: "Ενημέρωση στόχου", noGoal: "Δεν έχει οριστεί στόχος ακόμη.",
  appInfo: "Πληροφορίες εφαρμογής", localData: "Τα δεδομένα αποθηκεύονται τοπικά στη συσκευή σου.", syncFuture: "Συγχρονισμός με λογαριασμό θα προστεθεί σε μελλοντική έκδοση.", checkUpdate: "Έλεγχος ενημέρωσης", security: "Ασφάλεια εφαρμογής", pinHelp: "Βάλε PIN για να προστατεύεις τα οικονομικά σου στοιχεία.", walletsAccounts: "Πορτοφόλια & Λογαριασμοί", organizeMoney: "Οργάνωσε πού βρίσκονται τα χρήματά σου.", accountName: "Όνομα λογαριασμού", accountNamePlaceholder: "π.χ. Κύριος λογαριασμός, Revolut, Τράπεζα", cash: "Μετρητά", bank: "Τράπεζα", card: "Κάρτα", savings: "Αποταμίευση", other: "Άλλο", startingBalance: "Αρχικό υπόλοιπο", addAccount: "Προσθήκη λογαριασμού", backupExport: "Backup & Εξαγωγή δεδομένων", downloadBackup: "Λήψη backup", exportCsv: "Εξαγωγή CSV", restoreBackup: "Επαναφορά από backup", categories: "Κατηγορίες", addCategory: "Προσθήκη κατηγορίας", incomeCategories: "Κατηγορίες εσόδων", expenseCategories: "Κατηγορίες εξόδων", dataManagement: "Διαχείριση δεδομένων", clearAllData: "Διαγραφή όλων των δεδομένων", language: "Γλώσσα", languageSaved: "Η γλώσσα αποθηκεύτηκε.", dataCleared: "Τα δεδομένα διαγράφηκαν.", updateChecked: "Έγινε έλεγχος ενημέρωσης.", updateCheckFailed: "Δεν ήταν δυνατός ο έλεγχος ενημέρωσης.", backupCreated: "Το backup δημιουργήθηκε επιτυχώς.", csvCreated: "Το CSV δημιουργήθηκε επιτυχώς.", invalidBackup: "Το αρχείο backup δεν είναι έγκυρο.", backupRestored: "Το backup επαναφέρθηκε επιτυχώς.",
  defaultCategoryHome: "Σπίτι", defaultCategoryFood: "Φαγητό", defaultCategoryCoffee: "Καφές", defaultCategorySupermarket: "Supermarket", defaultCategoryTransport: "Μεταφορές", defaultCategoryBills: "Λογαριασμοί", defaultCategoryEntertainment: "Ψυχαγωγία", defaultCategoryHealth: "Υγεία", defaultCategoryChild: "Παιδί", defaultCategoryPet: "Κατοικίδιο", defaultCategorySalary: "Μισθός", defaultCategoryBusiness: "Επιχείρηση", defaultCategoryGift: "Δώρο", defaultCategorySale: "Πώληση", defaultExpenseCategories: ["Σπίτι", "Φαγητό", "Καφές", "Supermarket", "Μεταφορές", "Λογαριασμοί", "Ψυχαγωγία", "Υγεία", "Παιδί", "Κατοικίδιο", "Άλλο"], defaultIncomeCategories: ["Μισθός", "Επιχείρηση", "Δώρο", "Πώληση", "Άλλο"], duplicateAccountWarning: "Βρέθηκαν παρόμοιοι λογαριασμοί. Μπορείς να αρχειοθετήσεις αυτόν που δεν χρησιμοποιείς.", defaultAccountName: "Κύριος λογαριασμός", transferCategory: "Μεταφορά", noExpensesMonth: "Δεν υπάρχουν έξοδα για αυτόν τον μήνα. Καλή αρχή!", noStats: "Δεν υπάρχουν αρκετά δεδομένα για στατιστικά αυτόν τον μήνα.", biggestCategory: "Μεγαλύτερη κατηγορία", totalIncome: "Σύνολο εσόδων", totalExpenses: "Σύνολο εξόδων", averageDailyExpense: "Μέσο ημερήσιο έξοδο", exceededBudgets: "Budgets που ξεπεράστηκαν", whereExpensesWent: "Πού πήγαν τα έξοδα", statsHelper: "Ποσοστό επί των συνολικών εξόδων του μήνα.", noCategoryAnalysis: "Δεν υπάρχουν έξοδα για ανάλυση κατηγοριών.", startFirstTransaction: "Ξεκίνα προσθέτοντας το πρώτο σου έσοδο ή έξοδο.", positiveBalance: "Υπέροχα! Αυτόν τον μήνα κρατάς θετικό υπόλοιπο.", negativeBalance: "Προσοχή: τα έξοδα ξεπερνούν τα έσοδα. Μικρές αλλαγές βοηθούν.", evenBalance: "Τα έσοδα και τα έξοδα είναι ισορροπημένα αυτόν τον μήνα.", transactionSaved: "Η συναλλαγή αποθηκεύτηκε επιτυχώς.", noExpenseInsight: "Δεν έχεις έξοδα για αυτόν τον μήνα. Καλή αρχή!", biggestCategoryInsight: "Η μεγαλύτερη κατηγορία εξόδων σου είναι {category}.", averageDailyExpenseInsight: "Το μέσο ημερήσιο έξοδό σου είναι {amount}.", exceededBudgetsInsight: "Έχεις ξεπεράσει {count} budget αυτόν τον μήνα.", exceededBudgetsInsightPlural: "Έχεις ξεπεράσει {count} budgets αυτόν τον μήνα.", negativeBalanceInsight: "Τα έξοδα ξεπερνούν τα έσοδα. Πρόσεξε τις επόμενες κινήσεις.", positiveBalanceInsight: "Κρατάς θετικό υπόλοιπο αυτόν τον μήνα.", confirmClearData: "Θέλεις σίγουρα να διαγράψεις όλα τα δεδομένα; Αυτή η ενέργεια δεν αναιρείται.", confirmRemovePin: "Θέλεις να αφαιρεθεί και το PIN;", confirmRestoreBackup: "Η επαναφορά θα αντικαταστήσει τα τωρινά δεδομένα. Συνέχεια;", budgetExceededAlert: "Ξεπέρασες το όριο για {category} κατά {amount}.", budgetNearAlert: "Πλησιάζεις το όριο για {category}. Έχεις ξοδέψει {spent} από {budget}.", pinActive: "Το PIN είναι ενεργό", enablePin: "Ενεργοποίηση PIN", currentPin: "Τρέχον PIN", newPin: "Νέο PIN", confirmPin: "Επιβεβαίωση PIN", confirmNewPin: "Επιβεβαίωση νέου PIN", saveNewPin: "Αποθήκευση νέου PIN", disablePin: "Απενεργοποίηση PIN", pinRequired: "Το PIN πρέπει να έχει ακριβώς 4 ψηφία.", pinMismatch: "Τα PIN δεν ταιριάζουν.", newPinMismatch: "Τα νέα PIN δεν ταιριάζουν.", pinEnabled: "Το PIN ενεργοποιήθηκε επιτυχώς.", wrongCurrentPin: "Το τρέχον PIN δεν είναι σωστό.", pinChanged: "Το PIN άλλαξε επιτυχώς.", pinDisabled: "Το PIN απενεργοποιήθηκε επιτυχώς.", categoryNameRequired: "Συμπλήρωσε όνομα κατηγορίας.", categoryExists: "Αυτή η κατηγορία υπάρχει ήδη.", categoryAdded: "Η κατηγορία προστέθηκε.", confirmDeleteCategory: "Θέλεις σίγουρα να διαγράψεις αυτή την κατηγορία;", confirmDeleteCategoryWithTransactions: "Υπάρχουν συναλλαγές με αυτή την κατηγορία. Αν τη διαγράψεις, οι παλιές συναλλαγές θα παραμείνουν όπως είναι.", categoryDeleted: "Η κατηγορία διαγράφηκε.", accountNameRequired: "Συμπλήρωσε όνομα λογαριασμού.", accountExists: "Υπάρχει ήδη λογαριασμός με αυτό το όνομα.", accountAdded: "Ο λογαριασμός προστέθηκε.", promptNewAccountName: "Νέο όνομα λογαριασμού", accountRenamed: "Ο λογαριασμός μετονομάστηκε.", needsActiveAccount: "Χρειάζεται τουλάχιστον ένας ενεργός λογαριασμός.", confirmArchiveAccountWithTransactions: "Υπάρχουν συναλλαγές σε αυτόν τον λογαριασμό. Θα γίνει αρχειοθέτηση και οι παλιές συναλλαγές θα παραμείνουν.", accountArchived: "Ο λογαριασμός αρχειοθετήθηκε.", accountDeleted: "Ο λογαριασμός διαγράφηκε.", lockNowSecurity: "Κλείδωμα τώρα",
};

let activeLanguage = localStorage.getItem(storageKeys.language) || "en";
function currentLanguage() { return translations[activeLanguage] ? activeLanguage : "en"; }
function t(key, params = {}) {
  const value = translations[currentLanguage()]?.[key] ?? translations.en[key] ?? key;
  if (Array.isArray(value)) return value;
  return String(value).replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}
function locale() { return currentLanguage() === "el" ? "el-GR" : "en-US"; }
function accountTypeLabelsMap() { return { cash: t("cash"), bank: t("bank"), card: t("card"), savings: t("savings"), other: t("other") }; }
const accountTypeKeys = { cash: "cash", bank: "bank", card: "card", savings: "savings", other: "other" };
const defaultCategoryDefinitions = {
  expense: [
    { id: "home", key: "defaultCategoryHome", legacy: ["Home", "Σπίτι"] },
    { id: "food", key: "defaultCategoryFood", legacy: ["Food", "Φαγητό"] },
    { id: "coffee", key: "defaultCategoryCoffee", legacy: ["Coffee", "Καφές"] },
    { id: "supermarket", key: "defaultCategorySupermarket", legacy: ["Supermarket"] },
    { id: "transport", key: "defaultCategoryTransport", legacy: ["Transport", "Μεταφορές"] },
    { id: "bills", key: "defaultCategoryBills", legacy: ["Bills", "Λογαριασμοί"] },
    { id: "entertainment", key: "defaultCategoryEntertainment", legacy: ["Entertainment", "Ψυχαγωγία"] },
    { id: "health", key: "defaultCategoryHealth", legacy: ["Health", "Υγεία"] },
    { id: "child", key: "defaultCategoryChild", legacy: ["Child", "Παιδί"] },
    { id: "pet", key: "defaultCategoryPet", legacy: ["Pet", "Κατοικίδιο"] },
    { id: "other", key: "other", legacy: ["Other", "Άλλο"] },
  ],
  income: [
    { id: "salary", key: "defaultCategorySalary", legacy: ["Salary", "Μισθός"] },
    { id: "business", key: "defaultCategoryBusiness", legacy: ["Business", "Επιχείρηση"] },
    { id: "gift", key: "defaultCategoryGift", legacy: ["Gift", "Δώρο"] },
    { id: "sale", key: "defaultCategorySale", legacy: ["Sale", "Πώληση"] },
    { id: "other", key: "other", legacy: ["Other", "Άλλο"] },
  ],
};
const defaultExpenseCategories = defaultCategoryDefinitions.expense.map((category) => category.id);
const defaultIncomeCategories = defaultCategoryDefinitions.income.map((category) => category.id);
function localizedDefaultExpenseCategories() { return defaultExpenseCategories; }
function localizedDefaultIncomeCategories() { return defaultIncomeCategories; }


const today = new Date();

const state = {
  accounts: normalizeAccounts(JSON.parse(localStorage.getItem(storageKeys.accounts) || "[]")),
  transactions: normalizeTransactions(JSON.parse(localStorage.getItem(storageKeys.transactions) || "[]")),
  goals: JSON.parse(localStorage.getItem(storageKeys.goals) || '{"goalAmount":0,"savedAmount":0}'),
  customCategories: normalizeCustomCategories(JSON.parse(localStorage.getItem(storageKeys.customCategories) || "{}")),
  budgets: JSON.parse(localStorage.getItem(storageKeys.budgets) || "{}"),
  filter: "all",
  categoryFilter: "all",
  recurringFilter: "all",
  accountFilter: "all",
  searchQuery: "",
  selectedMonth: new Date(today.getFullYear(), today.getMonth(), 1),
  editingId: null,
  security: normalizeSecurity(JSON.parse(localStorage.getItem(storageKeys.security) || "{}")),
  hiddenAt: null,
  language: currentLanguage(),
};
state.budgets = normalizeBudgets(state.budgets);
if (!localStorage.getItem(storageKeys.accounts)) saveAccounts();

const euro = { format: (value) => new Intl.NumberFormat(locale(), { style: "currency", currency: "EUR" }).format(value) };
const dateFormatter = { format: (value) => new Intl.DateTimeFormat(locale(), { dateStyle: "medium" }).format(value) };
const historyDateFormatter = { format: (value) => new Intl.DateTimeFormat(locale(), { day: "numeric", month: "short", year: "numeric" }).format(value) };
const monthFormatter = { format: (value) => new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(value) };

const elements = {
  views: document.querySelectorAll(".view"),
  navButtons: document.querySelectorAll(".nav-button"),
  transactionForm: document.querySelector("#transactionForm"),
  goalForm: document.querySelector("#goalForm"),
  budgetForm: document.querySelector("#budgetForm"),
  categoryForm: document.querySelector("#categoryForm"),
  accountForm: document.querySelector("#accountForm"),
  filter: document.querySelector("#filter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  recurringFilter: document.querySelector("#recurringFilter"),
  accountFilter: document.querySelector("#accountFilter"),
  historySearch: document.querySelector("#historySearch"),
  clearHistoryFilters: document.querySelector("#clearHistoryFilters"),
  type: document.querySelector("#type"),
  category: document.querySelector("#category"),
  categoryLabel: document.querySelector("#categoryLabel"),
  account: document.querySelector("#account"),
  accountLabel: document.querySelector("#accountLabel"),
  transferFields: document.querySelector("#transferFields"),
  fromAccount: document.querySelector("#fromAccount"),
  toAccount: document.querySelector("#toAccount"),
  amount: document.querySelector("#amount"),
  note: document.querySelector("#note"),
  date: document.querySelector("#date"),
  recurring: document.querySelector("#recurring"),
  formTitle: document.querySelector("#add-title"),
  formSubmit: document.querySelector("#formSubmit"),
  cancelEdit: document.querySelector("#cancelEdit"),
  formMessage: document.querySelector("#formMessage"),
  budgetAlertToast: document.querySelector("#budgetAlertToast"),
  dashboardMonthLabel: document.querySelector("#dashboardMonthLabel"),
  historyMonthLabel: document.querySelector("#historyMonthLabel"),
  historyIncomeTotal: document.querySelector("#historyIncomeTotal"),
  historyExpenseTotal: document.querySelector("#historyExpenseTotal"),
  historyBalanceTotal: document.querySelector("#historyBalanceTotal"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  friendlyMessage: document.querySelector("#friendlyMessage"),
  accountSummary: document.querySelector("#accountSummary"),
  upcomingSummary: document.querySelector("#upcomingSummary"),
  upcomingMessage: document.querySelector("#upcomingMessage"),
  upcomingList: document.querySelector("#upcomingList"),
  categorySummary: document.querySelector("#categorySummary"),
  monthlyStats: document.querySelector("#monthlyStats"),
  smartInsights: document.querySelector("#smartInsights"),
  statsCategoryBreakdown: document.querySelector("#statsCategoryBreakdown"),
  budgetSummary: document.querySelector("#budgetSummary"),
  budgetInputs: document.querySelector("#budgetInputs"),
  savingsPercent: document.querySelector("#savingsPercent"),
  savingsBar: document.querySelector("#savingsBar"),
  savingsText: document.querySelector("#savingsText"),
  transactionList: document.querySelector("#transactionList"),
  goalAmount: document.querySelector("#goalAmount"),
  savedAmount: document.querySelector("#savedAmount"),
  goalPercent: document.querySelector("#goalPercent"),
  goalText: document.querySelector("#goalText"),
  downloadBackup: document.querySelector("#downloadBackup"),
  exportCsv: document.querySelector("#exportCsv"),
  restoreBackup: document.querySelector("#restoreBackup"),
  backupMessage: document.querySelector("#backupMessage"),
  categoryType: document.querySelector("#categoryType"),
  categoryName: document.querySelector("#categoryName"),
  categoryMessage: document.querySelector("#categoryMessage"),
  incomeCategoryList: document.querySelector("#incomeCategoryList"),
  expenseCategoryList: document.querySelector("#expenseCategoryList"),
  incomeCategoryPreview: document.querySelector("#incomeCategoryPreview"),
  expenseCategoryPreview: document.querySelector("#expenseCategoryPreview"),
  accountName: document.querySelector("#accountName"),
  accountType: document.querySelector("#accountType"),
  accountStartingBalance: document.querySelector("#accountStartingBalance"),
  accountMessage: document.querySelector("#accountMessage"),
  accountsList: document.querySelector("#accountsList"),
  securityPanel: document.querySelector("#securityPanel"),
  securityMessage: document.querySelector("#securityMessage"),
  settingsMessage: document.querySelector("#settingsMessage"),
  checkUpdate: document.querySelector("#checkUpdate"),
  clearAllData: document.querySelector("#clearAllData"),
  onboardingOverlay: document.querySelector("#onboardingOverlay"),
  finishOnboarding: document.querySelector("#finishOnboarding"),
  manualLockHeader: document.querySelector("#manualLockHeader"),
  lockOverlay: document.querySelector("#lockOverlay"),
  unlockForm: document.querySelector("#unlockForm"),
  unlockPin: document.querySelector("#unlockPin"),
  lockMessage: document.querySelector("#lockMessage"),
  languageSelect: document.querySelector("#languageSelect"),
};



function translateLabelElement(label, key) {
  const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = `${t(key)} `;
  else label.prepend(document.createTextNode(`${t(key)} `));
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage();
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-label]").forEach((element) => {
    translateLabelElement(element, element.dataset.i18nLabel);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute("content", t(element.dataset.i18nContent));
  });
  if (elements.formTitle) elements.formTitle.textContent = t(state.editingId ? "editTransaction" : "newTransaction");
  if (elements.formSubmit) elements.formSubmit.textContent = t(state.editingId ? "saveChanges" : "save");
  if (elements.languageSelect) elements.languageSelect.value = currentLanguage();
  if (elements.type) {
    const previousType = elements.type.value || "income";
    elements.type.innerHTML = `<option value="income">${t("income")}</option><option value="expense">${t("expense")}</option><option value="transfer">${t("transfer")}</option>`;
    elements.type.value = previousType;
  }
  if (elements.categoryType) {
    const previousType = elements.categoryType.value || "income";
    elements.categoryType.innerHTML = `<option value="income">${t("income")}</option><option value="expense">${t("expense")}</option>`;
    elements.categoryType.value = previousType;
  }
  if (elements.accountType) {
    const previousType = elements.accountType.value || "cash";
    elements.accountType.innerHTML = Object.entries(accountTypeLabelsMap()).map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    elements.accountType.value = previousType;
  }
}
function changeLanguage(language) {
  activeLanguage = translations[language] ? language : "en";
  state.language = activeLanguage;
  localStorage.setItem(storageKeys.language, activeLanguage);
  applyStaticTranslations();
  render();
  showSettingsMessage(t("languageSaved"));
}

function normalizeAccounts(accounts) {
  const seen = new Set();
  const normalized = (Array.isArray(accounts) ? accounts : []).reduce((list, account, index) => {
    const name = String(account?.name || "").trim();
    const id = String(account?.id || `acc_legacy_${index}`).trim();
    if (!name || !id || seen.has(id)) return list;
    seen.add(id);
    list.push({
      id,
      name,
      type: accountTypeKeys[account?.type] ? account.type : "other",
      startingBalance: Number(account?.startingBalance) || 0,
      archived: Boolean(account?.archived),
    });
    return list;
  }, []);
  if (!normalized.length) normalized.push({ id: defaultAccountId, name: t("defaultAccountName"), type: "cash", startingBalance: 0, archived: false });
  return normalized;
}

function saveAccounts() {
  localStorage.setItem(storageKeys.accounts, JSON.stringify(state.accounts));
}

function normalizedAccountName(name) {
  return String(name || "")
    .trim()
    .toLocaleLowerCase("el-GR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function accountNameExists(name, ignoredAccountId = "") {
  const normalizedName = normalizedAccountName(name);
  return state.accounts.some((account) => account.id !== ignoredAccountId
    && (normalizedAccountName(account.name) === normalizedName || normalizedAccountName(displayAccountName(account)) === normalizedName));
}

function duplicateAccountNameGroups() {
  const groups = state.accounts.reduce((map, account) => {
    const key = normalizedAccountName(displayAccountName(account));
    if (!key) return map;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(account);
    return map;
  }, new Map());
  return [...groups.values()].filter((group) => group.length > 1);
}

function isLegacyDefaultAccount(account) {
  return account?.id === defaultAccountId && normalizedAccountName(account.name) === normalizedAccountName(legacyDefaultAccountName);
}

function displayAccountName(account) {
  return isLegacyDefaultAccount(account) ? t("defaultAccountName") : account?.name || t("defaultAccountName");
}

function accountTypeLabel(account) {
  return accountTypeLabelsMap()[account?.type] || accountTypeLabelsMap().other;
}

function defaultAccount() {
  return state.accounts.find((account) => account.id === defaultAccountId)
    || state.accounts.find((account) => account.name === t("defaultAccountName") || isLegacyDefaultAccount(account))
    || state.accounts[0];
}

function accountForTransaction(transaction) {
  return state.accounts.find((account) => account.id === transaction?.accountId) || defaultAccount();
}

function activeAccounts() {
  return state.accounts.filter((account) => !account.archived);
}

function transactionAccountId(transaction) {
  return transaction?.accountId || defaultAccount().id;
}

function uniqueTrimmedCategories(categories) {
  const seen = new Set();
  return (Array.isArray(categories) ? categories : []).reduce((list, category) => {
    const name = String(category || "").trim();
    const key = name.toLocaleLowerCase("el-GR");
    if (!name || seen.has(key)) return list;
    seen.add(key);
    list.push(name);
    return list;
  }, []);
}

function normalizeCustomCategories(customCategories) {
  return {
    income: uniqueTrimmedCategories(customCategories?.income),
    expense: uniqueTrimmedCategories(customCategories?.expense),
  };
}

function saveCustomCategories() {
  localStorage.setItem(storageKeys.customCategories, JSON.stringify(state.customCategories));
}

function allCategoriesForType(type) {
  const defaults = type === "expense" ? localizedDefaultExpenseCategories() : localizedDefaultIncomeCategories();
  const custom = state?.customCategories?.[type] || [];
  return [...new Set([...defaults, ...custom])];
}

function allExpenseCategoryRows() {
  const rows = [
    ...allCategoriesForType("expense"),
    ...state.transactions.filter((transaction) => transaction.type === "expense").map((transaction) => transaction.category),
    ...Object.keys(state.budgets || {}),
  ].filter(Boolean);
  const seen = new Set();
  return rows.reduce((uniqueRows, category) => {
    const key = canonicalCategoryName(category, "expense");
    if (seen.has(key)) return uniqueRows;
    seen.add(key);
    uniqueRows.push(key);
    return uniqueRows;
  }, []);
}

function allHistoryCategories(monthly = selectedMonthTransactions()) {
  return [...new Set([
    ...allCategoriesForType("income"),
    ...allCategoriesForType("expense"),
    ...monthly.map((transaction) => transaction.category),
  ])].filter(Boolean);
}

function showCategoryMessage(message, isError = false) {
  elements.categoryMessage.textContent = message;
  elements.categoryMessage.classList.toggle("error", isError);
}

function normalizeSecurity(security) {
  const enabled = security?.enabled === true;
  return {
    enabled,
    salt: enabled && typeof security.salt === "string" ? security.salt : "",
    pinHash: enabled && typeof security.pinHash === "string" ? security.pinHash : "",
  };
}

function saveSecurity() {
  localStorage.setItem(storageKeys.security, JSON.stringify(state.security));
}

function isValidPin(pin) {
  return /^\d{4}$/.test(pin);
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(base64) {
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

async function hashPin(pin, saltBase64) {
  const encoder = new TextEncoder();
  const salt = base64ToBytes(saltBase64);
  const pinBytes = encoder.encode(pin);
  const data = new Uint8Array(salt.length + pinBytes.length);
  data.set(salt);
  data.set(pinBytes, salt.length);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToBase64(new Uint8Array(digest));
}

function createSalt() {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return bytesToBase64(salt);
}

async function verifyPin(pin) {
  if (!state.security.enabled || !state.security.salt || !state.security.pinHash || !isValidPin(pin)) return false;
  return (await hashPin(pin, state.security.salt)) === state.security.pinHash;
}

function showSecurityMessage(message, isError = false) {
  elements.securityMessage.textContent = message;
  elements.securityMessage.classList.toggle("error", isError);
}

function setSessionUnlocked(unlocked) {
  if (unlocked) sessionStorage.setItem(storageKeys.sessionUnlocked, "true");
  else sessionStorage.removeItem(storageKeys.sessionUnlocked);
}

function isSessionUnlocked() {
  return sessionStorage.getItem(storageKeys.sessionUnlocked) === "true";
}

function showLockScreen(message = "") {
  if (!state.security.enabled) return;
  setSessionUnlocked(false);
  elements.lockMessage.textContent = message;
  elements.lockMessage.classList.toggle("error", Boolean(message));
  elements.lockOverlay.hidden = false;
  document.body.classList.add("locked");
  elements.unlockPin.value = "";
  elements.unlockPin.focus();
}

function hideLockScreen() {
  elements.lockOverlay.hidden = true;
  document.body.classList.remove("locked");
  elements.lockMessage.textContent = "";
}

function applyLockState() {
  elements.manualLockHeader.hidden = !state.security.enabled;
  if (state.security.enabled && !isSessionUnlocked()) showLockScreen();
  else hideLockScreen();
}

function normalizeTransactions(transactions) {
  return Array.isArray(transactions) ? transactions.map((transaction, index) => ({
    id: transaction.id || `legacy-${index}-${transaction.date || Date.now()}`,
    type: ["income", "expense", "transfer"].includes(transaction.type) ? transaction.type : "income",
    amount: Number(transaction.amount) || 0,
    category: transaction.category || (transaction.type === "transfer" ? t("transferCategory") : t("other")),
    accountId: transaction.accountId || "",
    fromAccountId: transaction.fromAccountId || "",
    toAccountId: transaction.toAccountId || "",
    note: transaction.note || "",
    date: transaction.date || new Date().toISOString().slice(0, 10),
    recurring: transaction.type === "transfer" ? false : Boolean(transaction.recurring),
    recurringSourceId: transaction.recurringSourceId || transaction.sourceRecurringId || transaction.sourceId || transaction.parentRecurringId || transaction.generatedFromId || "",
    recurringOccurrenceDate: transaction.recurringOccurrenceDate || transaction.occurrenceDate || "",
  })) : [];
}

function saveTransactions() {
  localStorage.setItem(storageKeys.transactions, JSON.stringify(state.transactions));
}

function normalizeBudgets(budgets) {
  return [...new Set([...allCategoriesForType("expense"), ...Object.keys(budgets || {})])].reduce((normalized, category) => {
    const amount = Number(budgets?.[category]) || 0;
    normalized[category] = amount > 0 ? amount : 0;
    return normalized;
  }, {});
}

function saveBudgets() {
  localStorage.setItem(storageKeys.budgets, JSON.stringify(state.budgets));
}

function saveGoals() {
  localStorage.setItem(storageKeys.goals, JSON.stringify(state.goals));
}

function todayFileStamp() {
  return formatDateInputValue(new Date());
}

function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function showBackupMessage(message, isError = false) {
  elements.backupMessage.textContent = message;
  elements.backupMessage.classList.toggle("error", isError);
}

function showSettingsMessage(message, isError = false) {
  elements.settingsMessage.textContent = message;
  elements.settingsMessage.classList.toggle("error", isError);
}

function showOnboardingIfNeeded() {
  if (localStorage.getItem(storageKeys.onboardingSeen) === "true") return;
  elements.onboardingOverlay.hidden = false;
}

function finishOnboarding() {
  localStorage.setItem(storageKeys.onboardingSeen, "true");
  elements.onboardingOverlay.hidden = true;
}

function clearAllUserData() {
  if (!confirm(t("confirmClearData"))) return;
  const removePin = confirm(t("confirmRemovePin"));
  state.transactions = [];
  state.accounts = normalizeAccounts([]);
  state.goals = { goalAmount: 0, savedAmount: 0 };
  state.customCategories = { income: [], expense: [] };
  state.budgets = normalizeBudgets({});
  state.editingId = null;
  saveTransactions();
  saveAccounts();
  saveGoals();
  saveBudgets();
  saveCustomCategories();
  if (removePin) {
    state.security = { enabled: false, salt: "", pinHash: "" };
    saveSecurity();
    setSessionUnlocked(false);
  }
  resetTransactionForm();
  render();
  applyLockState();
  showSettingsMessage(t("dataCleared"));
}

async function checkForUpdate() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
  }
  showSettingsMessage(t("updateChecked"));
}

function createBackupPayload() {
  return {
    app: "MyCash Plan",
    version: appVersion,
    exportDate: new Date().toISOString(),
    accounts: state.accounts,
    transactions: state.transactions,
    goals: state.goals,
    budgets: state.budgets,
    customCategories: state.customCategories,
    security: state.security.enabled ? state.security : undefined,
  };
}

function exportBackup() {
  const content = JSON.stringify(createBackupPayload(), null, 2);
  downloadFile(content, `mycash-plan-backup-${todayFileStamp()}.json`, "application/json;charset=utf-8");
  showBackupMessage(t("backupCreated"));
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportTransactionsCsv() {
  const header = ["Date", "Type", "Category", "Note", "Amount", "Recurring", "Account"];
  const rows = state.transactions.map((transaction) => [
    transaction.date,
    transaction.type,
    getLocalizedCategoryName(transaction.category, transaction.type),
    transaction.note,
    Number(transaction.amount).toFixed(2),
    transaction.recurring ? "Yes" : "No",
    accountLabelForExport(transaction),
  ]);
  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
  downloadFile(`\ufeff${csv}`, `mycash-plan-transactions-${todayFileStamp()}.csv`, "text/csv;charset=utf-8");
  showBackupMessage(t("csvCreated"));
}

function isValidBackupPayload(payload) {
  return payload
    && typeof payload === "object"
    && Array.isArray(payload.transactions)
    && payload.goals
    && typeof payload.goals === "object"
    && payload.budgets
    && typeof payload.budgets === "object";
}

function restoreBackupPayload(payload) {
  if (!isValidBackupPayload(payload)) {
    showBackupMessage(t("invalidBackup"), true);
    return;
  }

  if (!confirm(t("confirmRestoreBackup"))) return;

  state.accounts = normalizeAccounts(payload.accounts || []);
  state.transactions = normalizeTransactions(payload.transactions);
  state.goals = {
    goalAmount: Number(payload.goals.goalAmount) || 0,
    savedAmount: Number(payload.goals.savedAmount) || 0,
  };
  state.customCategories = normalizeCustomCategories(payload.customCategories || {});
  state.budgets = normalizeBudgets(payload.budgets);
  if (payload.security) {
    state.security = normalizeSecurity(payload.security);
    saveSecurity();
    setSessionUnlocked(!state.security.enabled);
  }
  state.editingId = null;

  saveTransactions();
  saveAccounts();
  saveGoals();
  saveBudgets();
  saveCustomCategories();
  resetTransactionForm();
  render();
  applyLockState();
  showBackupMessage(t("backupRestored"));
}

function restoreBackupFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      restoreBackupPayload(JSON.parse(reader.result));
    } catch (error) {
      showBackupMessage(t("invalidBackup"), true);
    } finally {
      elements.restoreBackup.value = "";
    }
  });
  reader.addEventListener("error", () => {
    showBackupMessage(t("invalidBackup"), true);
    elements.restoreBackup.value = "";
  });
  reader.readAsText(file);
}

function selectedMonthTransactions(includeFuture = false) {
  const selectedYear = state.selectedMonth.getFullYear();
  const selectedMonth = state.selectedMonth.getMonth();
  const selectedMonthStart = new Date(selectedYear, selectedMonth, 1);

  return state.transactions.reduce((monthly, transaction) => {
    const originalDate = parseLocalDate(transaction.date);
    if (!originalDate) return monthly;

    const isInSelectedMonth = originalDate.getMonth() === selectedMonth && originalDate.getFullYear() === selectedYear;

    if (isInSelectedMonth) {
      if (includeFuture || isTransactionEffective(transaction.date)) monthly.push({ ...transaction, displayDate: transaction.date });
      return monthly;
    }

    if (!transaction.recurring) return monthly;

    const startMonth = new Date(originalDate.getFullYear(), originalDate.getMonth(), 1);
    if (startMonth > selectedMonthStart) return monthly;

    const displayDate = recurringDisplayDate(transaction.date, selectedYear, selectedMonth);
    if (!includeFuture && !isTransactionEffective(displayDate)) return monthly;

    monthly.push({
      ...transaction,
      displayDate,
      isVirtualRecurring: true,
    });
    return monthly;
  }, []);
}

function parseLocalDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function localDateOnly(dateValue = new Date()) {
  if (dateValue instanceof Date) return formatDateInputValue(dateValue);
  const parsed = parseLocalDate(dateValue);
  return parsed ? formatDateInputValue(parsed) : "";
}

function todayInputValue() {
  return localDateOnly(new Date());
}

function isEffectiveTransactionDate(dateValue) {
  const transactionDate = localDateOnly(dateValue);
  return Boolean(transactionDate) && transactionDate <= localDateOnly(new Date());
}

function isTransactionEffective(transactionDate) {
  return isEffectiveTransactionDate(transactionDate);
}

function recurringDisplayDate(startDate, year, month) {
  const originalDate = new Date(`${startDate}T00:00:00`);
  const day = originalDate.getDate();
  const lastDayOfSelectedMonth = new Date(year, month + 1, 0).getDate();
  return formatDateInputValue(new Date(year, month, Math.min(day, lastDayOfSelectedMonth)));
}

function formatDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sumByType(transactions, type) {
  return transactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function accountLabelForExport(transaction) {
  if (transaction.type === "transfer") {
    const from = state.accounts.find((account) => account.id === transaction.fromAccountId) || defaultAccount();
    const to = state.accounts.find((account) => account.id === transaction.toAccountId) || defaultAccount();
    return `${displayAccountName(from)} → ${displayAccountName(to)}`;
  }
  return displayAccountName(accountForTransaction(transaction));
}

function accountBalance(account, transactions = accountTransactionsThroughSelectedMonth()) {
  return transactions.filter((transaction) => isEffectiveTransactionDate(transaction.displayDate || transaction.date)).reduce((balance, transaction) => {
    if (transaction.type === "income" && transactionAccountId(transaction) === account.id) return balance + transaction.amount;
    if (transaction.type === "expense" && transactionAccountId(transaction) === account.id) return balance - transaction.amount;
    if (transaction.type === "transfer") {
      if ((transaction.fromAccountId || defaultAccount().id) === account.id) return balance - transaction.amount;
      if ((transaction.toAccountId || defaultAccount().id) === account.id) return balance + transaction.amount;
    }
    return balance;
  }, Number(account.startingBalance) || 0);
}

function accountTransactionsThroughSelectedMonth() {
  const selectedMonthEnd = new Date(state.selectedMonth.getFullYear(), state.selectedMonth.getMonth() + 1, 0);
  const todayEnd = parseLocalDate(todayInputValue());
  const end = selectedMonthEnd > todayEnd ? todayEnd : selectedMonthEnd;
  return accountTransactionsThroughDate(end);
}

function totalAvailableAccountBalance(accounts, balanceTransactions) {
  return accounts.reduce((total, account) => total + accountBalance(account, balanceTransactions), 0);
}

function renderAccountSummary() {
  const accounts = activeAccounts();
  const balanceTransactions = accountTransactionsThroughSelectedMonth();
  if (!accounts.length) {
    elements.accountSummary.innerHTML = `<p class="muted empty-copy">${t("noActiveAccounts")}</p>`;
    return;
  }

  const accountRows = accounts.map((account) => {
    const balance = accountBalance(account, balanceTransactions);
    return `<div class="account-balance-row"><span>${escapeHtml(displayAccountName(account))}<small>${escapeHtml(accountTypeLabel(account))}</small></span><strong class="${balance < 0 ? "negative" : "positive"}">${euro.format(balance)}</strong></div>`;
  }).join("");
  const totalAvailableBalance = totalAvailableAccountBalance(accounts, balanceTransactions);

  elements.accountSummary.innerHTML = `
    ${accountRows}
    <div class="account-balance-row account-balance-total">
      <span>${t("totalAvailableBalance")}<small>${t("notMonthlyIncome")}</small></span>
      <strong class="${totalAvailableBalance < 0 ? "negative" : "positive"}">${euro.format(totalAvailableBalance)}</strong>
    </div>`;
}

function selectedMonthStatus() {
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const selectedMonthStart = new Date(state.selectedMonth.getFullYear(), state.selectedMonth.getMonth(), 1);
  if (selectedMonthStart < currentMonthStart) return "past";
  if (selectedMonthStart > currentMonthStart) return "future";
  return "current";
}

function normalizeMatchText(value) {
  return String(value || "").trim().toLocaleLowerCase("el-GR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}

function transactionRecurringSourceId(transaction) {
  return transaction.recurringSourceId || transaction.sourceRecurringId || transaction.sourceId || transaction.parentRecurringId || transaction.generatedFromId || "";
}

function transactionAccountMatchKey(transaction) {
  return [transaction.accountId || "", transaction.fromAccountId || "", transaction.toAccountId || ""].join("|");
}

function transactionsMatchRecurringOccurrence(recurringOccurrence, recordedTransaction) {
  if (!recordedTransaction || recordedTransaction.isVirtualRecurring) return false;
  const occurrenceDate = recurringOccurrence.recurringOccurrenceDate || recurringOccurrence.displayDate || recurringOccurrence.date || "";
  if (recordedTransaction.id === recurringOccurrence.id) return false;

  const sourceId = transactionRecurringSourceId(recordedTransaction);
  const recordedOccurrenceDate = recordedTransaction.recurringOccurrenceDate || recordedTransaction.occurrenceDate || "";
  if (sourceId && sourceId === recurringOccurrence.id && recordedOccurrenceDate && occurrenceDate) {
    return recordedOccurrenceDate === occurrenceDate;
  }

  return recordedTransaction.date === occurrenceDate
    && recordedTransaction.type === recurringOccurrence.type
    && Number(recordedTransaction.amount) === Number(recurringOccurrence.amount)
    && normalizeMatchText(recordedTransaction.category) === normalizeMatchText(recurringOccurrence.category)
    && normalizeMatchText(recordedTransaction.note) === normalizeMatchText(recurringOccurrence.note)
    && transactionAccountMatchKey(recordedTransaction) === transactionAccountMatchKey(recurringOccurrence);
}

function recordedTransactionExistsForRecurringOccurrence(recurringOccurrence) {
  return state.transactions.some((transaction) => transactionsMatchRecurringOccurrence(recurringOccurrence, transaction));
}

function upcomingTransactionKey(transaction) {
  return `${transaction.id}|${transaction.displayDate}`;
}

function recordUpcomingRecurringTransaction(recurringOccurrence) {
  if (!recurringOccurrence || recurringOccurrence.type === "transfer") return;

  if (recordedTransactionExistsForRecurringOccurrence(recurringOccurrence)) {
    renderUpcomingTransactions();
    showUpcomingMessage(t("alreadyRecorded"), true);
    return;
  }

  state.transactions.push({
    id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
    type: recurringOccurrence.type,
    amount: Number(recurringOccurrence.amount) || 0,
    category: recurringOccurrence.category,
    accountId: transactionAccountId(recurringOccurrence),
    fromAccountId: "",
    toAccountId: "",
    note: recurringOccurrence.note || "",
    date: recurringOccurrence.displayDate,
    recurring: false,
    recurringSourceId: recurringOccurrence.id,
    recurringOccurrenceDate: recurringOccurrence.displayDate,
  });
  saveTransactions();
  render();
  showUpcomingMessage(t("upcomingRecorded"));
}

function showUpcomingMessage(message, isError = false) {
  if (!elements.upcomingMessage) return;
  elements.upcomingMessage.textContent = message;
  elements.upcomingMessage.classList.toggle("error", isError);
}

function upcomingTransactionsForSelectedMonth() {
  if (selectedMonthStatus() === "past") return [];
  const todayValue = todayInputValue();
  return selectedMonthTransactions(true)
    .filter((transaction) => transaction.displayDate && transaction.displayDate > todayValue)
    .filter((transaction) => !transaction.recurring || !recordedTransactionExistsForRecurringOccurrence(transaction))
    .sort((a, b) => a.displayDate.localeCompare(b.displayDate) || a.category.localeCompare(b.category, "el"));
}

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
        occurrences.push({ ...transaction, displayDate, isVirtualRecurring: cursor.getMonth() !== originalDate.getMonth() || cursor.getFullYear() !== originalDate.getFullYear() });
      }
    }
    return occurrences;
  });
}

function typeLabelForTransaction(type) {
  if (type === "transfer") return t("transferCategory");
  return type === "income" ? t("income") : t("expense");
}

function upcomingAccountName(transaction) {
  if (transaction.type === "transfer") return accountLabelForExport(transaction);
  return displayAccountName(accountForTransaction(transaction));
}

function renderUpcomingTransactions() {
  const status = selectedMonthStatus();
  showUpcomingMessage("");
  const upcoming = upcomingTransactionsForSelectedMonth();
  const upcomingIncome = sumByType(upcoming, "income");
  const upcomingExpenses = sumByType(upcoming, "expense");
  const activeAccountBalance = totalAvailableAccountBalance(activeAccounts(), accountTransactionsThroughDate(today));
  const forecast = activeAccountBalance + upcomingIncome - upcomingExpenses;

  elements.upcomingSummary.innerHTML = `${[
    [t("expectedIncome"), euro.format(upcomingIncome), "income"],
    [t("expectedExpenses"), euro.format(upcomingExpenses), "expense"],
    [t("forecastAfterUpcoming"), euro.format(forecast), forecast < 0 ? "expense" : "income"],
  ].map(([label, value, className]) => `
    <div class="upcoming-summary-item ${className}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>`).join("")}
    <p class="upcoming-helper muted">${t("upcomingHelper")}</p>`;

  if (status === "past") {
    elements.upcomingList.innerHTML = `<p class="muted empty-copy">${t("noUpcomingPast")}</p>`;
    return;
  }

  if (!upcoming.length) {
    elements.upcomingList.innerHTML = `<p class="muted empty-copy">${t("noUpcomingMonth")}</p>`;
    return;
  }

  const todayStart = new Date(`${formatDateInputValue(today)}T00:00:00`);
  const renderGroup = (type) => {
    const group = upcoming.filter((transaction) => transaction.type === type);
    if (!group.length) return "";
    return `
      <section class="upcoming-group ${type}">
        <h4>${type === "income" ? t("expectedIncome") : t("expectedExpenses")}</h4>
        ${group.map((transaction) => {
          const dueDate = new Date(`${transaction.displayDate}T00:00:00`);
          const daysUntilDue = Math.round((dueDate - todayStart) / 86400000);
          const dueSoon = transaction.type === "expense" && daysUntilDue >= 0 && daysUntilDue <= 3;
          const title = transaction.note || getLocalizedCategoryName(transaction.category, transaction.type) || typeLabelForTransaction(transaction.type);
          const sign = transaction.type === "income" ? "+" : (transaction.type === "expense" ? "-" : "");
          const details = t("dueDateDetails", { name: title, amount: euro.format(transaction.amount), date: historyDateFormatter.format(dueDate) });
          return `
            <article class="upcoming-item ${transaction.type} ${dueSoon ? "due-soon" : ""}">
              <div class="upcoming-item-main">
                <div class="upcoming-title-row">
                  <strong>${escapeHtml(title)}</strong>
                  <span class="type-badge ${transaction.type}">${typeLabelForTransaction(transaction.type)}</span>
                </div>
                <p>${escapeHtml(details)}</p>
                <p>${escapeHtml(upcomingAccountName(transaction))}</p>
                <div class="upcoming-badges">
                  ${transaction.recurring ? `<span class="recurring-badge">${t("monthly")}</span>` : ""}
                  ${dueSoon ? `<span class="due-soon-badge">${t("dueSoon")}</span>` : ""}
                </div>
              </div>
              <div class="upcoming-item-actions">
                <strong class="amount ${transaction.type}">${sign}${euro.format(transaction.amount)}</strong>
                ${transaction.type !== "transfer" ? `<button class="record-upcoming-button" type="button" data-upcoming-key="${escapeHtml(upcomingTransactionKey(transaction))}">${t("record")}</button>` : ""}
              </div>
            </article>`;
        }).join("")}
      </section>`;
  };
  elements.upcomingList.innerHTML = `${renderGroup("income")}${renderGroup("expense")}`;

}

function progressPercent(saved, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.min(Math.round((saved / goal) * 100), 100);
}

function monthLabel() {
  const label = monthFormatter.format(state.selectedMonth);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function changeMonth(offset) {
  state.selectedMonth = new Date(state.selectedMonth.getFullYear(), state.selectedMonth.getMonth() + offset, 1);
  renderDashboard();
  renderHistory();
}

function renderMonthSelectors() {
  const label = monthLabel();
  elements.dashboardMonthLabel.textContent = label;
  elements.historyMonthLabel.textContent = label;
}

function normalizedCategoryName(category) {
  return String(category || "")
    .trim()
    .toLocaleLowerCase("el-GR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}


function defaultCategoryDefinition(category, type) {
  const normalized = normalizedCategoryName(category);
  return (defaultCategoryDefinitions[type] || []).find((definition) => {
    const candidates = [definition.id, ...(definition.legacy || [])];
    return candidates.some((candidate) => normalizedCategoryName(candidate) === normalized);
  });
}

function getLocalizedCategoryName(category, type = "") {
  const name = String(category || "").trim();
  const types = type ? [type] : ["income", "expense"];
  for (const categoryType of types) {
    const definition = defaultCategoryDefinition(name, categoryType);
    if (definition) return t(definition.key);
  }
  return name;
}

function canonicalCategoryName(category, type = "expense") {
  const name = String(category || "").trim();
  const definition = defaultCategoryDefinition(name, type);
  return definition ? definition.id : name;
}

function matchingExpenseCategory(category) {
  const canonical = canonicalCategoryName(category, "expense");
  return allExpenseCategoryRows().find((row) => canonicalCategoryName(row, "expense") === canonical) || String(category || "").trim();
}

function expenseTotalsByCategory(monthly) {
  return monthly
    .filter((transaction) => transaction.type === "expense")
    .reduce((summary, transaction) => {
      const category = canonicalCategoryName(transaction.category, "expense");
      summary[category] = (summary[category] || 0) + transaction.amount;
      return summary;
    }, {});
}

function budgetForCategory(category) {
  const canonical = canonicalCategoryName(category, "expense");
  const budgetCategory = Object.keys(state.budgets || {}).find((key) => canonicalCategoryName(key, "expense") === canonical);
  return budgetCategory ? Number(state.budgets[budgetCategory]) || 0 : 0;
}

function alertEuro(amount) {
  const rounded = Math.round((Number(amount) || 0) * 100) / 100;
  return `€${Number.isInteger(rounded) ? rounded : rounded.toLocaleString("el-GR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function transactionsForMonth(dateValue) {
  const date = parseLocalDate(dateValue);
  if (!date) return [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthStart = new Date(year, month, 1);

  return state.transactions.reduce((monthly, transaction) => {
    const transactionDate = parseLocalDate(transaction.date);
    if (!transactionDate) return monthly;
    const isInMonth = transactionDate.getFullYear() === year && transactionDate.getMonth() === month;
    if (isInMonth) {
      if (isTransactionEffective(transaction.date)) monthly.push(transaction);
      return monthly;
    }
    if (!transaction.recurring || new Date(transactionDate.getFullYear(), transactionDate.getMonth(), 1) > monthStart) return monthly;
    const displayDate = recurringDisplayDate(transaction.date, year, month);
    if (!isTransactionEffective(displayDate)) return monthly;
    monthly.push({ ...transaction, displayDate, isVirtualRecurring: true });
    return monthly;
  }, []);
}

function budgetAlertForTransaction(transaction) {
  if (transaction.type !== "expense") return null;
  const category = matchingExpenseCategory(transaction.category);
  const budget = budgetForCategory(category);
  if (budget <= 0) return null;

  const spent = expenseTotalsByCategory(transactionsForMonth(transaction.date))[canonicalCategoryName(category, "expense")] || 0;
  if (spent > budget) {
    return {
      level: "danger",
      message: t("budgetExceededAlert", { category: getLocalizedCategoryName(category, "expense"), amount: alertEuro(spent - budget) }),
    };
  }
  if (spent >= budget * 0.8) {
    return {
      level: "warning",
      message: t("budgetNearAlert", { category: getLocalizedCategoryName(category, "expense"), spent: alertEuro(spent), budget: alertEuro(budget) }),
    };
  }
  return null;
}

function showBudgetAlert(alert) {
  if (!alert || !elements.budgetAlertToast) return;
  elements.budgetAlertToast.textContent = alert.message;
  elements.budgetAlertToast.className = `budget-alert-toast ${alert.level}`;
  elements.budgetAlertToast.hidden = false;
  clearTimeout(showBudgetAlert.timeoutId);
  showBudgetAlert.timeoutId = setTimeout(() => {
    elements.budgetAlertToast.hidden = true;
  }, 6500);
}

function renderCategorySummary(monthly) {
  const totals = expenseTotalsByCategory(monthly);
  const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);

  elements.categorySummary.innerHTML = sorted.length
    ? sorted.map(([category, total]) => `<div class="category-row"><span>${escapeHtml(getLocalizedCategoryName(category, "expense"))}</span><strong>${euro.format(total)}</strong></div>`).join("")
    : `<p class="muted empty-copy">${t("noExpensesMonth")}</p>`;
}

function activeBudgetsWithSpending(monthly) {
  const totals = expenseTotalsByCategory(monthly);
  return allExpenseCategoryRows()
    .map((category) => ({ category, budget: Number(state.budgets[category]) || 0, spent: totals[category] || 0 }))
    .filter((item) => item.budget > 0);
}

function monthDayCount() {
  return new Date(state.selectedMonth.getFullYear(), state.selectedMonth.getMonth() + 1, 0).getDate();
}

function monthlyStatsData(monthly) {
  const income = sumByType(monthly, "income");
  const expenses = sumByType(monthly, "expense");
  const categoryTotals = expenseTotalsByCategory(monthly);
  const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);
  const activeBudgets = activeBudgetsWithSpending(monthly);
  return {
    income,
    expenses,
    balance: income - expenses,
    averageDailyExpense: expenses / monthDayCount(),
    biggestExpenseCategory: sortedCategories[0]?.[0] || "—",
    transactionCount: monthly.length,
    exceededBudgetsCount: activeBudgets.filter(({ budget, spent }) => spent > budget).length,
    sortedCategories,
  };
}

function smartInsightMessages(stats) {
  const messages = [];
  if (!stats.expenses) messages.push(t("noExpenseInsight"));
  else {
    messages.push(t("biggestCategoryInsight", { category: getLocalizedCategoryName(stats.biggestExpenseCategory, "expense") }));
    messages.push(t("averageDailyExpenseInsight", { amount: euro.format(stats.averageDailyExpense) }));
  }

  if (stats.exceededBudgetsCount > 0) {
    messages.push(t(stats.exceededBudgetsCount === 1 ? "exceededBudgetsInsight" : "exceededBudgetsInsightPlural", { count: stats.exceededBudgetsCount }));
  }

  if (stats.balance < 0) messages.push(t("negativeBalanceInsight"));
  else if (stats.balance > 0) messages.push(t("positiveBalanceInsight"));

  return messages.slice(0, 4);
}

function renderMonthlyStatistics(monthly) {
  if (!monthly.length) {
    elements.monthlyStats.innerHTML = `<p class="muted empty-copy">${t("noStats")}</p>`;
    elements.smartInsights.innerHTML = "";
    elements.statsCategoryBreakdown.innerHTML = "";
    return;
  }

  const stats = monthlyStatsData(monthly);
  const statItems = [
    [t("totalIncome"), euro.format(stats.income)],
    [t("totalExpenses"), euro.format(stats.expenses)],
    [t("balance"), euro.format(stats.balance)],
    [t("averageDailyExpense"), euro.format(stats.averageDailyExpense)],
    [t("biggestCategory"), stats.biggestExpenseCategory],
    [t("transactions"), String(stats.transactionCount)],
    [t("exceededBudgets"), String(stats.exceededBudgetsCount)],
  ];

  elements.monthlyStats.innerHTML = statItems.map(([label, value]) => `
    <div class="monthly-stat-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>`).join("");

  elements.smartInsights.innerHTML = smartInsightMessages(stats)
    .map((message) => `<p>💡 ${escapeHtml(message)}</p>`).join("");

  elements.statsCategoryBreakdown.innerHTML = stats.sortedCategories.length
    ? `<h4>${t("whereExpensesWent")}</h4><p class="muted stats-helper">${t("statsHelper")}</p>${stats.sortedCategories.map(([category, amount]) => {
      const percentage = stats.expenses > 0 ? (amount / stats.expenses) * 100 : 0;
      return `
        <div class="stats-bar-row">
          <div class="stats-bar-top"><span>${escapeHtml(getLocalizedCategoryName(category, "expense"))}</span><strong>${euro.format(amount)} · ${Math.round(percentage)}%</strong></div>
          <div class="stats-bar-track"><div class="stats-bar-fill" style="width: ${Math.max(percentage, 3)}%"></div></div>
        </div>`;
    }).join("")}`
    : `<p class="muted empty-copy">${t("noCategoryAnalysis")}</p>`;
}

function budgetStatus(percentage) {
  if (percentage >= 100) return { className: "danger", text: t("overBudget") };
  if (percentage >= 80) return { className: "warning", text: t("nearLimit") };
  return { className: "positive", text: t("withinBudget") };
}

function renderBudgetSummary(monthly) {
  const activeBudgets = activeBudgetsWithSpending(monthly);

  elements.budgetSummary.innerHTML = activeBudgets.length
    ? activeBudgets.map(({ category, budget, spent }) => {
      const rawPercentage = budget > 0 ? (spent / budget) * 100 : 0;
      const percentage = Math.round(rawPercentage);
      const status = budgetStatus(rawPercentage);
      return `
        <article class="budget-row ${status.className}">
          <div class="budget-row-top">
            <strong>${escapeHtml(getLocalizedCategoryName(category, "expense"))}</strong>
            <span>${percentage}%</span>
          </div>
          <div class="budget-amounts">${t("spentOf", { spent: euro.format(spent), budget: euro.format(budget) })}</div>
          <div class="progress-track budget-track"><div class="progress-bar budget-bar" style="width: ${Math.min(percentage, 100)}%"></div></div>
          <p>${status.text}</p>
        </article>`;
    }).join("")
    : `<p class="muted empty-copy">${t("budgetsSavedHint")}</p>`;
}

function renderDashboard() {
  renderMonthSelectors();
  const monthly = selectedMonthTransactions();
  const income = sumByType(monthly, "income");
  const expenses = sumByType(monthly, "expense");
  const balance = income - expenses;
  const percent = progressPercent(state.goals.savedAmount, state.goals.goalAmount);

  elements.incomeTotal.textContent = euro.format(income);
  elements.expenseTotal.textContent = euro.format(expenses);
  elements.balanceTotal.textContent = euro.format(balance);
  elements.savingsPercent.textContent = `${percent}%`;
  elements.savingsBar.style.width = `${percent}%`;
  elements.savingsText.textContent = state.goals.goalAmount > 0
    ? t("spentOf", { spent: euro.format(state.goals.savedAmount), budget: euro.format(state.goals.goalAmount) })
    : t("setGoalStart");
  renderMonthlyStatistics(monthly);
  renderCategorySummary(monthly);
  renderBudgetSummary(monthly);
  renderAccountSummary();
  renderUpcomingTransactions();

  if (!monthly.length) {
    elements.friendlyMessage.textContent = t("startFirstTransaction");
  } else if (balance > 0) {
    elements.friendlyMessage.textContent = t("positiveBalance");
  } else if (balance < 0) {
    elements.friendlyMessage.textContent = t("negativeBalance");
  } else {
    elements.friendlyMessage.textContent = t("evenBalance");
  }
}

function syncHistoryFilterControls(monthly = selectedMonthTransactions()) {
  const historyCategories = allHistoryCategories(monthly);
  elements.filter.value = state.filter;
  elements.categoryFilter.innerHTML = [
    `<option value="all">${t("allCategories")}</option>`,
    ...historyCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(getLocalizedCategoryName(category))}</option>`),
  ].join("");
  elements.categoryFilter.value = historyCategories.includes(state.categoryFilter) ? state.categoryFilter : "all";
  state.categoryFilter = elements.categoryFilter.value;
  elements.accountFilter.innerHTML = [`<option value="all">${t("allAccounts")}</option>`, ...state.accounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(displayAccountName(account))}</option>`)].join("");
  elements.accountFilter.value = state.accountFilter === "all" || state.accounts.some((account) => account.id === state.accountFilter) ? state.accountFilter : "all";
  state.accountFilter = elements.accountFilter.value;
  elements.recurringFilter.value = state.recurringFilter;
  elements.historySearch.value = state.searchQuery;
}

function normalizeSearchText(value) {
  return String(value || "").toLocaleLowerCase("el-GR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function transactionSearchText(transaction) {
  const typeLabel = transaction.type === "income" ? `${t("income")} income` : `${t("expense")} expense`;
  const sign = transaction.type === "income" ? "+" : "-";
  return [
    getLocalizedCategoryName(transaction.category, transaction.type),
    transaction.note,
    typeLabel,
    `${sign}${euro.format(transaction.amount)}`,
    String(transaction.amount),
  ].join(" ");
}

function filterHistoryTransactions(transactions) {
  const query = normalizeSearchText(state.searchQuery.trim());
  return transactions.filter((transaction) => {
    const matchesType = state.filter === "all" || transaction.type === state.filter;
    const matchesCategory = state.categoryFilter === "all" || transaction.category === state.categoryFilter;
    const matchesAccount = state.accountFilter === "all" || transactionAccountId(transaction) === state.accountFilter || transaction.fromAccountId === state.accountFilter || transaction.toAccountId === state.accountFilter;
    const matchesRecurring = state.recurringFilter === "all"
      || (state.recurringFilter === "recurring" && transaction.recurring)
      || (state.recurringFilter === "one-time" && !transaction.recurring);
    const matchesSearch = !query || normalizeSearchText(transactionSearchText(transaction)).includes(query);
    return matchesType && matchesCategory && matchesAccount && matchesRecurring && matchesSearch;
  });
}

function renderHistory() {
  renderMonthSelectors();
  const monthly = selectedMonthTransactions();
  syncHistoryFilterControls(monthly);
  const filtered = filterHistoryTransactions(monthly);
  const monthlyIncome = sumByType(monthly, "income");
  const monthlyExpenses = sumByType(monthly, "expense");
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  elements.historyIncomeTotal.textContent = euro.format(monthlyIncome);
  elements.historyExpenseTotal.textContent = euro.format(monthlyExpenses);
  elements.historyBalanceTotal.textContent = euro.format(monthlyBalance);
  elements.historyBalanceTotal.classList.toggle("negative", monthlyBalance < 0);

  if (!monthly.length) {
    elements.transactionList.innerHTML = `
      <div class="card empty-state history-empty">
        <strong>${t("noTransactionsMonth")}</strong>
        <span>${t("addIncomeExpenseStart")}</span>
      </div>`;
    return;
  }

  if (!filtered.length) {
    elements.transactionList.innerHTML = `
      <div class="card empty-state history-empty">
        <strong>${t("noFilteredTransactions")}</strong>
        <span>${t("tryDifferentSearch")}</span>
      </div>`;
    return;
  }

  const grouped = filtered
    .map((transaction, index) => ({ ...transaction, originalIndex: index }))
    .sort((a, b) => b.displayDate.localeCompare(a.displayDate) || b.originalIndex - a.originalIndex)
    .reduce((groups, transaction) => {
      groups[transaction.displayDate] = groups[transaction.displayDate] || [];
      groups[transaction.displayDate].push(transaction);
      return groups;
    }, {});

  elements.transactionList.innerHTML = Object.entries(grouped).map(([date, transactions]) => `
    <section class="transaction-date-group" aria-label="${t("transactions")} ${historyDateFormatter.format(new Date(`${date}T00:00:00`))}">
      <h3 class="date-heading">${historyDateFormatter.format(new Date(`${date}T00:00:00`))}</h3>
      <div class="date-transactions">
        ${transactions.map((transaction) => transactionCard(transaction)).join("")}
      </div>
    </section>`).join("");
}

function transactionCard(transaction) {
  const isIncome = transaction.type === "income";
  const isTransfer = transaction.type === "transfer";
  const typeLabel = isTransfer ? t("transferCategory") : (isIncome ? t("income") : t("expense"));
  const sign = isTransfer ? "" : (isIncome ? "+" : "-");
  const amount = `${sign}${euro.format(transaction.amount)}`;
  const note = transaction.note ? `<p class="transaction-note">${escapeHtml(transaction.note)}</p>` : "";
  const recurringMeta = transaction.recurring ? ` · ${t("monthly")}` : "";
  const recurringBadge = transaction.recurring ? `<span class="recurring-badge">${t("monthly")}</span>` : "";

  return `
    <article class="transaction-item ${transaction.type}">
      <div class="transaction-main">
        <div class="transaction-title-row">
          <h4>${escapeHtml(getLocalizedCategoryName(transaction.category, transaction.type))}</h4>
          ${recurringBadge}<span class="type-badge ${transaction.type}">${typeLabel}</span>
        </div>
        ${note}
        <p class="transaction-meta">${dateFormatter.format(new Date(`${transaction.displayDate || transaction.date}T00:00:00`))} · ${typeLabel}${recurringMeta} · ${escapeHtml(accountLabelForExport(transaction))}</p>
      </div>
      <div class="transaction-side">
        <strong class="amount ${transaction.type}">${amount}</strong>
        <div class="transaction-actions">
          <button class="edit-button" data-id="${escapeHtml(transaction.id)}" type="button">${t("edit")}</button>
          <button class="delete-button" data-id="${escapeHtml(transaction.id)}" type="button">${t("delete")}</button>
        </div>
      </div>
    </article>`;
}

function renderBudgetInputs() {
  elements.budgetInputs.innerHTML = allExpenseCategoryRows().map((category) => `
    <label class="budget-input-row">
      <span>${escapeHtml(getLocalizedCategoryName(category, "expense"))}</span>
      <input type="number" min="0" step="0.01" inputmode="decimal" data-budget-category="${escapeHtml(category)}" value="${state.budgets[category] || ""}" placeholder="0,00" />
    </label>`).join("");
}


function renderSecurity() {
  elements.manualLockHeader.hidden = !state.security.enabled;
  if (!state.security.enabled) {
    elements.securityPanel.innerHTML = `
      <form id="enablePinForm" class="security-form">
        <label>PIN
          <input id="newPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" placeholder="••••" />
        </label>
        <label>${t("confirmPin")}
          <input id="confirmPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" placeholder="••••" />
        </label>
        <button type="submit" class="primary-button">${t("enablePin")}</button>
      </form>`;
    return;
  }

  elements.securityPanel.innerHTML = `
    <div class="security-status">${t("pinActive")}</div>
    <div class="security-actions">
      <button id="lockNowSecurity" type="button" class="secondary-button">${t("lockNowSecurity")}</button>
      <button id="showChangePin" type="button" class="secondary-button">${t("changePin")}</button>
      <button id="showDisablePin" type="button" class="danger-button">${t("disablePin")}</button>
    </div>
    <div id="pinActionPanel" class="pin-action-panel"></div>`;
}

function renderPinAction(action) {
  const panel = document.querySelector("#pinActionPanel");
  if (!panel) return;
  panel.innerHTML = action === "change" ? `
    <form id="changePinForm" class="security-form">
      <label>${t("currentPin")}<input id="currentPin" type="password" inputmode="numeric" maxlength="4" autocomplete="current-password" pattern="[0-9]*" /></label>
      <label>${t("newPin")}<input id="changedPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" /></label>
      <label>${t("confirmNewPin")}<input id="changedConfirmPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" /></label>
      <button type="submit" class="primary-button">${t("saveNewPin")}</button>
    </form>` : `
    <form id="disablePinForm" class="security-form">
      <label>${t("currentPin")}<input id="disableCurrentPin" type="password" inputmode="numeric" maxlength="4" autocomplete="current-password" pattern="[0-9]*" /></label>
      <button type="submit" class="danger-button">${t("disablePin")}</button>
    </form>`;
}

async function setNewPin(pin) {
  const salt = createSalt();
  state.security = { enabled: true, salt, pinHash: await hashPin(pin, salt) };
  saveSecurity();
  setSessionUnlocked(true);
  renderSecurity();
  applyLockState();
}

function renderCategorySettings() {
  const categoryCountForType = (type) => (type === "expense" ? defaultExpenseCategories : defaultIncomeCategories).length + (state.customCategories[type] || []).length;
  const renderList = (type) => {
    const defaults = type === "expense" ? localizedDefaultExpenseCategories() : localizedDefaultIncomeCategories();
    const custom = state.customCategories[type] || [];
    const rows = [
      ...defaults.map((category) => ({ category, fixed: true, label: getLocalizedCategoryName(category, type) })),
      ...custom.map((category) => ({ category, fixed: false, label: category })),
    ];
    return rows.map(({ category, fixed, label }) => `
      <li class="category-list-item">
        <span>${escapeHtml(label)}</span>
        ${fixed ? `<span class="fixed-category-badge">${t("defaultBadge")}</span>` : `<button class="delete-category-button" data-category-type="${type}" data-category-name="${escapeHtml(category)}" type="button">${t("delete")}</button>`}
      </li>`).join("");
  };
  elements.incomeCategoryList.innerHTML = renderList("income");
  elements.expenseCategoryList.innerHTML = renderList("expense");
  elements.incomeCategoryPreview.textContent = t("categoriesCount", { count: categoryCountForType("income") });
  elements.expenseCategoryPreview.textContent = t("categoriesCount", { count: categoryCountForType("expense") });
}

function renderAccounts() {
  const duplicateWarning = duplicateAccountNameGroups().length
    ? `<p class="account-duplicate-warning" role="alert">${t("duplicateAccountWarning")}</p>`
    : "";
  const accountRows = state.accounts.map((account) => {
    const balance = accountBalance(account);
    const used = state.transactions.some((transaction) => transactionAccountId(transaction) === account.id || transaction.fromAccountId === account.id || transaction.toAccountId === account.id);
    const archivedBadge = account.archived ? `<span class="archived-account-badge">${t("archived")}</span>` : "";
    return `<div class="account-list-item ${account.archived ? "archived" : ""}"><div><strong>${escapeHtml(displayAccountName(account))}</strong><span>${escapeHtml(accountTypeLabel(account))}${archivedBadge}</span></div><strong class="account-list-balance ${balance < 0 ? "negative" : "positive"}">${euro.format(balance)}</strong><button class="edit-account-button" data-account-id="${escapeHtml(account.id)}" type="button">${t("rename")}</button><button class="delete-account-button" data-account-id="${escapeHtml(account.id)}" type="button">${used ? t("archive") : t("delete")}</button></div>`;
  }).join("");
  elements.accountsList.innerHTML = `${duplicateWarning}${accountRows}`;
}

function renderGoals() {
  renderBudgetInputs();
  const percent = progressPercent(state.goals.savedAmount, state.goals.goalAmount);
  elements.goalAmount.value = state.goals.goalAmount || "";
  elements.savedAmount.value = state.goals.savedAmount || "";
  elements.goalPercent.textContent = `${percent}%`;
  elements.goalText.textContent = state.goals.goalAmount > 0
    ? t("savedOfGoal", { saved: euro.format(state.goals.savedAmount), goal: euro.format(state.goals.goalAmount) })
    : t("noGoal");
  renderSecurity();
  renderCategorySettings();
  renderAccounts();
}

function render() {
  syncAddTransactionForm();
  updateAccountOptions();
  renderDashboard();
  renderHistory();
  renderGoals();
}

function normalizedTransactionType(type) {
  return type === "income" ? "income" : "expense";
}

function categoriesForType(type) {
  return allCategoriesForType(normalizedTransactionType(type));
}

function validCategoryForType(type, category) {
  const normalizedType = normalizedTransactionType(type);
  const canonical = canonicalCategoryName(category, normalizedType);
  return categoriesForType(normalizedType).includes(canonical);
}

function categoryForType(type, preferredCategory = "") {
  const normalizedType = normalizedTransactionType(type);
  const categories = categoriesForType(normalizedType);
  const canonical = canonicalCategoryName(preferredCategory, normalizedType);
  return categories.includes(canonical) ? canonical : categories[0];
}

function updateAccountOptions(selectedValue = elements.account.value) {
  const accounts = activeAccounts();
  const fallback = defaultAccount();
  const choices = accounts.length ? accounts : [fallback];
  const options = choices.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(displayAccountName(account))}</option>`).join("");
  elements.account.innerHTML = options;
  elements.fromAccount.innerHTML = options;
  elements.toAccount.innerHTML = options;
  const selected = choices.some((account) => account.id === selectedValue) ? selectedValue : fallback.id;
  elements.account.value = selected;
  elements.fromAccount.value = selected;
  elements.toAccount.value = choices.find((account) => account.id !== selected)?.id || selected;
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

function updateCategoryOptions(selectedValue = elements.category.value) {
  const normalizedType = normalizedTransactionType(elements.type.value);
  const baseCategories = categoriesForType(normalizedType);
  const selectedCanonical = canonicalCategoryName(selectedValue, normalizedType);
  const selectedCategory = baseCategories.includes(selectedCanonical) ? selectedCanonical : baseCategories[0];
  elements.category.innerHTML = baseCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(getLocalizedCategoryName(category, normalizedType))}</option>`).join("");
  elements.category.value = selectedCategory || "";
}

function syncAddTransactionForm(selectedCategory = elements.category.value) {
  updateTransactionTypeUi();
  updateCategoryOptions(selectedCategory);
}

function resetTransactionForm(message = "") {
  state.editingId = null;
  elements.transactionForm.reset();
  elements.type.value = "income";
  syncAddTransactionForm();
  elements.date.valueAsDate = new Date();
  elements.recurring.checked = false;
  updateAccountOptions();
  elements.formTitle.textContent = t("newTransaction");
  elements.formSubmit.textContent = t("save");
  elements.cancelEdit.hidden = true;
  elements.formMessage.textContent = message;
}

function startEdit(transaction) {
  state.editingId = transaction.id;
  elements.formTitle.textContent = t("editTransaction");
  elements.formSubmit.textContent = t("saveChanges");
  elements.cancelEdit.hidden = false;
  elements.type.value = transaction.type;
  syncAddTransactionForm(transaction.category);
  updateAccountOptions(transaction.accountId || transaction.fromAccountId || defaultAccount().id);
  elements.account.value = transactionAccountId(transaction);
  elements.fromAccount.value = transaction.fromAccountId || defaultAccount().id;
  elements.toAccount.value = transaction.toAccountId || defaultAccount().id;
  elements.amount.value = transaction.amount;
  elements.note.value = transaction.note;
  elements.date.value = transaction.date;
  elements.recurring.checked = Boolean(transaction.recurring);
  elements.formMessage.textContent = "";
  switchView("add");
}

function switchView(viewName) {
  if (viewName === "add") syncAddTransactionForm();
  elements.views.forEach((view) => view.classList.toggle("active", view.id === viewName));
  elements.navButtons.forEach((navButton) => navButton.classList.toggle("active", navButton.dataset.view === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;",
  })[character]);
}

document.querySelectorAll("[data-month-offset]").forEach((button) => {
  button.addEventListener("click", () => changeMonth(Number(button.dataset.monthOffset)));
});

elements.navButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
elements.type.addEventListener("change", () => syncAddTransactionForm());
elements.cancelEdit.addEventListener("click", () => resetTransactionForm());
elements.downloadBackup.addEventListener("click", exportBackup);
elements.exportCsv.addEventListener("click", exportTransactionsCsv);
elements.restoreBackup.addEventListener("change", (event) => restoreBackupFile(event.target.files[0]));
elements.checkUpdate.addEventListener("click", () => checkForUpdate().catch(() => showSettingsMessage(t("updateCheckFailed"), true)));
elements.clearAllData.addEventListener("click", clearAllUserData);
elements.finishOnboarding.addEventListener("click", finishOnboarding);
elements.languageSelect?.addEventListener("change", (event) => changeLanguage(event.target.value));

elements.categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = elements.categoryType.value === "income" ? "income" : "expense";
  const name = elements.categoryName.value.trim();
  if (!name) return showCategoryMessage(t("categoryNameRequired"), true);
  const exists = allCategoriesForType(type).some((category) => category.toLocaleLowerCase("el-GR") === name.toLocaleLowerCase("el-GR"));
  if (exists) return showCategoryMessage(t("categoryExists"), true);
  state.customCategories[type].push(name);
  saveCustomCategories();
  elements.categoryName.value = "";
  showCategoryMessage(t("categoryAdded"));
  render();
});

document.querySelector("#categorySettingsCard").addEventListener("click", (event) => {
  const button = event.target.closest(".delete-category-button");
  if (!button) return;
  const type = button.dataset.categoryType;
  const name = button.dataset.categoryName;
  if (!confirm(t("confirmDeleteCategory"))) return;
  const hasTransactions = state.transactions.some((transaction) => transaction.type === type && transaction.category === name);
  if (hasTransactions && !confirm(t("confirmDeleteCategoryWithTransactions"))) return;
  state.customCategories[type] = state.customCategories[type].filter((category) => category !== name);
  saveCustomCategories();
  showCategoryMessage(t("categoryDeleted"));
  render();
});

elements.accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = elements.accountName.value.trim().replace(/\s+/g, " ");
  if (!name) return showAccountMessage(t("accountNameRequired"), true);
  if (accountNameExists(name)) return showAccountMessage(t("accountExists"), true);
  state.accounts.push({ id: `acc_${Date.now()}`, name, type: elements.accountType.value, startingBalance: Number(elements.accountStartingBalance.value) || 0, archived: false });
  saveAccounts();
  elements.accountForm.reset();
  showAccountMessage(t("accountAdded"));
  render();
});

document.querySelector("#accountsSettingsCard").addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-account-button");
  if (editButton) {
    const account = state.accounts.find((item) => item.id === editButton.dataset.accountId);
    if (!account) return;
    const name = prompt(t("promptNewAccountName"), displayAccountName(account));
    if (name === null) return;
    const normalizedName = name.trim().replace(/\s+/g, " ");
    if (!normalizedName) return showAccountMessage(t("accountNameRequired"), true);
    if (accountNameExists(normalizedName, account.id)) return showAccountMessage(t("accountExists"), true);
    account.name = normalizedName;
    saveAccounts();
    showAccountMessage(t("accountRenamed"));
    render();
    return;
  }

  const button = event.target.closest(".delete-account-button");
  if (!button) return;
  const account = state.accounts.find((item) => item.id === button.dataset.accountId);
  if (!account) return;
  const used = state.transactions.some((transaction) => transactionAccountId(transaction) === account.id || transaction.fromAccountId === account.id || transaction.toAccountId === account.id);
  if (used) {
    if (!account.archived && activeAccounts().length <= 1) return showAccountMessage(t("needsActiveAccount"), true);
    if (!confirm(t("confirmArchiveAccountWithTransactions"))) return;
    account.archived = true;
  } else {
    state.accounts = state.accounts.filter((item) => item.id !== account.id);
    if (!state.accounts.length) state.accounts = normalizeAccounts([]);
  }
  saveAccounts();
  showAccountMessage(used ? t("accountArchived") : t("accountDeleted"));
  render();
});

function showAccountMessage(message, isError = false) {
  elements.accountMessage.textContent = message;
  elements.accountMessage.classList.toggle("error", isError);
}

elements.transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const isTransfer = elements.type.value === "transfer";
  const transaction = {
    id: state.editingId || (globalThis.crypto?.randomUUID?.() || String(Date.now())),
    type: elements.type.value,
    amount: Number(elements.amount.value),
    category: isTransfer ? t("transferCategory") : categoryForType(elements.type.value, elements.category.value.trim()),
    accountId: isTransfer ? "" : elements.account.value,
    fromAccountId: isTransfer ? elements.fromAccount.value : "",
    toAccountId: isTransfer ? elements.toAccount.value : "",
    note: elements.note.value.trim(),
    date: elements.date.value,
    recurring: isTransfer ? false : elements.recurring.checked,
  };

  if (!transaction.amount || !transaction.category || !transaction.date) return;
  if (isTransfer && (!transaction.fromAccountId || !transaction.toAccountId || transaction.fromAccountId === transaction.toAccountId)) return;
  if (state.editingId) {
    state.transactions = state.transactions.map((item) => item.id === state.editingId ? transaction : item);
    resetTransactionForm(t("changesSaved"));
  } else {
    state.transactions.push(transaction);
    resetTransactionForm(t("transactionAdded"));
  }
  const budgetAlert = budgetAlertForTransaction(transaction);
  saveTransactions();
  render();
  showBudgetAlert(budgetAlert);
});

elements.transactionList.addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-button");
  const deleteButton = event.target.closest(".delete-button");
  if (editButton) {
    const transaction = state.transactions.find((item) => item.id === editButton.dataset.id);
    if (transaction) startEdit(transaction);
    return;
  }
  if (!deleteButton) return;
  const transaction = state.transactions.find((item) => item.id === deleteButton.dataset.id);
  const deleteMessage = transaction?.recurring
    ? t("confirmDeleteRecurring")
    : t("confirmDeleteTransaction");
  if (!confirm(deleteMessage)) return;
  state.transactions = state.transactions.filter((transaction) => transaction.id !== deleteButton.dataset.id);
  if (state.editingId === deleteButton.dataset.id) resetTransactionForm();
  saveTransactions();
  render();
});

elements.upcomingList.addEventListener("click", (event) => {
  const button = event.target.closest(".record-upcoming-button");
  if (!button) return;
  button.disabled = true;
  const occurrence = upcomingTransactionsForSelectedMonth().find((transaction) => upcomingTransactionKey(transaction) === button.dataset.upcomingKey);
  if (!occurrence) {
    renderUpcomingTransactions();
    showUpcomingMessage(t("alreadyRecorded"), true);
    return;
  }
  recordUpcomingRecurringTransaction(occurrence);
});

elements.filter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  renderHistory();
});

elements.categoryFilter.addEventListener("change", (event) => {
  state.categoryFilter = event.target.value;
  renderHistory();
});

elements.accountFilter.addEventListener("change", (event) => {
  state.accountFilter = event.target.value;
  renderHistory();
});

elements.recurringFilter.addEventListener("change", (event) => {
  state.recurringFilter = event.target.value;
  renderHistory();
});

elements.historySearch.addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderHistory();
});

elements.clearHistoryFilters.addEventListener("click", () => {
  state.filter = "all";
  state.categoryFilter = "all";
  state.recurringFilter = "all";
  state.accountFilter = "all";
  state.searchQuery = "";
  renderHistory();
});

elements.budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nextBudgets = {};
  elements.budgetInputs.querySelectorAll("[data-budget-category]").forEach((input) => {
    nextBudgets[input.dataset.budgetCategory] = Math.max(Number(input.value) || 0, 0);
  });
  state.budgets = normalizeBudgets(nextBudgets);
  saveBudgets();
  render();
});

elements.goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.goals = {
    goalAmount: Number(elements.goalAmount.value) || 0,
    savedAmount: Number(elements.savedAmount.value) || 0,
  };
  saveGoals();
  render();
});


elements.unlockForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (await verifyPin(elements.unlockPin.value)) {
    setSessionUnlocked(true);
    hideLockScreen();
    return;
  }
  elements.unlockPin.value = "";
  elements.lockMessage.textContent = t("wrongPin");
  elements.lockMessage.classList.add("error");
});

elements.manualLockHeader.addEventListener("click", () => showLockScreen());

elements.securityPanel.addEventListener("click", (event) => {
  if (event.target.closest("#lockNowSecurity")) showLockScreen();
  if (event.target.closest("#showChangePin")) renderPinAction("change");
  if (event.target.closest("#showDisablePin")) renderPinAction("disable");
});

elements.securityPanel.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "enablePinForm") {
    const pin = form.querySelector("#newPin").value;
    const confirmPin = form.querySelector("#confirmPin").value;
    if (!isValidPin(pin)) return showSecurityMessage(t("pinRequired"), true);
    if (pin !== confirmPin) return showSecurityMessage(t("pinMismatch"), true);
    await setNewPin(pin);
    showSecurityMessage(t("pinEnabled"));
  }
  if (form.id === "changePinForm") {
    const currentPin = form.querySelector("#currentPin").value;
    const newPin = form.querySelector("#changedPin").value;
    const confirmPin = form.querySelector("#changedConfirmPin").value;
    if (!(await verifyPin(currentPin))) return showSecurityMessage(t("wrongCurrentPin"), true);
    if (!isValidPin(newPin)) return showSecurityMessage(t("pinRequired"), true);
    if (newPin !== confirmPin) return showSecurityMessage(t("newPinMismatch"), true);
    await setNewPin(newPin);
    showSecurityMessage(t("pinChanged"));
  }
  if (form.id === "disablePinForm") {
    const currentPin = form.querySelector("#disableCurrentPin").value;
    if (!(await verifyPin(currentPin))) return showSecurityMessage(t("wrongCurrentPin"), true);
    state.security = { enabled: false, salt: "", pinHash: "" };
    saveSecurity();
    setSessionUnlocked(false);
    renderSecurity();
    applyLockState();
    showSecurityMessage(t("pinDisabled"));
  }
});

document.addEventListener("visibilitychange", () => {
  if (!state.security.enabled) return;
  if (document.hidden) {
    state.hiddenAt = Date.now();
    return;
  }
  if (state.hiddenAt && Date.now() - state.hiddenAt > 2 * 60 * 1000) showLockScreen();
  state.hiddenAt = null;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

applyStaticTranslations();
resetTransactionForm();
render();
applyLockState();
showOnboardingIfNeeded();
