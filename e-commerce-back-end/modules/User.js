const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  logs: [
    {
      action: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Add wishlist field
});

module.exports = mongoose.model('User', UserSchema);
