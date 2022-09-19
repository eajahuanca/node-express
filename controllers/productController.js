/*const fs = require("fs");
const products = JSON.parse(
	fs.readFileSync(`${__dirname}/../data/products.json`)
);*/
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

/**
 * Listar Todos los productos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllProducts = catchAsync(async(req, res) => {
	const products = await Product.find();
	res.status(200).json({
		status: "success",
		timeOfRequest: req.requestTime,
		results: products.length,
		data: {
			products,
		},
	});
});

/**
 * Adicionar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.addProduct = catchAsync(async(req, res) => {
	const newProduct = await Product.create(req.body);
	res.status(200).json({
		status: "success",
		message: "Producto adicionado satisfactoriamente",
		data: {
			newProduct,
		},
	});
});

/**
 * Lista un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductById = catchAsync(async(req, res) => {
	const foundProduct = await Product.findById(req.params.id);
	if (foundProduct) {
		return res.status(200).json({
			status: "success",
			data: {
				product: foundProduct,
			},
		});
	}
	res.status(404).json({
		status: "not found",
	});
});

/**
 * Editar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.editProduct = (req, res) => {
	const id = req.params.id
  	const body = req.body
 	const product = await Product.findOneAndUpdate(id, body)
  
	res.status(200).json({
		status: "success",
		message: "Producto modificado correctamente",
		data: {
			product: product
		},
	});
}

/**
 * Eliminar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct = (req, res) => {
	const id = req.params.id
  	const product = await Product.findOneAndDelete(id)
  
	res.status(200).json({
		status: "deleted File",
		message: "Producto eliminado satisfactoriamente",
		data: {
			product,
		},
	});
}