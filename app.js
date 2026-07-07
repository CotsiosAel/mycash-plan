const appVersion = "2.0";

const storageKeys = {
  transactions: "mycash-plan-transactions",
  goals: "mycash-plan-goals",
  budgets: "mycash-plan-budgets",
  security: "mycash-plan-security",
  sessionUnlocked: "mycash-plan-session-unlocked",
  customCategories: "mycash-plan-custom-categories",
  onboardingSeen: "mycash-plan-onboarding-seen",
};

const defaultExpenseCategories = ["Σπίτι", "Φαγητό", "Καφές", "Supermarket", "Μεταφορές", "Λογαριασμοί", "Ψυχαγωγία", "Υγεία", "Παιδί", "Κατοικίδιο", "Άλλο"];
const defaultIncomeCategories = ["Μισθός", "Επιχείρηση", "Δώρο", "Πώληση", "Άλλο"];


const today = new Date();

const state = {
  transactions: normalizeTransactions(JSON.parse(localStorage.getItem(storageKeys.transactions) || "[]")),
  goals: JSON.parse(localStorage.getItem(storageKeys.goals) || '{"goalAmount":0,"savedAmount":0}'),
  customCategories: normalizeCustomCategories(JSON.parse(localStorage.getItem(storageKeys.customCategories) || "{}")),
  budgets: JSON.parse(localStorage.getItem(storageKeys.budgets) || "{}"),
  filter: "all",
  categoryFilter: "all",
  recurringFilter: "all",
  searchQuery: "",
  selectedMonth: new Date(today.getFullYear(), today.getMonth(), 1),
  editingId: null,
  security: normalizeSecurity(JSON.parse(localStorage.getItem(storageKeys.security) || "{}")),
  hiddenAt: null,
};
state.budgets = normalizeBudgets(state.budgets);

const euro = new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" });
const dateFormatter = new Intl.DateTimeFormat("el-GR", { dateStyle: "medium" });
const historyDateFormatter = new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "short", year: "numeric" });
const monthFormatter = new Intl.DateTimeFormat("el-GR", { month: "long", year: "numeric" });

const elements = {
  views: document.querySelectorAll(".view"),
  navButtons: document.querySelectorAll(".nav-button"),
  transactionForm: document.querySelector("#transactionForm"),
  goalForm: document.querySelector("#goalForm"),
  budgetForm: document.querySelector("#budgetForm"),
  categoryForm: document.querySelector("#categoryForm"),
  filter: document.querySelector("#filter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  recurringFilter: document.querySelector("#recurringFilter"),
  historySearch: document.querySelector("#historySearch"),
  clearHistoryFilters: document.querySelector("#clearHistoryFilters"),
  type: document.querySelector("#type"),
  category: document.querySelector("#category"),
  amount: document.querySelector("#amount"),
  note: document.querySelector("#note"),
  date: document.querySelector("#date"),
  recurring: document.querySelector("#recurring"),
  formTitle: document.querySelector("#add-title"),
  formSubmit: document.querySelector("#formSubmit"),
  cancelEdit: document.querySelector("#cancelEdit"),
  formMessage: document.querySelector("#formMessage"),
  dashboardMonthLabel: document.querySelector("#dashboardMonthLabel"),
  historyMonthLabel: document.querySelector("#historyMonthLabel"),
  historyIncomeTotal: document.querySelector("#historyIncomeTotal"),
  historyExpenseTotal: document.querySelector("#historyExpenseTotal"),
  historyBalanceTotal: document.querySelector("#historyBalanceTotal"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  friendlyMessage: document.querySelector("#friendlyMessage"),
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
};


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
  const defaults = type === "expense" ? defaultExpenseCategories : defaultIncomeCategories;
  const custom = state?.customCategories?.[type] || [];
  return [...new Set([...defaults, ...custom])];
}

function allExpenseCategoryRows() {
  return [...new Set([
    ...allCategoriesForType("expense"),
    ...state.transactions.filter((transaction) => transaction.type === "expense").map((transaction) => transaction.category),
    ...Object.keys(state.budgets || {}),
  ])].filter(Boolean);
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
    type: transaction.type === "expense" ? "expense" : "income",
    amount: Number(transaction.amount) || 0,
    category: transaction.category || "Άλλο",
    note: transaction.note || "",
    date: transaction.date || new Date().toISOString().slice(0, 10),
    recurring: Boolean(transaction.recurring),
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
  if (!confirm("Θέλεις σίγουρα να διαγράψεις όλα τα δεδομένα; Αυτή η ενέργεια δεν αναιρείται.")) return;
  const removePin = confirm("Θέλεις να αφαιρεθεί και το PIN;");
  state.transactions = [];
  state.goals = { goalAmount: 0, savedAmount: 0 };
  state.customCategories = { income: [], expense: [] };
  state.budgets = normalizeBudgets({});
  state.editingId = null;
  saveTransactions();
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
  showSettingsMessage("Τα δεδομένα διαγράφηκαν.");
}

async function checkForUpdate() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
  }
  showSettingsMessage("Έγινε έλεγχος ενημέρωσης.");
}

