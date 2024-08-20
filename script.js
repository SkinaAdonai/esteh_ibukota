const itemPrices = {
    'Original Tea': 3000,
    'Lychee Tea': 5000,
    'Lemon Tea': 5000,
    'Yakult Tea': 7000,
    'Moca Tea': 5000,
    'Milo Tea': 7000,
    'Original Milktea': 7000,
    'Chocolate Milktea': 8000,
    'Beng Beng Milktea': 8000,
    'Silverqueen Milktea': 8000,
    'Choco Oreo Milktea': 8000,
    'Choco Cheese Milktea': 8000,
    'Greentea Milktea': 8000,
    'Strawberry Milktea': 8000,
    'Redvelvet Milktea': 8000,
    'Tiramisu Milktea': 8000,
    'Thaitea Milktea': 8000,
    'Taro Milktea': 8000,
    'Mango Milky': 12000,
    'Grape Milky': 12000,
    'Blue Vanilla Milky': 12000,
    'Choco Banana Milky': 12000
};

document.getElementById('add-item').addEventListener('click', function () {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = itemPrices[itemName];
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemPrice !== undefined && itemQuantity > 0) {
        updateItemInTable(itemName, itemPrice, itemQuantity);
        updateTotal();
        saveDataToLocalStorage();
    } else {
        alert('Harap pilih barang dan masukkan jumlah yang benar.');
    }
});

function updateItemInTable(name, price, quantity) {
    const tableBody = document.querySelector('#item-table tbody');
    let row = Array.from(tableBody.rows).find(row => row.cells[0].innerText === name);

    if (row) {
        const existingQuantity = parseInt(row.cells[2].innerText);
        const newQuantity = existingQuantity + quantity;
        row.cells[2].innerText = newQuantity;
        row.cells[3].innerText = `Rp ${(price * newQuantity).toFixed(2)}`;
    } else {
        row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>Rp ${price.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>Rp ${(price * quantity).toFixed(2)}</td>
            <td>
                <button class="remove-item">-</button>
                <button class="add-item">+</button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    row.querySelector('.remove-item').addEventListener('click', function () {
        const currentQuantity = parseInt(row.cells[2].innerText);
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            row.cells[2].innerText = newQuantity;
            row.cells[3].innerText = `Rp ${(price * newQuantity).toFixed(2)}`;
        } else {
            row.remove();
        }
        updateTotal();
        saveDataToLocalStorage();
    });

    row.querySelector('.add-item').addEventListener('click', function () {
        const currentQuantity = parseInt(row.cells[2].innerText);
        const newQuantity = currentQuantity + 1;
        row.cells[2].innerText = newQuantity;
        row.cells[3].innerText = `Rp ${(price * newQuantity).toFixed(2)}`;
        updateTotal();
        saveDataToLocalStorage();
    });
}

document.getElementById('add-expense').addEventListener('click', function () {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        updateExpenseInTable(description, amount);
        updateTotal();
        saveDataToLocalStorage();
    } else {
        alert('Harap masukkan deskripsi dan jumlah pengeluaran yang benar.');
    }
});

function updateExpenseInTable(description, amount) {
    const tableBody = document.querySelector('#expense-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>Rp ${amount.toFixed(2)}</td>
        <td><button class="remove-expense">Hapus</button></td>
    `;
    tableBody.appendChild(row);

    row.querySelector('.remove-expense').addEventListener('click', function () {
        row.remove();
        updateTotal();
        saveDataToLocalStorage();
    });
}

document.getElementById('checkout').addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin membersihkan?')) {
        document.querySelector('#item-table tbody').innerHTML = '';
        document.querySelector('#expense-table tbody').innerHTML = '';
        localStorage.removeItem('items');
        localStorage.removeItem('expenses');
        updateTotal(); 
        alert('Berhasil Dibersihkan!');
    }
});

function updateTotal() {
    let totalIncome = 0;
    let totalCups = 0; // Initialize total cups
    document.querySelectorAll('#item-table tbody tr').forEach(function (row) {
        const totalPerItem = parseFloat(row.cells[3].innerText.replace('Rp ', ''));
        totalIncome += totalPerItem;

        const quantity = parseInt(row.cells[2].innerText);
        totalCups += quantity; // Add the quantity to the total cups
    });

    let totalExpense = 0;
    document.querySelectorAll('#expense-table tbody tr').forEach(function (row) {
        const expenseAmount = parseFloat(row.cells[1].innerText.replace('Rp ', ''));
        totalExpense += expenseAmount;
    });

    const netIncome = totalIncome - totalExpense;
    document.getElementById('total-amount').innerText = `Rp ${netIncome.toFixed(2)}`;
    document.getElementById('total-expense').innerText = `Rp ${totalExpense.toFixed(2)}`;
    document.getElementById('total-cups').innerText = totalCups; // Update total cups
}

function saveDataToLocalStorage() {
    const items = [];
    document.querySelectorAll('#item-table tbody tr').forEach(function(row) {
        const item = {
            name: row.cells[0].innerText,
            price: parseFloat(row.cells[1].innerText.replace('Rp ', '')),
            quantity: parseInt(row.cells[2].innerText),
            total: parseFloat(row.cells[3].innerText.replace('Rp ', ''))
        };
        items.push(item);
    });

    const expenses = [];
    document.querySelectorAll('#expense-table tbody tr').forEach(function(row) {
        const expense = {
            description: row.cells[0].innerText,
            amount: parseFloat(row.cells[1].innerText.replace('Rp ', ''))
        };
        expenses.push(expense);
    });

    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadDataFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    items.forEach(function(item) {
        updateItemInTable(item.name, item.price, item.quantity);
    });

    expenses.forEach(function(expense) {
        updateExpenseInTable(expense.description, expense.amount);
    });

    updateTotal();
}

window.onload = function() {
    loadDataFromLocalStorage();
};
