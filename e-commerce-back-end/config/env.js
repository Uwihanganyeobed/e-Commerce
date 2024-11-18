require('dotenv').config();

const PORT = process.env.PORTNUMBER || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, JWT_SECRET };