function createBackupPayload() {
  return {
    app: "MyCash Plan",
    version: appVersion,
    exportDate: new Date().toISOString(),
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
  showBackupMessage("Το backup δημιουργήθηκε επιτυχώς.");
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportTransactionsCsv() {
  const header = ["Date", "Type", "Category", "Note", "Amount", "Recurring"];
  const rows = state.transactions.map((transaction) => [
    transaction.date,
    transaction.type,
    transaction.category,
    transaction.note,
    Number(transaction.amount).toFixed(2),
    transaction.recurring ? "Yes" : "No",
  ]);
  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
  downloadFile(`\ufeff${csv}`, `mycash-plan-transactions-${todayFileStamp()}.csv`, "text/csv;charset=utf-8");
  showBackupMessage("Το CSV δημιουργήθηκε επιτυχώς.");
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
    showBackupMessage("Το αρχείο backup δεν είναι έγκυρο.", true);
    return;
  }

  if (!confirm("Η επαναφορά θα αντικαταστήσει τα τωρινά δεδομένα. Συνέχεια;")) return;

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
  saveGoals();
  saveBudgets();
  saveCustomCategories();
  resetTransactionForm();
  render();
  applyLockState();
  showBackupMessage("Το backup επαναφέρθηκε επιτυχώς.");
}

function restoreBackupFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      restoreBackupPayload(JSON.parse(reader.result));
    } catch (error) {
      showBackupMessage("Το αρχείο backup δεν είναι έγκυρο.", true);
    } finally {
      elements.restoreBackup.value = "";
    }
  });
  reader.addEventListener("error", () => {
    showBackupMessage("Το αρχείο backup δεν είναι έγκυρο.", true);
    elements.restoreBackup.value = "";
  });
  reader.readAsText(file);
}

