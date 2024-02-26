import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';

export const router = Router();

let ruta = path.join(__dirname, 'data', 'carts.json');

function getCarts() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        return [];
    }
}

function saveCarts(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 5));
}


router.post("/", (req, res) => {
    let carts = getCarts();

    let newCartId = Date.now().toString();

    let newCart = {
        id: newCartId,
        products: req.body.products || []
    };

    carts.push(newCart);

    saveCarts(carts);

    res.status(201).json({ newCart });
});

router.get("/:cid", (req, res) => {
    let carts = getCarts();
    let cartId = req.params.cid;

    let cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ products: cart.products });
});

router.post("/:cid/product/:pid", (req, res) => {
    let carts = getCarts();
    let cartId = req.params.cid;
    let productId = req.params.pid;

    let cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let existingProduct = cart.products.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
        cart.products.push({ id: productId, quantity: 1 });
    }

    saveCarts(carts);

    res.json({ cart });
});

export default router;
