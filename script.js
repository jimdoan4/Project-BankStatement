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
