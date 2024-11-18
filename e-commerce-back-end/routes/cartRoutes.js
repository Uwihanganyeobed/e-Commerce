const express = require("express");
const {
   getCart,
  createCart,
  readCart,
  updateCart,
  deleteCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();
router.get('/',getCart);
router.post("/", createCart);
router.get("/:userId", readCart);
router.put("/:userId", updateCart);
router.delete("/:userId/:productId", deleteCartItem);
router.delete("/:userId", clearCart);

module.exports = router;