function selectedMonthTransactions() {
  const selectedYear = state.selectedMonth.getFullYear();
  const selectedMonth = state.selectedMonth.getMonth();
  const selectedMonthStart = new Date(selectedYear, selectedMonth, 1);

  return state.transactions.reduce((monthly, transaction) => {
    const originalDate = new Date(`${transaction.date}T00:00:00`);
    const isInSelectedMonth = originalDate.getMonth() === selectedMonth && originalDate.getFullYear() === selectedYear;

    if (isInSelectedMonth) {
      monthly.push({ ...transaction, displayDate: transaction.date });
      return monthly;
    }

    if (!transaction.recurring) return monthly;

    const startMonth = new Date(originalDate.getFullYear(), originalDate.getMonth(), 1);
    if (startMonth > selectedMonthStart) return monthly;

    monthly.push({
      ...transaction,
      displayDate: recurringDisplayDate(transaction.date, selectedYear, selectedMonth),
      isVirtualRecurring: true,
    });
    return monthly;
  }, []);
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

function expenseTotalsByCategory(monthly) {
  return monthly
    .filter((transaction) => transaction.type === "expense")
    .reduce((summary, transaction) => {
      summary[transaction.category] = (summary[transaction.category] || 0) + transaction.amount;
      return summary;
    }, {});
}

function renderCategorySummary(monthly) {
  const totals = expenseTotalsByCategory(monthly);
  const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);

  elements.categorySummary.innerHTML = sorted.length
    ? sorted.map(([category, total]) => `<div class="category-row"><span>${escapeHtml(category)}</span><strong>${euro.format(total)}</strong></div>`).join("")
    : '<p class="muted empty-copy">Δεν υπάρχουν έξοδα για αυτόν τον μήνα. Καλή αρχή!</p>';
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
  if (!stats.expenses) messages.push("Δεν έχεις έξοδα για αυτόν τον μήνα. Καλή αρχή!");
  else {
    messages.push(`Η μεγαλύτερη κατηγορία εξόδων σου είναι ${stats.biggestExpenseCategory}.`);
    messages.push(`Το μέσο ημερήσιο έξοδό σου είναι ${euro.format(stats.averageDailyExpense)}.`);
  }

  if (stats.exceededBudgetsCount > 0) {
    messages.push(`Έχεις ξεπεράσει ${stats.exceededBudgetsCount} budget αυτόν τον μήνα.`);
  }

  if (stats.balance < 0) messages.push("Τα έξοδα ξεπερνούν τα έσοδα. Πρόσεξε τις επόμενες κινήσεις.");
  else if (stats.balance > 0) messages.push("Κρατάς θετικό υπόλοιπο αυτόν τον μήνα.");

  return messages.slice(0, 4);
}

function renderMonthlyStatistics(monthly) {
  if (!monthly.length) {
    elements.monthlyStats.innerHTML = '<p class="muted empty-copy">Δεν υπάρχουν αρκετά δεδομένα για στατιστικά αυτόν τον μήνα.</p>';
    elements.smartInsights.innerHTML = "";
    elements.statsCategoryBreakdown.innerHTML = "";
    return;
  }

  const stats = monthlyStatsData(monthly);
  const statItems = [
    ["Σύνολο εσόδων", euro.format(stats.income)],
    ["Σύνολο εξόδων", euro.format(stats.expenses)],
    ["Υπόλοιπο", euro.format(stats.balance)],
    ["Μέσο ημερήσιο έξοδο", euro.format(stats.averageDailyExpense)],
    ["Μεγαλύτερη κατηγορία", stats.biggestExpenseCategory],
    ["Συναλλαγές", String(stats.transactionCount)],
    ["Budgets που ξεπεράστηκαν", String(stats.exceededBudgetsCount)],
  ];

  elements.monthlyStats.innerHTML = statItems.map(([label, value]) => `
    <div class="monthly-stat-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>`).join("");

  elements.smartInsights.innerHTML = smartInsightMessages(stats)
    .map((message) => `<p>💡 ${escapeHtml(message)}</p>`).join("");

  elements.statsCategoryBreakdown.innerHTML = stats.sortedCategories.length
    ? `<h4>Πού πήγαν τα έξοδα</h4><p class="muted stats-helper">Ποσοστό επί των συνολικών εξόδων του μήνα.</p>${stats.sortedCategories.map(([category, amount]) => {
      const percentage = stats.expenses > 0 ? (amount / stats.expenses) * 100 : 0;
      return `
        <div class="stats-bar-row">
          <div class="stats-bar-top"><span>${escapeHtml(category)}</span><strong>${euro.format(amount)} · ${Math.round(percentage)}%</strong></div>
          <div class="stats-bar-track"><div class="stats-bar-fill" style="width: ${Math.max(percentage, 3)}%"></div></div>
        </div>`;
    }).join("")}`
    : '<p class="muted empty-copy">Δεν υπάρχουν έξοδα για ανάλυση κατηγοριών.</p>';
}

