
const Cart = require('../modules/Cart');

//test cat endpoint//
exports.getCart = async (req, res) => {
  return res.json("Hello World!");
}
// Create or update cart

exports.createCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ user: userId });
    
    if (cart) {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      
      if (itemIndex > -1) {
        // Update quantity if it exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create a new cart
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    }
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Read cart
exports.readCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Update cart item quantity
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity; // Update quantity
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

// Delete cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.params.userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};

