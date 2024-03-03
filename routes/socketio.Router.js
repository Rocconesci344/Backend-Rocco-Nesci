import express from 'express';

const socketioRouter = (io) => {
    const router = express.Router();

    // Configura las rutas y la lógica para el enrutador de socket.io aquí

    router.get('/', (req, res) => {
        res.send('Socket.IO router');
    });

    // Manejo de la conexión WebSocket
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Escuchando la solicitud de agregar un producto
        socket.on('addProduct', (product) => {
            io.emit('productAdded', product);
        });

        // Escuchando la solicitud de eliminar un producto
        socket.on('deleteProduct', (product) => {
            io.emit('productDeleted', product);
        });

        // Manejar la desconexión del usuario
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return router;
};

export default socketioRouter;