const catchAsync = require("../utils/catchAsync");
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { default: mongoose } = require("mongoose");
const { find, deleteOne, findOne } = require("../models/Cart");

exports.getAllCart = catchAsync(async (req, res) => {
	const products = await Cart.find();

	res.status(200).json({
		status: "successs",
		timeOfRequest: req.requestTime,
		results: products.length,
		data: {
			products,
		},
	});
});

/**
 * Adicionar al carrito de compras
 * @param {*} product 
 * @returns 
 */
const addProductToShoppingCart = async (product) => {
	const newProductOnCart = await Cart.updateOne({ $push: { products: product } })
	return newProductOnCart
}

/**
 * Verificar Existencia
 * @param {*} product 
 * @returns 
 */
const verifyProductd = async (product) => {
	const thereIsProductDB = await Product.findOne(product)
	if (thereIsProductDB) {
		const addProductOnCart = addProductToShoppingCart(thereIsProductDB)
		return addProductOnCart
	}

	const message = "No product in our database to select, add one in get products"
	return message
}

/**
 * Verificar Producto en el carrito
 * @param {*} product 
 * @param {*} user 
 * @returns 
 */
const verifyProductdOnCart = async (product, user) => {
	const userAunthenticated = await User.find(user)
	if (userAunthenticated) {
		const checkingCar = await Cart.findOne(product)
		return checkingCar.products.find(prod => prod.productName == product.productName)
	}

}

/**
 * Creamos el carrito de compras
 * @param {*} user 
 * @param {*} product 
 * @returns 
 */
const createShoppingCart = async (user, product) => {
	const createCart = await Cart.create({ user: user.userName, status: "pending", products: product })
	return createCart
}

/**
 * Verificar si existe carrito de compras
 * @param {*} user 
 * @param {*} product 
 * @returns 
 */
const existShoppingCart = async (user, product) => {
	const foundShoppingCart = await Cart.find({ a: 1 })
	if (foundShoppingCart == '') {
		return createShoppingCart(user, product)
	} else {
		return verifyProductdOnCart(product, user)
	}
}

/**
 * Adicionando productos al carrito
 */
exports.addProductToShoppingCart = catchAsync(async (req, res) => {
	const userProduct = req.body;
	const user = req.user;
	let message = "";

	await existShoppingCart(user, userProduct);

	const product = await verifyProductdOnCart(userProduct, user);
	if (product) {
		message = "Producto existente en el carrito actual";
		res.status(200).json({
			message: message,
			status: "success",
			user: user.userName,
			data: {
				product
			},
		});

	} else {
		message = "Agregando producto";

		const getverifyProductd = await verifyProductd(userProduct)
		const modifyingData = getverifyProductd.modifiedCount

		if (typeof (getverifyProductd) == String) {
			message = addedProduct
			res.status(400).json({
				message: message,
				status: "error"
			})
		} else {
			res.status(200).json({
				message: message,
				status: "success",
				user: user.userName,
				documentModified: modifyingData,
				statusCart: "pending",
			});
		}
	}
});

/**
 * Cambiando el estado del carrito
 * @param {*} user 
 * @param {*} cartStatus 
 * @param {*} statusByUser 
 * @returns 
 */
const changeCartStatus = async (user, cartStatus, statusByUser) => {
	const searchingUser = await Cart.findOne({ user })
	const getUserStatus = statusByUser.status
	if (searchingUser.user == user && cartStatus == "pending") {
		const changingStatus = await Cart.updateOne({ status: getUserStatus })
		return changingStatus
	}
}

/**
 * Cambiando el estado del carrito
 */
exports.payShoppingCart = catchAsync(async (req, res) => {
	const { userName } = req.user
	const statusModifiedByUser = req.body

	const checkingCar = await Cart.find({ a: 1 })

	if (checkingCar != null) {
		const userCart = checkingCar.find(userCart => userCart.user == userName)
		await changeCartStatus(userName, userCart.status, statusModifiedByUser);
		const productPrice = await Cart.findOne().select('products');
		const totalPrice = await productPrice.products.reduce((prevPrice, nextPrice) => parseFloat(prevPrice.price + nextPrice.price));

		res.status(200).json({
			message: "Cambiando el estado de 'pending' a 'pay'",
			user: userName,
			status: userCart.status,
			products: productPrice,
			totalPrice: totalPrice,
		});
	} else {
		res.status(200).json({
			message: "El estado es 'pending'",
			status: "error",
		});
	}
});

/**
 * Buscando producto
 * @param {*} productId 
 * @returns 
 */
async function searchProduct(productId) {
	const findCart = await Cart.find().select('products')
	const productFound = findCart[0].products.find(prod => prod._id == productId)
	if (productFound) {
		return productFound
	} else {
		let message = "Ocurrio un error"
		return message
	}
}

/**
 * Eliminado el carrito de compras
 */
exports.deleteShoppingCart = catchAsync(async (req, res) => {
	const id = req.params.id
	const { userName } = req.user
	const product = await searchProduct(id)

	if (typeof (product) == String) {
		res.status(200).json({
			message: product,
			status: "success",
			user: userName,
		});
	} else {
		const statusCart = await Cart.find().select('status')
		const eraseFile = await Cart.updateOne({ $pull: { products: product } })
		const { acknowledged, modifiedCount } = eraseFile
		res.status(200).json({
			status: "success",
			user: userName,
			statusCart: statusCart[0].status,
			data: {
				acknowledged,
				modifiedCount
			},
		});
	}
});