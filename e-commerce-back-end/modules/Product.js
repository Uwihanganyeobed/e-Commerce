const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: String, required: true },
  old_price: { type: String, required: true },
  rating: { type: Number, required: true },
  colors: [
    {
      name: { type: String, required: true },
      class: { type: String, required: true },
      selectedClass: { type: String, required: true }
    }
  ],
  sizes: [
    {
      name: { type: String, required: true },
      inStock: { type: Boolean, required: true }
    }
  ],
  description: { type: String, required: true },
  highlights: { type: [String], required: true },
  details: { type: String, required: true },
  is_featured: { type: Boolean, default: false },
  is_new: { type: Boolean, default: false },
  is_available: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
