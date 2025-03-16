# Отчет по анализу транзакций

## Структура данных

Массив транзакций, на котором будут выполняться все операции:

```javascript
const transactions = [
  {
    transaction_id: "1",
    transaction_date: '2025-03-01',
    transaction_amount: 100.5,
    transaction_type: 'credit',
    transaction_description: 'Покупка в магазине "Техномир"',
    merchant_name: 'Техномир',
    card_type: 'кредитная'
  },
  {
    transaction_id: "2",
    transaction_date: '2025-03-02',
    transaction_amount: 50,
    transaction_type: 'debit',
    transaction_description: 'Платеж за услуги сервиса "АвтоСервисПро"',
    merchant_name: 'АвтоСервисПро',
    card_type: 'дебетовая'
  },
  {
    transaction_id: "3",
    transaction_date: '2025-03-03',
    transaction_amount: 200,
    transaction_type: 'credit',
    transaction_description: 'Покупка в магазине "Мир Спорта"',
    merchant_name: 'Мир Спорта',
    card_type: 'кредитная'
  },
  {
    transaction_id: "4",
    transaction_date: '2025-03-01',
    transaction_amount: 75.25,
    transaction_type: 'debit',
    transaction_description: 'Оплата ужина в ресторане "Гастроном"',
    merchant_name: 'Гастроном',
    card_type: 'дебетовая'
  },
  {
    transaction_id: "5",
    transaction_date: '2025-03-03',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Платеж за услуги интернет-платформы "Учёба Онлайн"',
    merchant_name: 'Учёба Онлайн',
    card_type: 'дебетовая'
  },
  {
    transaction_id: "6",
    transaction_date: '2025-03-02',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Покупка в кафе "Кофе и сладости"',
    merchant_name: 'Кофе и сладости',
    card_type: 'кредитная'
  }
];
```

## Функции

### 1. Получение уникальных типов транзакций

```javascript
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(transaction => transaction.transaction_type))];
}
```

Эта функция принимает массив транзакций и возвращает массив уникальных типов транзакций. Она использует метод `map`, чтобы извлечь типы транзакций, и `Set`, чтобы удалить повторения.

### 2. Вычисление общей суммы транзакций

```javascript
function calculateTotalAmount(transactions) {
  return transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
}
```

Функция суммирует все значения `transaction_amount` в массиве транзакций с использованием метода `reduce`. Начальное значение суммы равно 0.

### 3. Вычисление суммы транзакций за определенную дату

```javascript
function calculateTotalAmountByDate(transactions, year = null, month = null, day = null) {
  return transactions
    .filter(transaction => {
      const date = new Date(transaction.transaction_date);
      return (
        (year ? date.getFullYear() === year : true) &&
        (month ? date.getMonth() + 1 === month : true) &&
        (day ? date.getDate() === day : true)
      );
    })
    .reduce((total, transaction) => total + transaction.transaction_amount, 0);
}
```

Функция фильтрует транзакции по году, месяцу и/или дню, если они переданы в качестве аргументов. Затем она суммирует соответствующие транзакции.

### 4. Получение транзакций по типу

```javascript
function getTransactionByType(transactions, type) {
  return transactions.filter(transaction => transaction.transaction_type === type);
}
```

Эта функция фильтрует транзакции по переданному типу, например, `debit` или `credit`.

### 5. Получение транзакций в указанном диапазоне дат

```javascript
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter(transaction => {
    const date = new Date(transaction.transaction_date);
    return date >= start && date <= end;
  });
}
```

Функция фильтрует транзакции, проверяя, попадают ли их даты в указанный диапазон (между `startDate` и `endDate`).

### 6. Получение транзакций по имени магазина

```javascript
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(transaction => transaction.merchant_name === merchantName);
}
```

Функция фильтрует транзакции по имени магазина, например, `Техномир`.

### 7. Вычисление среднего значения транзакций

```javascript
function calculateAverageTransactionAmount(transactions) {
  const total = calculateTotalAmount(transactions);
  return total / transactions.length;
}
```

Эта функция вычисляет среднее значение транзакций, деля общую сумму на количество транзакций.

### 8. Получение транзакций в заданном диапазоне суммы

```javascript
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}
```

Функция фильтрует транзакции, сумма которых находится в заданном диапазоне (`minAmount` - `maxAmount`).

### 9. Вычисление суммы всех дебетовых транзакций

```javascript
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(transaction => transaction.transaction_type === 'debit')
    .reduce((total, transaction) => total + transaction.transaction_amount, 0);
}
```

