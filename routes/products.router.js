import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';
import Product from '../models/productModel.js';

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

// router.get("/", (req, res) => {
//     let products = getProducts();

//     let { limit, skip } = req.query;

//     let resultado = products;
//     if (skip && skip > 0) {
//         resultado = resultado.slice(skip);
//     }

//     if (limit && limit > 0) {
//         resultado = resultado.slice(0, limit);
//     }

//     res.setHeader('Content-Type', 'application/json');
//     return res.status(200).json({ resultado });
// });




router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);

        let filter = {};
        if (query) {
            filter = { category: query }; 
        }

        let sortOption = {};
        if (sort === 'asc' || sort === 'desc') {
            sortOption = { price: sort === 'asc' ? 1 : -1 }; 
        }

        const count = await Product.countDocuments(filter);
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        const hasNextPage = nextPage !== null;
        const hasPrevPage = prevPage !== null;
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'ERROR INTERNO' });
    }
});







router.get("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let product = products.find(u => u.id === pid);
    if (!product) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ product: product });
});

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.thumbnail || !req.body.code || !req.body.stock || !req.body.status) {
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
    let pid = Number(req.params.pid);
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let productIndex = products.findIndex(u => u.id === pid);
    if (productIndex === -1) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...req.body,
        id: pid
    };

    saveProducts(products);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ productoModificado: products[productIndex] });
});

router.delete("/:pid", (req, res) => {
    let pid = Number(req.params.pid)
    console.log(req.body);
    if (isNaN(pid)) {
        return res.status(400).json({ error: "id debe ser numérico" });
    }

    let products = getProducts();
    let indexProduct = products.findIndex(u => u.id === pid);
    if (indexProduct === -1) {
        return res.status(400).json({ error: `No existen productos con id ${pid}` });
    }

    let productoEliminado = products[indexProduct];
    products.splice(indexProduct, 1);

    saveProducts(products);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ productoEliminado: productoEliminado });
});



export default router;
