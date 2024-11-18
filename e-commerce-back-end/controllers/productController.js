const Product = require('../modules/Product');
const User = require('../modules/User');
// Create a Product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
};

// Update a Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};

// Get Products by Category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products by category');
  }
};

// Get Available Products
exports.getAvailableProducts = async (req, res) => {
  try {
    const availableProducts = await Product.find({ is_available: true });
    res.json(availableProducts);
  } catch (error) {
    res.status(500).send('Error fetching available products');
  }
};

// Search Products by Name
exports.searchProductsByName = async (req, res) => {
  try {
    const searchTerm = req.query.name || '';
    const products = await Product.find({ name: new RegExp(searchTerm, 'i') });
    res.json(products);
  } catch (error) {
    res.status(500).send('Error searching products by name');
  }
};

// Sort Products by Price or Rating
exports.sortProducts = async (req, res) => {
  try {
    const { sortBy } = req.query; // sortBy can be "new_price" or "rating"
    
    // Determine sort order based on field
    const sortOrder = sortBy === 'new_price' ? { new_price: 1 } : { rating: -1 };
    
    const products = await Product.find().sort(sortOrder);
    res.json(products);
  } catch (error) {
    res.status(500).send('Error sorting products');
  }
};

// Filter Products by Price Range
exports.filterProductsByPriceRange = async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;

    const products = await Product.find({
      new_price: { $gte: minPrice, $lte: maxPrice }
    });

    res.json(products);
  } catch (error) {
    res.status(500).send('Error filtering products by price range');
  }
};

// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Add productId to user's wishlist using $addToSet to avoid duplicates
    await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } });

    res.json({ success: true, message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Error adding product to wishlist' });
  }
};

// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Remove productId from user's wishlist
    await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } });

    res.json({ success: true, message: 'Product removed from wishlist' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Error removing product from wishlist' });
  }
};

// Get Related Products by Category
exports.getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('Product not found');

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(5);

    res.json(relatedProducts);
    
  } catch (error) {
    res.status(500).send('Error fetching related products');
  }
};

// Get Paginated Products
exports.getPaginatedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit
    const page = parseInt(req.params.page) || 1;
    
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    
    const totalDocuments = await Product.countDocuments();
    
    res.json({
      products,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      limit,
     });
    
  } catch (error) {
    res.status(500).send('Error fetching paginated products');
  }
};

// Get Top-Rated Products
exports.getTopRatedProducts = async (req, res) => {
  try {
    const topRatedProducts = await Product.find().sort({ rating: -1 }).limit(10);
    
     if (!topRatedProducts.length)
       return res.status(404).send('No top-rated products found');

     res.json(topRatedProducts);

   } catch (error) {
     res.status(500).send('Error fetching top-rated products');
   }
};
