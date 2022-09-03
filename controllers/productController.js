const fs = require("fs");

/**
 * Listar Todos los productos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllProducts = (req, res) => {
	const products = JSON.parse(
		fs.readFileSync(`${__dirname}/../data/products.json`)
	);

	res.status(200).json({
		status: "success",
		timeOfRequest: req.requestTime,
		results: products.length,
		data: {
			products,
		},
	});
};

/**
 * Adicionar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.addProduct = (req, res) => {
	const products = JSON.parse(
		fs.readFileSync(`${__dirname}/../data/products.json`)
	);
	products.push(req.body);
	fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

	res.status(200).json({
		status: "success",
		data: {
			products,
		},
	});
};

/**
 * Lista un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductById = (req, res) => {
	const products = JSON.parse(
		fs.readFileSync(`${__dirname}/../data/products.json`)
	);

	const foundProduct = products.find((p) => p.id == req.params.id);
	if (foundProduct) {
		res.status(200).json({
			status: "success",
			data: {
				product: foundProduct,
			},
		});
	} else {
		res.status(404).json({
			status: "not found",
		});
	}
};
