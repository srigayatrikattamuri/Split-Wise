
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expensesList = document.getElementById('expenses');
const balancesList = document.getElementById('balances');

let expenses = [];
let peopleBalance = {};

addExpenseBtn.addEventListener('click', () => {
  const payer = document.getElementById('payer').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const participants = document.getElementById('participants').value.trim().split(',').map(p => p.trim());

  if (!payer || !amount || participants.length === 0) {
    alert('Please fill in all fields correctly!');
    return;
  }

  expenses.push({ payer, amount, participants });
  updateExpensesList();
  updateBalances();
  
  
  document.getElementById('payer').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('participants').value = '';
});

function updateExpensesList() {
  expensesList.innerHTML = '';
  
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.textContent = `${expense.payer} paid ₹${expense.amount} for ${expense.participants.join(', ')}`;
    expensesList.appendChild(li);
  });
}

function updateBalances() {
  
  peopleBalance = {};


  expenses.forEach(expense => {
    const splitAmount = expense.amount / (expense.participants.length + 1); 

    
    if (!peopleBalance[expense.payer]) {
      peopleBalance[expense.payer] = 0;
    }
    peopleBalance[expense.payer] += expense.amount - splitAmount;

  
    expense.participants.forEach(participant => {
      if (!peopleBalance[participant]) {
        peopleBalance[participant] = 0;
      }
      peopleBalance[participant] -= splitAmount;
    });
  });

  
  balancesList.innerHTML = '';

  for (const person in peopleBalance) {
    const li = document.createElement('li');
    const balance = peopleBalance[person].toFixed(2);
    li.textContent = `${person}: ${balance > 0 ? 'Owes ₹' + balance : 'Receives ₹' + Math.abs(balance)}`;
    balancesList.appendChild(li);
  }
}