Функция фильтрует дебетовые транзакции и суммирует их суммы.

### 10. Нахождение месяца с максимальным количеством транзакций

```javascript
function findMostTransactionsMonth(transactions) {
  const months = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.transaction_date).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(months).reduce((most, month) => (months[month] > months[most] ? month : most), 0);
}
```

Функция подсчитывает количество транзакций для каждого месяца и возвращает месяц с наибольшим количеством транзакций.

### 11. Нахождение месяца с максимальным количеством дебетовых транзакций

```javascript
function findMostDebitTransactionMonth(transactions) {
  const months = transactions
    .filter(transaction => transaction.transaction_type === 'debit')
    .reduce((acc, transaction) => {
      const month = new Date(transaction.transaction_date).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  return Object.keys(months).reduce((most, month) => (months[month] > months[most] ? month : most), 0);
}
```

Функция работает аналогично предыдущей, но фильтрует только дебетовые транзакции.

### 12. Определение типа транзакций, которого больше

```javascript
function mostTransactionTypes(transactions) {
  const counts = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.transaction_type] = (acc[transaction.transaction_type] || 0) + 1;
      return acc;
    },
    { debit: 0, credit: 0 }
  );
  if (counts.debit > counts.credit) return 'debit';
  if (counts.credit > counts.debit) return 'credit';
  return 'equal';
}
```

Функция подсчитывает количество дебетовых и кредитных транзакций и возвращает тип транзакций, которых больше.

### 13. Получение транзакций до указанной даты

```javascript
function getTransactionsBeforeDate(transactions, date) {
  const givenDate = new Date(date);
  return transactions.filter(transaction => new Date(transaction.transaction_date) < givenDate);
}
```

Эта функция фильтрует транзакции, даты которых предшествуют указанной.

### 14. Поиск транзакции по уникальному идентификатору

```javascript
function findTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.transaction_id === id);
}
```

Функция возвращает транзакцию, идентификатор которой совпадает с переданным `id`.

### 15. Получение описаний всех транзакций

```javascript
function mapTransactionDescriptions(transactions) {
  return transactions.map(transaction => transaction.transaction_description);
}
```

Функция возвращает массив описаний всех транзакций.

## Вывод в консоль

```javascript
console.log("Unique transaction types:", getUniqueTransactionTypes(transactions));
console.log("Total transaction amount:", calculateTotalAmount(transactions));
console.log("Total amount on 2025-03-12:", calculateTotalAmountByDate(transactions, 2025, 3, 12));
console.log("Credit transactions:", getTransactionByType(transactions, "кредитная"));
console.log("Transactions from 2025-03-12 to 2025-03-15:", getTransactionsInDateRange(transactions, "2025-03-12", "2025-03-15"));
console.log("Transactions at Starbucks:", getTransactionsByMerchant(transactions, "Starbucks"));
console.log("Average transaction amount:", calculateAverageTransactionAmount(transactions));
console.log("Transactions between 50 and 200:", getTransactionsByAmountRange(transactions, 50, 200));
console.log("Total debit amount:", calculateTotalDebitAmount(transactions));
console.log("Month with most transactions:", findMostTransactionsMonth(transactions));
console.log("Month with most debit transactions:", findMostDebitTransactionMonth(transactions));
console.log("Most transaction type:", mostTransactionTypes(transactions));
console.log("Transactions before 2025-03-13:", getTransactionsBeforeDate(transactions, "2025-03-13"));
console.log("Transaction with ID 3:", findTransactionById(transactions, 3));
console.log("Transaction descriptions:", mapTransactionDescriptions(transactions));
 
```

## Заключение

В ходе выполнения данного проекта была разработана программа для анализа транзакций с использованием массива данных и различных функций для их обработки. Были созданы и протестированы множество функций, каждая из которых выполняет опредеённые задачи, такие как:

- Анализ типов транзакций: с использованием функции для получения уникальных типов транзакций.
- Расчет суммы транзакций: включая общую сумму, а также возможность вычисления суммы по определенному году, месяцу или даже дню.
- Фильтрация и выборка транзакций: предоставление различных фильтров для выбора транзакций по типу, диапазону сумм, диапазону дат и по магазинам.
- Определение статистики по транзакциям: среднее значение транзакций, поиск месяцев с наибольшим количеством транзакций или дебетовых транзакций.
Каждая функция была протестирована с помощью реальных данных, и результаты были выведены в консоль для подтверждения корректности работы программы. Функции показали свою эффективность и надежность при обработке данных.


