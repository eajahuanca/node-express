const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
const productRouter = express.Router();

/**
 * Rutas de los Productos
 */
productRouter
	.route("/")
	.all(authController.protect)
	.get(productController.getAllProducts)
	.post(productController.addProduct);
productRouter.route("/:id")
	.all(authController.protect)
	.get(productController.getProductById)
	.put(productController.editProduct)
	.delete(productController.deleteProduct);

module.exports = productRouter;
