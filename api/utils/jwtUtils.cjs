const jwt = require('jsonwebtoken');

exports.generateToken = user => {
	console.log(user)
	return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token, callback) => {
	jwt.verify(token, process.env.JWT_SECRET, callback);
};