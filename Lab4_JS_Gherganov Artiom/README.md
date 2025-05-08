### Index.html

Структура элементов
1. Заголовок
html
<h1>Учёт личных финансов</h1>
Заголовок страницы, который отображается в верхней части страницы и сообщает пользователю, что это приложение для учета личных финансов.

2. Форма для добавления транзакции
```html

<form id="transaction-form">
  <input type="text" id="description" placeholder="Описание" required />
  <input type="number" id="amount" placeholder="Сумма" required />
  <select id="category">
    <option value="Доход">Доход</option>
    <option value="Расход">Расход</option>
  </select>
  <button type="submit">Добавить</button>
</form>
```

Форма содержит:

- Поле для ввода описания транзакции.

- Поле для ввода суммы.

- Выпадающий список для выбора категории (Доход или Расход).

- Кнопка для добавления транзакции.

3. Таблица для отображения транзакций

```html
<h2>Список транзакций</h2>
<table id="transaction-table">
  <thead>
    <tr>
      <th>Дата и Время</th>
      <th>Категория</th>
      <th>Описание</th>
      <th>Действие</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```
Таблица, в которой будет отображаться список всех транзакций:

- Столбцы с датой и временем, категорией, описанием и кнопкой для удаления/ 
- редактирования.

- Тело таблицы (<tbody>) будет динамически заполняться данными.

4. Отображение общей суммы
```html
<h3>Итого: <span id="total-amount">0</span> MDL</h3>
Блок, в котором отображается общая сумма всех транзакций.
```
5. Полное описание транзакции

<div id="full-description"></div>
Блок для отображения полного описания транзакции при клике на соответствующую строку таблицы.

### Index.js
```javascript
const transaction = {
  id: generateId(),
  date: new Date(),
  amount: 100.0,
  category: 'Food',
  description: 'Lunch at restaurant'
};
``` 
`id` — уникальный идентификатор транзакции, генерируемый функцией generateId().

`date` — дата транзакции.

`amount` — сумма транзакции.

`category` — категория транзакции (например, еда, транспорт и т. д.).

`description` — описание транзакции.

Модули
1. Генерация идентификатора
```javascript

import { generateId } from './utils.js';
Функция generateId() используется для создания уникальных идентификаторов для каждой транзакции.
```
2. Добавление транзакции
```javascript

import { addTransaction, transactions } from './transactions.js';
```
Модуль `transactions.js` содержит:

- Функцию `addTransaction(transaction)`, которая добавляет новую транзакцию в список.

- Массив `transactions`, который хранит все добавленные транзакции.

3. Отображение транзакций и расчет сумм
```javascript

import { renderTransaction, calculateTotal, handleTableClick } from './ui.js';
```
Модуль `ui.js` отвечает за:

Функцию `renderTransaction(transaction)`, которая отображает информацию о транзакции в таблице.

Функцию `calculateTotal()`, которая рассчитывает и отображает общую сумму транзакций.

Функцию `handleTableClick()`, которая обрабатывает клики по таблице для удаления или редактирования транзакций.

Описание работы скрипта
1. Обработчик формы
```javascript

const form = document.getElementById('transaction-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Логика добавления транзакции
});

```
При отправке формы:

- Проверяются значения полей (описание и сумма).

- Если данные корректны, создается объект транзакции, который добавляется в массив транзакций с помощью `addTransaction().`

- Отображается транзакция через `renderTransaction().`

- Перерасчитывается общая сумма транзакций через `calculateTotal().`

2. Обработчик кликов по таблице
```javascript

const table = document.getElementById('transaction-table');
table.addEventListener('click', handleTableClick);
```
При клике по таблице вызывается функция `handleTableClick()`, которая позволяет редактировать или удалять транзакции.

### Transaction.js

Массив transactions используется для хранения всех добавленных транзакций.

```javascript

export const transactions = [];
```
Модули
1. Добавление транзакции
```javascript

export function addTransaction(transaction) {
  transactions.push(transaction);
}
```
Функция `addTransaction(transaction)` добавляет новую транзакцию в массив transactions.

2. Удаление транзакции
```javascript

export function removeTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
  }
}
```
Функция `removeTransaction(id)` ищет транзакцию по её идентификатору (id) и удаляет её из массива transactions, если она найдена.

### UI.js

Структура данных
Для отображения транзакций используется таблица, данные для которой берутся из массива transactions. Также используются вспомогательные элементы для отображения суммы и полного описания транзакций.

```javascript

const tableBody = document.querySelector('#transaction-table tbody');
const totalAmount = document.getElementById('total-amount');
const fullDescription = document.getElementById('full-description');
```
Модули
1. Отображение транзакции
```javascript

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
```
Функция `renderTransaction(transaction)` создает строку таблицы для отображения информации о транзакции:

- В строке отображаются дата, категория, короткое описание и кнопка для удаления.

- Если транзакция положительная (доход), строка получает класс income, если отрицательная (расход) — класс` expense.`

- Строка добавляется в таблицу через `tableBody.appendChild(row).`

2. Очистка таблицы
```javascript

export function clearTable() {
  tableBody.innerHTML = '';
}
```
Функция clearTable() очищает таблицу, удаляя все строки.

3. Расчет общей суммы
```javascript

export function calculateTotal() {
  const sum = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  totalAmount.textContent = sum.toFixed(2);
}
```
Функция `calculateTotal()` рассчитывает общую сумму транзакций:

- Все транзакции проходят через метод reduce(), который суммирует их суммы.

- Результат отображается в элементе totalAmount.

4. Получение короткого описания
```javascript

function getShortDescription(desc) {
  return desc.split(' ').slice(0, 4).join(' ') + (desc.split(' ').length > 4 ? '...' : '');
}
```
Функция `getShortDescription(desc)` возвращает первые четыре слова из описания транзакции, добавляя троеточие, если описание длиннее.

5. Обработчик кликов по таблице
```javascript

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
```
Функция `handleTableClick(e)` обрабатывает клики по таблице:

Если нажата кнопка удаления, транзакция удаляется через `removeTransaction`(id) и строка удаляется из таблицы.

Если кликнут на строку, отображается полное описание транзакции в элементе `fullDescriptio`

### Utils.js
```js
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
  return new Date(date).toLocaleString();
}
```
Модули
1. Генерация идентификатора
javascript
```js
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
```
Функция `generateId()` генерирует уникальный идентификатор:

- Используется метод `Math.random(),` который генерирует случайное число.

- Это число преобразуется в строку в системе счисления с основанием 36 с помощью `toString(36).`

- Полученная строка обрезается методом `substr(2, 9)`, чтобы извлечь случайную часть.

- Результат дополняется символом `_` в начале, чтобы создать уникальный идентификатор.

2. Форматирование даты
```javascript

export function formatDate(date) {
  return new Date(date).toLocaleString();
}
```
- Функция `formatDate(date)` форматирует дату в строку:

- Метод new Date(date) создает объект даты.

- Метод `toLocaleString()` форматирует дату в строку в соответствии с локалью браузера.

### Заключение
Проект демонстрирует создание веб-приложения с использованием модульной структуры JavaScript, где логика разделена по функциям и ответственностям. Такой подход способствует лучшей читаемости, повторному использованию кода и упрощает сопровождение. В приложении реализованы ключевые элементы: работа с пользовательским вводом, динамическое обновление DOM, обработка событий и базовая работа с данными в памяти.
Этот проект может служить основой для дальнейшего развития и изучения клиентской разработки, включая такие темы, как хранение данных, валидация форм, и взаимодействие с сервером.