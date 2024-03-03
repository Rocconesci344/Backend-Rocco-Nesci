import io from '/socket.io/socket.io.js';

const socket = io();

// Escuchar eventos de productos agregados y actualizar la lista en la vista
socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = product;
    productList.appendChild(listItem);
});

// Manejar el envío del formulario para agregar un producto
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    socket.emit('addProduct', productName);
    document.getElementById('productName').value = '';
});
