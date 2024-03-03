import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/exported_products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON de productos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const products = JSON.parse(data);

        res.render('home', { products });
    });
});

router.get('/realtimeproducts', (req, res) => {
    const filePath = path.join(__dirname, '../data/exported_products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON de productos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        const products = JSON.parse(data);

        res.render('realTimeProducts', { products });
    });
});

export { router };