function budgetStatus(percentage) {
  if (percentage >= 100) return { className: "danger", text: "Ξεπέρασες το budget" };
  if (percentage >= 80) return { className: "warning", text: "Πλησιάζεις το όριο" };
  return { className: "positive", text: "Εντός budget" };
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
            <strong>${escapeHtml(category)}</strong>
            <span>${percentage}%</span>
          </div>
          <div class="budget-amounts">${euro.format(spent)} από ${euro.format(budget)}</div>
          <div class="progress-track budget-track"><div class="progress-bar budget-bar" style="width: ${Math.min(percentage, 100)}%"></div></div>
          <p>${status.text}</p>
        </article>`;
    }).join("")
    : '<p class="muted empty-copy">Όρισε budgets από τους Στόχους για να παρακολουθείς τα όριά σου.</p>';
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
    ? `${euro.format(state.goals.savedAmount)} από ${euro.format(state.goals.goalAmount)}`
    : "Όρισε στόχο για να ξεκινήσεις.";
  renderMonthlyStatistics(monthly);
  renderCategorySummary(monthly);
  renderBudgetSummary(monthly);

  if (!monthly.length) {
    elements.friendlyMessage.textContent = "Ξεκίνα προσθέτοντας το πρώτο σου έσοδο ή έξοδο.";
  } else if (balance > 0) {
    elements.friendlyMessage.textContent = "Υπέροχα! Αυτόν τον μήνα κρατάς θετικό υπόλοιπο.";
  } else if (balance < 0) {
    elements.friendlyMessage.textContent = "Προσοχή: τα έξοδα ξεπερνούν τα έσοδα. Μικρές αλλαγές βοηθούν.";
  } else {
    elements.friendlyMessage.textContent = "Τα έσοδα και τα έξοδα είναι ισορροπημένα αυτόν τον μήνα.";
  }
}

function syncHistoryFilterControls(monthly = selectedMonthTransactions()) {
  const historyCategories = allHistoryCategories(monthly);
  elements.filter.value = state.filter;
  elements.categoryFilter.innerHTML = [
    '<option value="all">Όλες οι κατηγορίες</option>',
    ...historyCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
  ].join("");
  elements.categoryFilter.value = historyCategories.includes(state.categoryFilter) ? state.categoryFilter : "all";
  state.categoryFilter = elements.categoryFilter.value;
  elements.recurringFilter.value = state.recurringFilter;
  elements.historySearch.value = state.searchQuery;
}

function normalizeSearchText(value) {
  return String(value || "").toLocaleLowerCase("el-GR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function transactionSearchText(transaction) {
  const typeLabel = transaction.type === "income" ? "Έσοδο Έσοδα income" : "Έξοδο Έξοδα expense";
  const sign = transaction.type === "income" ? "+" : "-";
  return [
    transaction.category,
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
    const matchesRecurring = state.recurringFilter === "all"
      || (state.recurringFilter === "recurring" && transaction.recurring)
      || (state.recurringFilter === "one-time" && !transaction.recurring);
    const matchesSearch = !query || normalizeSearchText(transactionSearchText(transaction)).includes(query);
    return matchesType && matchesCategory && matchesRecurring && matchesSearch;
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
        <strong>Δεν υπάρχουν συναλλαγές για αυτόν τον μήνα.</strong>
        <span>Πρόσθεσε έσοδα ή έξοδα για να ξεκινήσεις.</span>
      </div>`;
    return;
  }

  if (!filtered.length) {
    elements.transactionList.innerHTML = `
      <div class="card empty-state history-empty">
        <strong>Δεν βρέθηκαν συναλλαγές με αυτά τα φίλτρα.</strong>
        <span>Δοκίμασε διαφορετική αναζήτηση ή καθάρισε τα φίλτρα.</span>
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
    <section class="transaction-date-group" aria-label="Συναλλαγές ${historyDateFormatter.format(new Date(`${date}T00:00:00`))}">
      <h3 class="date-heading">${historyDateFormatter.format(new Date(`${date}T00:00:00`))}</h3>
      <div class="date-transactions">
        ${transactions.map((transaction) => transactionCard(transaction)).join("")}
      </div>
    </section>`).join("");
}

