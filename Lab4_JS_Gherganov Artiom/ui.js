import { formatDate } from './utils.js';
import { transactions, removeTransaction } from './transactions.js';

const tableBody = document.querySelector('#transaction-table tbody');
const totalAmount = document.getElementById('total-amount');
const fullDescription = document.getElementById('full-description');

export function renderTransaction(transaction) {
  const row = document.createElement('tr');
  row.className = transaction.amount >= 0 ? 'income' : 'expense';
  row.dataset.id = transaction.id;

  row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${getShortDescription(transaction.description)}</td>
    <td><button data-id="${transaction.id}" class="delete-btn">Удалить</button></td>
  `;

  tableBody.appendChild(row);
}

export function clearTable() {
  tableBody.innerHTML = '';
}

export function calculateTotal() {
  const sum = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  totalAmount.textContent = sum.toFixed(2);
}

function getShortDescription(desc) {
  return desc.split(' ').slice(0, 4).join(' ') + (desc.split(' ').length > 4 ? '...' : '');
}

export function handleTableClick(e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    removeTransaction(id);
    e.target.closest('tr').remove();
    calculateTotal();
    fullDescription.textContent = '';
  } else if (e.target.closest('tr')) {
    const id = e.target.closest('tr').dataset.id;
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      fullDescription.textContent = 'Полное описание: ' + transaction.description;
    }
  }
}