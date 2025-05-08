import { generateId } from './utils.js';
import { addTransaction, transactions } from './transactions.js';
import { renderTransaction, calculateTotal, handleTableClick } from './ui.js';


const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const table = document.getElementById('transaction-table');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Форма отправлена');

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!description || isNaN(amount)) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description
  };

  addTransaction(transaction);
  renderTransaction(transaction);
  calculateTotal();

  form.reset();
});

table.addEventListener('click', handleTableClick);