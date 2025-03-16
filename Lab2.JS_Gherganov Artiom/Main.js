const transactions = [
    {
      transaction_id: "1", // Уникальный идентификатор транзакции
      transaction_date: '2025-03-01', // Дата транзакции
      transaction_amount: 100.5, // Сумма транзакции
      transaction_type: 'credit', // Тип транзакции (debit или credit)
      transaction_description: 'Покупка в магазине "Техномир"', // Описание транзакции
      merchant_name: 'Техномир', // Название магазина или сервиса
      card_type: 'кредитная' // Тип карты (кредитная или дебетовая)
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
  
 
  /**
   * Возвращает уникальные типы транзакций (debit или credit).
   * @param {Array} transactions - Массив транзакций
   * @returns {Array} Массив уникальных типов транзакций
   */
  function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(transaction => transaction.transaction_type))];
  }
  
  /**
   * Вычисляет сумму всех транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {number} Сумма всех транзакций
   */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Вычисляет сумму транзакций за указанный год, месяц и день.
   * Параметры год, месяц и день необязательны.
   * @param {Array} transactions - Массив транзакций
   * @param {number} [year=null] - Год
   * @param {number} [month=null] - Месяц
   * @param {number} [day=null] - День
   * @returns {number} Сумма транзакций за указанный период
   */
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
  
  /**
   * Возвращает транзакции указанного типа (debit или credit).
   * @param {Array} transactions - Массив транзакций
   * @param {string} type - Тип транзакции (debit или credit)
   * @returns {Array} Массив транзакций указанного типа
   */
  function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
  }
  
  /**
   * Возвращает транзакции в указанном диапазоне дат.
   * @param {Array} transactions - Массив транзакций
   * @param {string} startDate - Начальная дата (формат YYYY-MM-DD)
   * @param {string} endDate - Конечная дата (формат YYYY-MM-DD)
   * @returns {Array} Массив транзакций в указанном диапазоне
   */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(transaction => {
      const date = new Date(transaction.transaction_date);
      return date >= start && date <= end;
    });
  }
  
  /**
   * Возвращает транзакции с указанным merchantName.
   * @param {Array} transactions - Массив транзакций
   * @param {string} merchantName - Название магазина или сервиса
   * @returns {Array} Массив транзакций с указанным merchantName
   */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
  }
  
  /**
   * Возвращает среднее значение всех транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {number} Среднее значение транзакций
   */
  function calculateAverageTransactionAmount(transactions) {
    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
  }
  
  /**
   * Возвращает транзакции с суммой в диапазоне от minAmount до maxAmount.
   * @param {Array} transactions - Массив транзакций
   * @param {number} minAmount - Минимальная сумма
   * @param {number} maxAmount - Максимальная сумма
   * @returns {Array} Массив транзакций в указанном диапазоне суммы
   */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
  }
  
  /**
   * Вычисляет общую сумму дебетовых транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {number} Сумма дебетовых транзакций
   */
  function calculateTotalDebitAmount(transactions) {
    return transactions
      .filter(transaction => transaction.transaction_type === 'debit')
      .reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Возвращает месяц, в котором было больше всего транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {number} Месяц с наибольшим количеством транзакций
   */
  function findMostTransactionsMonth(transactions) {
    const months = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.transaction_date).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(months).reduce((most, month) => (months[month] > months[most] ? month : most), 0);
  }
  
  /**
   * Возвращает месяц, в котором было больше дебетовых транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {number} Месяц с наибольшим количеством дебетовых транзакций
   */
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
  
  /**
   * Возвращает тип транзакций, которых больше.
   * @param {Array} transactions - Массив транзакций
   * @returns {string} Тип транзакций с наибольшим количеством
   */
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
  
  /**
   * Возвращает транзакции, совершенные до указанной даты.
   * @param {Array} transactions - Массив транзакций
   * @param {string} date - Дата (формат YYYY-MM-DD)
   * @returns {Array} Массив транзакций до указанной даты
   */
  function getTransactionsBeforeDate(transactions, date) {
    const givenDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < givenDate);
  }
  
  /**
   * Возвращает транзакцию по уникальному идентификатору.
   * @param {Array} transactions - Массив транзакций
   * @param {string} id - Уникальный идентификатор транзакции
   * @returns {Object} Транзакция с указанным идентификатором
   */
  function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id);
  }
  
  /**
   * Возвращает массив с описаниями транзакций.
   * @param {Array} transactions - Массив транзакций
   * @returns {Array} Массив описаний транзакций
   */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
  }
  

  console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions)); 
  console.log("Сумма всех транзакций:", calculateTotalAmount(transactions));
  console.log("Сумма транзакций за 1 марта 2025 года:", calculateTotalAmountByDate(transactions, 2025, 3, 1)); 
  console.log("Дебетовые транзакции:", getTransactionByType(transactions, 'debit')); 
  console.log("Транзакции с 1 по 2 марта 2025 года:", getTransactionsInDateRange(transactions, '2025-03-01', '2025-03-02')); 
  console.log("Транзакции с Магазином 'Техномир':", getTransactionsByMerchant(transactions, 'Техномир')); 
  console.log("Среднее значение транзакций:", calculateAverageTransactionAmount(transactions)); 
  console.log("Транзакции с суммой от 50 до 100:", getTransactionsByAmountRange(transactions, 50, 100)); 
  console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
  console.log("Месяц с максимальными транзакциями:", findMostTransactionsMonth(transactions)); 
  console.log("Месяц с максимальными дебетовыми транзакциями:", findMostDebitTransactionMonth(transactions)); 
  console.log("Тип транзакций, которых больше:", mostTransactionTypes(transactions)); 
  