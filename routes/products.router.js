import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';

export const router = Router();

let ruta = path.join(__dirname, 'data', 'exported_products.json');

function getProducts() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        return [];
    }
}

function saveProducts(products) {
    fs.writeFileSync(ruta, JSON.stringify(products, null, 5));
}

router.get("/", (req, res) => {
    let products = getProducts();

    let { limit, skip } = req.query;

    let resultado = products;
    if (skip && skip > 0) {
        resultado = resultado.slice(skip);
    }

    if (limit && limit > 0) {
        resultado = resultado.slice(0, limit);
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ resultado });
});

router.get("/:pid", (req, res) => {
    let pid = Number(req.params.pid); // Cambio de id a pid
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let product = products.find(u => u.id === pid); // Cambio de id a pid
    if (!product) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` }); // Cambio de id a pid
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ product: product });
});

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.thumbnail || !req.body.code || !req.body.stock) {
        return res.status(400).json({
            error: "Complete el campo faltante"
        });
    }

    console.log(req.body);

    let products = getProducts();

    let id = 1;
    if (products.length > 0) {
        id = Math.max(...products.map(d => d.id)) + 1;
    }

    let newProduct = {
        id,
        ...req.body
    };

    products.push(newProduct);

    saveProducts(products);

    res.status(201).json({ newProduct });
});

router.put("/:pid", (req, res) => {
    let pid = Number(req.params.pid); // Cambio de id a pid
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let productIndex = products.findIndex(u => u.id === pid); // Cambio de id a pid
    if (productIndex === -1) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` }); // Cambio de id a pid
    }

    products[productIndex] = {
        ...products[productIndex],
        ...req.body,
        id: pid // Cambio de id a pid
    };

    saveProducts(products);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ productoModificado: products[productIndex] });
});

router.delete("/:pid", (req, res) => {
    let pid = Number(req.params.pid); // Cambio de id a pid
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let indexProduct = products.findIndex(u => u.id === pid); // Cambio de id a pid
    if (indexProduct === -1) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` }); // Cambio de id a pid
    }

    let productoEliminado = products[indexProduct];
    products.splice(indexProduct, 1);

    saveProducts(products);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ usuarioEliminado: productoEliminado });
});

export default router;
