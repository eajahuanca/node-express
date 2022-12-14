const fs = require("fs");
const products = JSON.parse(
	fs.readFileSync(`${__dirname}/../data/products.json`)
);

/**
 * Listar Todos los productos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllProducts = (req, res) => {
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
	products.push(req.body);
	fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

	res.status(200).json({
		status: "success",
		message: "Producto adicionado satisfactoriamente",
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
	const foundProduct = products.find((p) => p.id == req.params.id);
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
};

/**
 * Editar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.editProduct = (req, res) => {
	const foundProduct = products.find((p) => p.id == req.params.id);
	if (foundProduct) {
		const indexProduct = products.indexOf(foundProduct);
		if (indexProduct > -1) {
			products[indexProduct] = req.body;
			fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

			return res.status(202).json({
				status: "success",
				message: "Producto actualizado satisfactoriamente",
				data: {
					products
				},
			});
		}
	} 
	res.status(404).json({
		status: "not found",
	});
}

/**
 * Eliminar un producto
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct = (req, res) => {
	const foundProduct = products.find((p) => p.id == req.params.id);

	if (foundProduct) {	
		const indexProduct = products.indexOf(foundProduct);
		if (indexProduct > -1){
			products.splice(indexProduct, 1);
			fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
			
			return res.status(202).json({
				status: "success",
				message: "Producto eliminado satisfactoriamente",
				data: foundProduct,
			});
		}  
	}
	res.status(201).json({
		status: "not found",
	});
}