function transactionCard(transaction) {
  const isIncome = transaction.type === "income";
  const typeLabel = isIncome ? "Έσοδο" : "Έξοδο";
  const sign = isIncome ? "+" : "-";
  const amount = `${sign}${euro.format(transaction.amount)}`;
  const note = transaction.note ? `<p class="transaction-note">${escapeHtml(transaction.note)}</p>` : "";
  const recurringMeta = transaction.recurring ? " · Μηνιαίο" : "";
  const recurringBadge = transaction.recurring ? '<span class="recurring-badge">Μηνιαίο</span>' : "";

  return `
    <article class="transaction-item ${transaction.type}">
      <div class="transaction-main">
        <div class="transaction-title-row">
          <h4>${escapeHtml(transaction.category)}</h4>
          ${recurringBadge}<span class="type-badge ${transaction.type}">${typeLabel}</span>
        </div>
        ${note}
        <p class="transaction-meta">${dateFormatter.format(new Date(`${transaction.displayDate || transaction.date}T00:00:00`))} · ${typeLabel}${recurringMeta}</p>
      </div>
      <div class="transaction-side">
        <strong class="amount ${transaction.type}">${amount}</strong>
        <div class="transaction-actions">
          <button class="edit-button" data-id="${escapeHtml(transaction.id)}" type="button">Επεξεργασία</button>
          <button class="delete-button" data-id="${escapeHtml(transaction.id)}" type="button">Διαγραφή</button>
        </div>
      </div>
    </article>`;
}

function renderBudgetInputs() {
  elements.budgetInputs.innerHTML = allExpenseCategoryRows().map((category) => `
    <label class="budget-input-row">
      <span>${escapeHtml(category)}</span>
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
        <label>Επιβεβαίωση PIN
          <input id="confirmPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" placeholder="••••" />
        </label>
        <button type="submit" class="primary-button">Ενεργοποίηση PIN</button>
      </form>`;
    return;
  }

  elements.securityPanel.innerHTML = `
    <div class="security-status">Το PIN είναι ενεργό</div>
    <div class="security-actions">
      <button id="lockNowSecurity" type="button" class="secondary-button">Κλείδωμα τώρα</button>
      <button id="showChangePin" type="button" class="secondary-button">Αλλαγή PIN</button>
      <button id="showDisablePin" type="button" class="danger-button">Απενεργοποίηση PIN</button>
    </div>
    <div id="pinActionPanel" class="pin-action-panel"></div>`;
}

