import io from '/socket.io/socket.io.js';

const socket = io();

// Escuchar eventos de productos agregados y eliminados y actualizar la lista en la vista
socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = product;
    productList.appendChild(listItem);
});

socket.on('productDeleted', (product) => {
    const productList = document.getElementById('productList');
    const items = productList.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        if (item.textContent === product) {
            productList.removeChild(item);
        }
    });
});

// Manejar el envío del formulario para agregar un producto
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    socket.emit('addProduct', productName);
    document.getElementById('productName').value = '';
});

// Manejar el envío del formulario para eliminar un producto
document.getElementById('deleteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productIndex = document.getElementById('productIndex').value;
    socket.emit('deleteProduct', productIndex);
    document.getElementById('productIndex').value = '';
});
