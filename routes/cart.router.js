import { Router } from 'express';
import path from 'path';
import fs from 'fs';

import {fileURLToPath} from 'url';
import { dirname } from 'path';

export const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let ruta = path.join(__dirname, 'data', 'carts.json');

function getCarts() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        // Si el archivo no existe, crea uno vacío y retorna un array vacío
        fs.writeFileSync(ruta, '[]');
        return [];
    }
}

function saveCarts(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 5));
}

// Ruta para crear un nuevo carrito
router.post("/", (req, res) => {
    let carts = getCarts();

    // Generar un ID único para el nuevo carrito
    let newCartId = Date.now().toString();

    // Crear el nuevo carrito con los productos proporcionados en el cuerpo de la solicitud
    let newCart = {
        id: newCartId,
        products: req.body.products || []
    };

    // Agregar el nuevo carrito a la lista de carritos
    carts.push(newCart);

    // Guardar la lista actualizada de carritos en el archivo
    saveCarts(carts);

    // Devolver la respuesta con el nuevo carrito creado
    res.status(201).json({ newCart });
});

// Ruta para obtener los productos de un carrito específico
router.get("/:cid", (req, res) => {
    let carts = getCarts();
    let cartId = req.params.cid;

    // Buscar el carrito con el ID proporcionado
    let cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Devolver los productos del carrito
    res.json({ products: cart.products });
});

// Ruta para agregar un producto al carrito especificado
router.post("/:cid/product/:pid", (req, res) => {
    let carts = getCarts();
    let cartId = req.params.cid;
    let productId = req.params.pid;

    // Buscar el carrito con el ID proporcionado
    let cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Verificar si el producto ya existe en el carrito
    let existingProduct = cart.products.find(p => p.id === productId);

    if (existingProduct) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
        // Si el producto no existe en el carrito, agregarlo con una cantidad inicial de 1
        cart.products.push({ id: productId, quantity: 1 });
    }

    // Guardar la lista actualizada de carritos en el archivo
    saveCarts(carts);

    // Devolver la respuesta con el carrito actualizado
    res.json({ cart });
});

export default router;
