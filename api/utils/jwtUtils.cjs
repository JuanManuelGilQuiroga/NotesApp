const jwt = require('jsonwebtoken');

exports.generateToken = user => {
	
	return jwt.sign(user, process.env.SECRET_JWT_KEY, { expiresIn: '1h' });
};

exports.verifyToken = (token, callback) => {
	jwt.verify(token, process.env.SECRET_JWT_KEY, callback);
};