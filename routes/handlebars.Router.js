import express from 'express';
const router = express.Router();

// Lista de productos (simulada)
import products from '../data/exported_products.json' assert { type: "json" };


// Ruta para la vista home
router.get('/', (req, res) => {
    res.render('home', { products });
});

// Ruta para la vista realTimeProducts
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

export { router };
