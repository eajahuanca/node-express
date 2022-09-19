const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

/**
 * Listar Todos los productos
 * @param {*} req 
 * @param {*} res 
 */
 exports.getAllUsers = catchAsync(async(req, res) => {
	const users = await User.find();
	res.status(200).json({
		status: "success",
		timeOfRequest: req.requestTime,
		results: users.length,
		data: {
			users,
		},
	});
});

/**
 * Adicionar un nuevo usuario
 * @param {*} req
 * @param {*} res
 */
exports.addUser = catchAsync(async (req, res) => {
    req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(200).json({
        status: "success",
        data: {
        user: newUser,
        },
    });
});