const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if MONGOOSE_URL is defined
  if (!process.env.MONGOOSE_URL) {
    console.error('MONGOOSE_URL is not defined in environment variables.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;
