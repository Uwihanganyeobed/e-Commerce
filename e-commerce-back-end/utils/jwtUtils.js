const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// Generate JWT Token
exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
};
