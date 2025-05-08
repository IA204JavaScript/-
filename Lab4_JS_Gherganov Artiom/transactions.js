export const transactions = [];

export function addTransaction(transaction) {
  transactions.push(transaction);
}

export function removeTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
  }
}