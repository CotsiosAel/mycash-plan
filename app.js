const storageKeys = {
  transactions: "mycash-plan-transactions",
  goals: "mycash-plan-goals",
};

const expenseCategories = ["Σπίτι", "Φαγητό", "Καφές", "Supermarket", "Μεταφορές", "Λογαριασμοί", "Ψυχαγωγία", "Υγεία", "Παιδί", "Κατοικίδιο", "Άλλο"];
const incomeCategories = ["Μισθός", "Επιχείρηση", "Δώρο", "Πώληση", "Άλλο"];

const today = new Date();

const state = {
  transactions: normalizeTransactions(JSON.parse(localStorage.getItem(storageKeys.transactions) || "[]")),
  goals: JSON.parse(localStorage.getItem(storageKeys.goals) || '{"goalAmount":0,"savedAmount":0}'),
  filter: "all",
  selectedMonth: new Date(today.getFullYear(), today.getMonth(), 1),
  editingId: null,
};

const euro = new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" });
const dateFormatter = new Intl.DateTimeFormat("el-GR", { dateStyle: "medium" });
const monthFormatter = new Intl.DateTimeFormat("el-GR", { month: "long", year: "numeric" });

const elements = {
  views: document.querySelectorAll(".view"),
  navButtons: document.querySelectorAll(".nav-button"),
  transactionForm: document.querySelector("#transactionForm"),
  goalForm: document.querySelector("#goalForm"),
  filter: document.querySelector("#filter"),
  type: document.querySelector("#type"),
  category: document.querySelector("#category"),
  amount: document.querySelector("#amount"),
  note: document.querySelector("#note"),
  date: document.querySelector("#date"),
  formTitle: document.querySelector("#add-title"),
  formSubmit: document.querySelector("#formSubmit"),
  cancelEdit: document.querySelector("#cancelEdit"),
  formMessage: document.querySelector("#formMessage"),
  dashboardMonthLabel: document.querySelector("#dashboardMonthLabel"),
  historyMonthLabel: document.querySelector("#historyMonthLabel"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  friendlyMessage: document.querySelector("#friendlyMessage"),
  categorySummary: document.querySelector("#categorySummary"),
  savingsPercent: document.querySelector("#savingsPercent"),
  savingsBar: document.querySelector("#savingsBar"),
  savingsText: document.querySelector("#savingsText"),
  transactionList: document.querySelector("#transactionList"),
  goalAmount: document.querySelector("#goalAmount"),
  savedAmount: document.querySelector("#savedAmount"),
  goalPercent: document.querySelector("#goalPercent"),
  goalText: document.querySelector("#goalText"),
};

function normalizeTransactions(transactions) {
  return Array.isArray(transactions) ? transactions.map((transaction, index) => ({
    id: transaction.id || `legacy-${index}-${transaction.date || Date.now()}`,
    type: transaction.type === "expense" ? "expense" : "income",
    amount: Number(transaction.amount) || 0,
    category: transaction.category || "Άλλο",
    note: transaction.note || "",
    date: transaction.date || new Date().toISOString().slice(0, 10),
  })) : [];
}

function saveTransactions() {
  localStorage.setItem(storageKeys.transactions, JSON.stringify(state.transactions));
}

function saveGoals() {
  localStorage.setItem(storageKeys.goals, JSON.stringify(state.goals));
}

function selectedMonthTransactions() {
  const month = state.selectedMonth.getMonth();
  const year = state.selectedMonth.getFullYear();
  return state.transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`);
    return date.getMonth() === month && date.getFullYear() === year;
  });
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

function renderCategorySummary(monthly) {
  const totals = monthly
    .filter((transaction) => transaction.type === "expense")
    .reduce((summary, transaction) => {
      summary[transaction.category] = (summary[transaction.category] || 0) + transaction.amount;
      return summary;
    }, {});
  const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);

  elements.categorySummary.innerHTML = sorted.length
    ? sorted.map(([category, total]) => `<div class="category-row"><span>${escapeHtml(category)}</span><strong>${euro.format(total)}</strong></div>`).join("")
    : '<p class="muted empty-copy">Δεν υπάρχουν έξοδα για αυτόν τον μήνα. Καλή αρχή!</p>';
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
  renderCategorySummary(monthly);

  if (balance > 0) {
    elements.friendlyMessage.textContent = "Υπέροχα! Αυτόν τον μήνα κρατάς θετικό υπόλοιπο.";
  } else if (balance < 0) {
    elements.friendlyMessage.textContent = "Προσοχή: τα έξοδα ξεπερνούν τα έσοδα. Μικρές αλλαγές βοηθούν.";
  } else {
    elements.friendlyMessage.textContent = "Ξεκίνα προσθέτοντας έσοδα και έξοδα για καθαρή εικόνα.";
  }
}

function renderHistory() {
  renderMonthSelectors();
  const monthly = selectedMonthTransactions();
  const filtered = state.filter === "all" ? monthly : monthly.filter((transaction) => transaction.type === state.filter);

  if (!filtered.length) {
    elements.transactionList.innerHTML = '<div class="card empty-state">Δεν υπάρχουν συναλλαγές για τον επιλεγμένο μήνα.</div>';
    return;
  }

  elements.transactionList.innerHTML = filtered.slice().sort((a, b) => b.date.localeCompare(a.date)).map((transaction) => {
    const sign = transaction.type === "income" ? "+" : "-";
    const note = transaction.note ? ` • ${transaction.note}` : "";
    return `
      <article class="transaction-item">
        <div>
          <h3>${escapeHtml(transaction.category)}</h3>
          <p>${dateFormatter.format(new Date(`${transaction.date}T00:00:00`))}${escapeHtml(note)}</p>
        </div>
        <div class="transaction-actions">
          <strong class="amount ${transaction.type}">${sign}${euro.format(transaction.amount)}</strong>
          <button class="edit-button" data-id="${transaction.id}" type="button">Επεξεργασία</button>
          <button class="delete-button" data-id="${transaction.id}" type="button">Διαγραφή</button>
        </div>
      </article>`;
  }).join("");
}

function renderGoals() {
  const percent = progressPercent(state.goals.savedAmount, state.goals.goalAmount);
  elements.goalAmount.value = state.goals.goalAmount || "";
  elements.savedAmount.value = state.goals.savedAmount || "";
  elements.goalPercent.textContent = `${percent}%`;
  elements.goalText.textContent = state.goals.goalAmount > 0
    ? `Έχεις αποταμιεύσει ${euro.format(state.goals.savedAmount)} από ${euro.format(state.goals.goalAmount)}.`
    : "Δεν έχει οριστεί στόχος ακόμη.";
}

function render() {
  updateCategoryOptions();
  renderDashboard();
  renderHistory();
  renderGoals();
}

function updateCategoryOptions(selectedValue = elements.category.value) {
  const categories = elements.type.value === "expense" ? [...expenseCategories] : [...incomeCategories];
  if (selectedValue && !categories.includes(selectedValue)) categories.push(selectedValue);
  elements.category.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  elements.category.value = categories.includes(selectedValue) ? selectedValue : categories[0];
}

function resetTransactionForm(message = "") {
  state.editingId = null;
  elements.transactionForm.reset();
  elements.type.value = "income";
  updateCategoryOptions();
  elements.date.valueAsDate = new Date();
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
  elements.category.value = transaction.category;
  elements.note.value = transaction.note;
  elements.date.value = transaction.date;
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

elements.transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const transaction = {
    id: state.editingId || (globalThis.crypto?.randomUUID?.() || String(Date.now())),
    type: elements.type.value,
    amount: Number(elements.amount.value),
    category: elements.category.value.trim(),
    note: elements.note.value.trim(),
    date: elements.date.value,
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
  state.transactions = state.transactions.filter((transaction) => transaction.id !== deleteButton.dataset.id);
  if (state.editingId === deleteButton.dataset.id) resetTransactionForm();
  saveTransactions();
  render();
});

elements.filter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  renderHistory();
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

resetTransactionForm();
render();
