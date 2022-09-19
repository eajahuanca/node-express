const express = require("express");
const shoppingCartController = require("./../controllers/shoppingCartController.js");
const authController = require("./../controllers/authController");
const shoppingCartRouter = express.Router();

/**
 * Rutas de los ShoppingCart
 */
shoppingCartRouter
    .all('/', authController.protect)
    .get('/', shoppingCartController.getAllCart)
    .post('/product', authController.protect, shoppingCartController.addProductToShoppingCart)
    .post('/pay', authController.protect, shoppingCartController.payShoppingCart)
    .delete('/product/:id', authController.protect, shoppingCartController.deleteShoppingCart);

module.exports = shoppingCartRouter;