function renderPinAction(action) {
  const panel = document.querySelector("#pinActionPanel");
  if (!panel) return;
  panel.innerHTML = action === "change" ? `
    <form id="changePinForm" class="security-form">
      <label>Τρέχον PIN<input id="currentPin" type="password" inputmode="numeric" maxlength="4" autocomplete="current-password" pattern="[0-9]*" /></label>
      <label>Νέο PIN<input id="changedPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" /></label>
      <label>Επιβεβαίωση νέου PIN<input id="changedConfirmPin" type="password" inputmode="numeric" maxlength="4" autocomplete="new-password" pattern="[0-9]*" /></label>
      <button type="submit" class="primary-button">Αποθήκευση νέου PIN</button>
    </form>` : `
    <form id="disablePinForm" class="security-form">
      <label>Τρέχον PIN<input id="disableCurrentPin" type="password" inputmode="numeric" maxlength="4" autocomplete="current-password" pattern="[0-9]*" /></label>
      <button type="submit" class="danger-button">Απενεργοποίηση PIN</button>
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
  const renderList = (type) => {
    const defaults = type === "expense" ? defaultExpenseCategories : defaultIncomeCategories;
    const custom = state.customCategories[type] || [];
    const rows = [
      ...defaults.map((category) => ({ category, fixed: true })),
      ...custom.map((category) => ({ category, fixed: false })),
    ];
    return rows.map(({ category, fixed }) => `
      <li class="category-list-item">
        <span>${escapeHtml(category)}</span>
        ${fixed ? '<span class="fixed-category-badge">Προεπιλογή</span>' : `<button class="delete-category-button" data-category-type="${type}" data-category-name="${escapeHtml(category)}" type="button">Διαγραφή</button>`}
      </li>`).join("");
  };
  elements.incomeCategoryList.innerHTML = renderList("income");
  elements.expenseCategoryList.innerHTML = renderList("expense");
}

function renderGoals() {
  renderBudgetInputs();
  const percent = progressPercent(state.goals.savedAmount, state.goals.goalAmount);
  elements.goalAmount.value = state.goals.goalAmount || "";
  elements.savedAmount.value = state.goals.savedAmount || "";
  elements.goalPercent.textContent = `${percent}%`;
  elements.goalText.textContent = state.goals.goalAmount > 0
    ? `Έχεις αποταμιεύσει ${euro.format(state.goals.savedAmount)} από ${euro.format(state.goals.goalAmount)}.`
    : "Δεν έχει οριστεί στόχος ακόμη.";
  renderSecurity();
  renderCategorySettings();
}

function render() {
  updateCategoryOptions();
  renderDashboard();
  renderHistory();
  renderGoals();
}

function categoriesForType(type) {
  return allCategoriesForType(type);
}

function validCategoryForType(type, category) {
  return categoriesForType(type).includes(category);
}

function categoryForType(type, preferredCategory = "") {
  const categories = categoriesForType(type);
  return validCategoryForType(type, preferredCategory) ? preferredCategory : categories[0];
}

function updateCategoryOptions(selectedValue = elements.category.value) {
  const baseCategories = categoriesForType(elements.type.value);
  const trimmedSelected = String(selectedValue || "").trim();
  const categories = trimmedSelected && !baseCategories.includes(trimmedSelected) ? [...baseCategories, trimmedSelected] : baseCategories;
  const selectedCategory = categories.includes(trimmedSelected) ? trimmedSelected : categories[0];
  elements.category.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  elements.category.value = selectedCategory;
}

function resetTransactionForm(message = "") {
  state.editingId = null;
  elements.transactionForm.reset();
  elements.type.value = "income";
  updateCategoryOptions();
  elements.date.valueAsDate = new Date();
  elements.recurring.checked = false;
  elements.formTitle.textContent = "Νέα συναλλαγή";
  elements.formSubmit.textContent = "Αποθήκευση";
  elements.cancelEdit.hidden = true;
  elements.formMessage.textContent = message;
}

function startEdit(transaction) {
  state.editingId = transaction.id;
  elements.formTitle.textContent = "Επεξεργασία συναλλαγής";
  elements.formSubmit.textContent = "Αποθήκευση αλλαγών";
  elements.cancelEdit.hidden = false;
  elements.type.value = transaction.type;
  updateCategoryOptions(transaction.category);
  elements.amount.value = transaction.amount;
  elements.note.value = transaction.note;
  elements.date.value = transaction.date;
  elements.recurring.checked = Boolean(transaction.recurring);
  elements.formMessage.textContent = "";
  switchView("add");
}

function switchView(viewName) {
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
elements.type.addEventListener("change", () => updateCategoryOptions());
elements.cancelEdit.addEventListener("click", () => resetTransactionForm());
elements.downloadBackup.addEventListener("click", exportBackup);
elements.exportCsv.addEventListener("click", exportTransactionsCsv);
elements.restoreBackup.addEventListener("change", (event) => restoreBackupFile(event.target.files[0]));
elements.checkUpdate.addEventListener("click", () => checkForUpdate().catch(() => showSettingsMessage("Δεν ήταν δυνατός ο έλεγχος ενημέρωσης.", true)));
elements.clearAllData.addEventListener("click", clearAllUserData);
elements.finishOnboarding.addEventListener("click", finishOnboarding);

elements.categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = elements.categoryType.value === "income" ? "income" : "expense";
  const name = elements.categoryName.value.trim();
  if (!name) return showCategoryMessage("Συμπλήρωσε όνομα κατηγορίας.", true);
  const exists = allCategoriesForType(type).some((category) => category.toLocaleLowerCase("el-GR") === name.toLocaleLowerCase("el-GR"));
  if (exists) return showCategoryMessage("Αυτή η κατηγορία υπάρχει ήδη.", true);
  state.customCategories[type].push(name);
  saveCustomCategories();
  elements.categoryName.value = "";
  showCategoryMessage("Η κατηγορία προστέθηκε.");
  render();
});

document.querySelector("#categorySettingsCard").addEventListener("click", (event) => {
  const button = event.target.closest(".delete-category-button");
  if (!button) return;
  const type = button.dataset.categoryType;
  const name = button.dataset.categoryName;
  if (!confirm("Θέλεις σίγουρα να διαγράψεις αυτή την κατηγορία;")) return;
  const hasTransactions = state.transactions.some((transaction) => transaction.type === type && transaction.category === name);
  if (hasTransactions && !confirm("Υπάρχουν συναλλαγές με αυτή την κατηγορία. Αν τη διαγράψεις, οι παλιές συναλλαγές θα παραμείνουν όπως είναι.")) return;
  state.customCategories[type] = state.customCategories[type].filter((category) => category !== name);
  saveCustomCategories();
  showCategoryMessage("Η κατηγορία διαγράφηκε.");
  render();
});

elements.transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const transaction = {
    id: state.editingId || (globalThis.crypto?.randomUUID?.() || String(Date.now())),
    type: elements.type.value,
    amount: Number(elements.amount.value),
    category: categoryForType(elements.type.value, elements.category.value.trim()),
    note: elements.note.value.trim(),
    date: elements.date.value,
    recurring: elements.recurring.checked,
  };

  if (!transaction.amount || !transaction.category || !transaction.date) return;
  if (state.editingId) {
    state.transactions = state.transactions.map((item) => item.id === state.editingId ? transaction : item);
    resetTransactionForm("Οι αλλαγές αποθηκεύτηκαν επιτυχώς.");
  } else {
    state.transactions.push(transaction);
    resetTransactionForm("Η συναλλαγή προστέθηκε επιτυχώς.");
  }
  saveTransactions();
  render();
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
    ? "Αυτή η συναλλαγή επαναλαμβάνεται κάθε μήνα. Θέλεις σίγουρα να τη διαγράψεις;"
    : "Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτή τη συναλλαγή;";
  if (!confirm(deleteMessage)) return;
  state.transactions = state.transactions.filter((transaction) => transaction.id !== deleteButton.dataset.id);
  if (state.editingId === deleteButton.dataset.id) resetTransactionForm();
  saveTransactions();
  render();
});

elements.filter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  renderHistory();
});

elements.categoryFilter.addEventListener("change", (event) => {
  state.categoryFilter = event.target.value;
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
  elements.lockMessage.textContent = "Λάθος PIN. Δοκίμασε ξανά.";
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
    if (!isValidPin(pin)) return showSecurityMessage("Το PIN πρέπει να έχει ακριβώς 4 ψηφία.", true);
    if (pin !== confirmPin) return showSecurityMessage("Τα PIN δεν ταιριάζουν.", true);
    await setNewPin(pin);
    showSecurityMessage("Το PIN ενεργοποιήθηκε επιτυχώς.");
  }
  if (form.id === "changePinForm") {
    const currentPin = form.querySelector("#currentPin").value;
    const newPin = form.querySelector("#changedPin").value;
    const confirmPin = form.querySelector("#changedConfirmPin").value;
    if (!(await verifyPin(currentPin))) return showSecurityMessage("Το τρέχον PIN δεν είναι σωστό.", true);
    if (!isValidPin(newPin)) return showSecurityMessage("Το νέο PIN πρέπει να έχει ακριβώς 4 ψηφία.", true);
    if (newPin !== confirmPin) return showSecurityMessage("Τα νέα PIN δεν ταιριάζουν.", true);
    await setNewPin(newPin);
    showSecurityMessage("Το PIN άλλαξε επιτυχώς.");
  }
  if (form.id === "disablePinForm") {
    const currentPin = form.querySelector("#disableCurrentPin").value;
    if (!(await verifyPin(currentPin))) return showSecurityMessage("Το τρέχον PIN δεν είναι σωστό.", true);
    state.security = { enabled: false, salt: "", pinHash: "" };
    saveSecurity();
    setSessionUnlocked(false);
    renderSecurity();
    applyLockState();
    showSecurityMessage("Το PIN απενεργοποιήθηκε επιτυχώς.");
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

resetTransactionForm();
render();
applyLockState();
showOnboardingIfNeeded();
