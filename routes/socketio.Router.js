import express from 'express';

const socketioRouter = (io) => {
    const router = express.Router();


    router.get('/', (req, res) => {
        res.send('Socket.IO router');
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('addProduct', (product) => {
            io.emit('productAdded', product);
        });

        socket.on('deleteProduct', (product) => {
            io.emit('productDeleted', product);
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return router;
};

export default socketioRouter;