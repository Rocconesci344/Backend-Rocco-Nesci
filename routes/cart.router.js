const Router = require('express').Router;
const cartRouter=Router()
const CartController = require('../controller/cart.controller');




cartRouter.get('/', CartController.getAllCarts);

cartRouter.post('/', CartController.createCart);


cartRouter.get('/:id', CartController.getCartById);

cartRouter.post('/:id/products', CartController.addProductToCart);

cartRouter.delete('/:cartId/products/:productId', CartController.removeProductFromCart);

cartRouter.put('/:cartId/products/:productId', CartController.updateProductQuantity);

cartRouter.delete('/:cartId', CartController.removeAllProductsFromCart);



module.exports = cartRouter;
