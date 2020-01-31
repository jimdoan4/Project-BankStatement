// Grabbing ID's from html tag
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');

// Parsing data and storing content into empty array
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    // Prevents window from reloading
    e.preventDefault();
    // trim() method removes whitespace from both sides of a string.
    if (text.value.trim() === '' || desc.value.trim() === '' || date.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add an item, date, amount and description');
    } else {
        // Generating ID for each input value
        const transaction = {
            id: generateID(),
            text: text.value,
            desc: desc.value,
            date: date.value,
            amount: +amount.value
        };
        // Pushing/Storing input to array
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
        desc.value = "";
        date.value = "";
    }
}


// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '- $' : '+ $';
    const item = document.createElement('td');
    const description = document.createElement('td');
    const date = document.createElement('td');
    const amnt = document.createElement('td');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text}  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

    date.innerHTML = `
   ${transaction.date} <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

    amnt.innerHTML = `
 ${sign}${Math.abs(
  transaction.amount
)} <button class="delete-btn" onclick="removeTransaction(${
  transaction.id
})">x</button>
`;

    description.innerHTML = `
${transaction.desc} <button class="delete-btn" onclick="removeTransaction(${
 transaction.id
})">x</button>
`;

    list.appendChild(item);
    list.appendChild(description);
    list.appendChild(date);
    list.appendChild(amnt);

}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}