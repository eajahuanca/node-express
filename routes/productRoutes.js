const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();

/**
 * Rutas de los Productos
 */
productRouter
	.route("/")
	.get(productController.getAllProducts)
	.post(productController.addProduct);
productRouter.route("/:id").get(productController.getProductById);
productRouter.route("/:id").put(productController.editProduct);
productRouter.route("/:id").delete(productController.deleteProduct);

module.exports = productRouter;
