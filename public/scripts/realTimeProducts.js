import io from '/socket.io/socket.io.js';

const socket = io();

socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = `Title: ${product.title}, Description: ${product.description}, Price: ${product.price}`;
    productList.appendChild(listItem);
});

socket.on('productDeleted', (productId) => {
    const productList = document.getElementById('productList');
    const items = productList.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemId = item.dataset.productId;
        if (itemId === productId) {
            productList.removeChild(item);
        }
    });
});


document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    socket.emit('addProduct', productName);
    document.getElementById('productName').value = '';
});

document.getElementById('deleteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productIndex = document.getElementById('productIndex').value;
    socket.emit('deleteProduct', productIndex);
    document.getElementById('productIndex').value = '';
});
