import express from 'express';
import { Server } from 'socket.io';

const socketioRouter = (io) => {
    const router = express.Router();

    router.post('/add-product', (req, res) => {
        const { productName } = req.body;

        io.emit('productAdded', productName);

        res.send('Producto agregado con éxito');
    });

    router.post('/delete-product', (req, res) => {
        const { productId } = req.body;

        io.emit('productDeleted', productId);

        res.send('Producto eliminado con éxito');
    });

    return router;
};

export default socketioRouter;
