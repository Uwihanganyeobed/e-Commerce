const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getAvailableProducts,
  searchProductsByName,
  sortProducts,
  filterProductsByPriceRange,
  addToWishlist,
  removeFromWishlist,
  getRelatedProducts,
  getPaginatedProducts,
  getTopRatedProducts
} = require('../controllers/productController');

const router = express.Router();

// Middleware for validating Object IDs
const validateObjectId = (req, res, next) => {
  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID format' });
  }
  next();
};

// Route for getting top-rated products
router.get('/top-rated', getTopRatedProducts);

// Route for paginated product list with page parameter
router.get('/page/:page', getPaginatedProducts);

// Route for getting products by category
router.get('/category/:category', getProductsByCategory);

// Route for getting available products
router.get('/available', getAvailableProducts);

// Route for product search by name
router.get('/search', searchProductsByName);

// Route for sorting products
router.get('/sort', sortProducts);

// Route for filtering products by price range
router.get('/price', filterProductsByPriceRange);

// Routes for wishlist management
router.post('/wishlist', addToWishlist);

router.delete('/wishlist', removeFromWishlist);

// Route for getting related products by ID
router.get('/:id/related', validateObjectId, getRelatedProducts);

// Routes for product CRUD operations
router.post('/', createProduct);            // Create a new product
router.get('/', getAllProducts);            // Get all products
router.get('/:id', validateObjectId, getProductById); // Get product by ID
router.put('/:id', validateObjectId, updateProduct);  // Update product by ID
router.delete('/:id', validateObjectId, deleteProduct); // Delete product by ID

module.exports = router;
