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
    } else {
        alert('Harap pilih barang dan masukkan jumlah yang benar.');
    }
});

function updateItemInTable(name, price, quantity) {
    const tableBody = document.querySelector('#item-table tbody');
    let row = Array.from(tableBody.rows).find(row => row.cells[0].innerText === name);

    if (row) {
        // Item sudah ada, perbarui jumlah dan total
        const existingQuantity = parseInt(row.cells[2].innerText);
        const newQuantity = existingQuantity + quantity;
        row.cells[2].innerText = newQuantity;
        row.cells[3].innerText = `Rp ${(price * newQuantity).toFixed(2)}`;
    } else {
        // Item belum ada, tambahkan baris baru
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

        row.querySelector('.add-item').addEventListener('click', function () {
            updateItemInTable(name, price, 1);
            updateTotal();
        });

        row.querySelector('.remove-item').addEventListener('click', function () {
            const currentQuantity = parseInt(row.cells[2].innerText);
            if (currentQuantity > 1) {
                updateItemInTable(name, price, -1);
                updateTotal();
            } else if (currentQuantity === 1) {
                if (confirm('Jumlah item 1, apakah Anda yakin ingin menghapus item ini?')) {
                    row.remove();
                    updateTotal();
                }
            }
        });
    }
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll('#item-table tbody tr').forEach(function (row) {
        const totalPerItem = parseFloat(row.cells[3].innerText.replace('Rp ', ''));
        total += totalPerItem;
    });

    document.getElementById('total-amount').innerText = `Rp ${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin membersihkan?')) {
        document.querySelector('#item-table tbody').innerHTML = '';
        updateTotal();
        alert('Berhasil Dibersihkan!');
    }
});
