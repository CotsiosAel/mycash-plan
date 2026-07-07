const storageKeys = {
  transactions: "mycash-plan-transactions",
  goals: "mycash-plan-goals",
};

const state = {
  transactions: JSON.parse(localStorage.getItem(storageKeys.transactions) || "[]"),
  goals: JSON.parse(localStorage.getItem(storageKeys.goals) || '{"goalAmount":0,"savedAmount":0}'),
  filter: "all",
};

const euro = new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" });
const dateFormatter = new Intl.DateTimeFormat("el-GR", { dateStyle: "medium" });

const elements = {
  views: document.querySelectorAll(".view"),
  navButtons: document.querySelectorAll(".nav-button"),
  transactionForm: document.querySelector("#transactionForm"),
  goalForm: document.querySelector("#goalForm"),
  filter: document.querySelector("#filter"),
  date: document.querySelector("#date"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  friendlyMessage: document.querySelector("#friendlyMessage"),
  savingsPercent: document.querySelector("#savingsPercent"),
  savingsBar: document.querySelector("#savingsBar"),
  savingsText: document.querySelector("#savingsText"),
  transactionList: document.querySelector("#transactionList"),
  goalAmount: document.querySelector("#goalAmount"),
  savedAmount: document.querySelector("#savedAmount"),
  goalPercent: document.querySelector("#goalPercent"),
  goalText: document.querySelector("#goalText"),
};

function saveTransactions() {
  localStorage.setItem(storageKeys.transactions, JSON.stringify(state.transactions));
}

function saveGoals() {
  localStorage.setItem(storageKeys.goals, JSON.stringify(state.goals));
}

function currentMonthTransactions() {
  const now = new Date();
  return state.transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
}

function sumByType(transactions, type) {
  return transactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function progressPercent(saved, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.min(Math.round((saved / goal) * 100), 100);
}

function renderDashboard() {
  const monthly = currentMonthTransactions();
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

  if (balance > 0) {
    elements.friendlyMessage.textContent = "Υπέροχα! Αυτόν τον μήνα κρατάς θετικό υπόλοιπο.";
  } else if (balance < 0) {
    elements.friendlyMessage.textContent = "Προσοχή: τα έξοδα ξεπερνούν τα έσοδα. Μικρές αλλαγές βοηθούν.";
  } else {
    elements.friendlyMessage.textContent = "Ξεκίνα προσθέτοντας έσοδα και έξοδα για καθαρή εικόνα.";
  }
}

function renderHistory() {
  const filtered = state.filter === "all"
    ? state.transactions
    : state.transactions.filter((transaction) => transaction.type === state.filter);

  if (!filtered.length) {
    elements.transactionList.innerHTML = '<div class="card empty-state">Δεν υπάρχουν συναλλαγές για εμφάνιση.</div>';
    return;
  }

  elements.transactionList.innerHTML = filtered
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((transaction) => {
      const sign = transaction.type === "income" ? "+" : "-";
      const note = transaction.note ? ` • ${transaction.note}` : "";
      return `
        <article class="transaction-item">
          <div>
            <h3>${escapeHtml(transaction.category)}</h3>
            <p>${dateFormatter.format(new Date(`${transaction.date}T00:00:00`))}${escapeHtml(note)}</p>
          </div>
          <div>
            <strong class="amount ${transaction.type}">${sign}${euro.format(transaction.amount)}</strong>
            <button class="delete-button" data-id="${transaction.id}" type="button">Διαγραφή</button>
          </div>
        </article>`;
    })
    .join("");
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
  renderDashboard();
  renderHistory();
  renderGoals();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character]);
}

elements.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const viewName = button.dataset.view;
    elements.views.forEach((view) => view.classList.toggle("active", view.id === viewName));
    elements.navButtons.forEach((navButton) => navButton.classList.toggle("active", navButton === button));
  });
});

elements.transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const transaction = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: form.type.value,
    amount: Number(form.amount.value),
    category: form.category.value.trim(),
    note: form.note.value.trim(),
    date: form.date.value,
  };

  if (!transaction.amount || !transaction.category || !transaction.date) return;
  state.transactions.push(transaction);
  saveTransactions();
  form.reset();
  elements.date.valueAsDate = new Date();
  render();
});

elements.transactionList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");
  if (!button) return;
  state.transactions = state.transactions.filter((transaction) => transaction.id !== button.dataset.id);
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

elements.date.valueAsDate = new Date();
render();
