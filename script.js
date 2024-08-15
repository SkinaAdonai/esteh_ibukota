// Daftar harga barang tetap
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
    const itemPrice = itemPrices[itemName]; // Ambil harga dari daftar
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemPrice !== undefined && itemQuantity > 0) {
        addItemToTable(itemName, itemPrice, itemQuantity);
        updateTotal();
    } else {
        alert('Harap pilih barang dan masukkan jumlah yang benar.');
    }
});

function addItemToTable(name, price, quantity) {
    const tableBody = document.querySelector('#item-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>Rp ${price.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>Rp ${(price * quantity).toFixed(2)}</td>
        <td><button class="remove-item">Hapus</button></td>
    `;

    tableBody.appendChild(row);

    row.querySelector('.remove-item').addEventListener('click', function () {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            row.remove();
            updateTotal();
        }
    });
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