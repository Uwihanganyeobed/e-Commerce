import React, { useContext } from "react";
import "./CartItems.css";
import remove_icon from "../../../assets/cart_cross_icon.png";
import { CartContext } from "../../../Context/CartContex";

const CartItems = () => {
  const { cartItems, removeFromCart, getCartTotal } = useContext(CartContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItems.map((product) => (
        <div key={product.prodId}>
          <div className="cartitems-format cartitems-format-main">
            <img src={product.prodImage} className="carticon-product-icon" alt="" />
            <p>{product.prodName}</p>
            <p>${product.new_price}</p>
            <p>{product.quantity}</p>
            <p>${(product.new_price * product.quantity).toFixed(2)}</p>
            <img
              className="right-me"
              src={remove_icon}
              onClick={() => {
                removeFromCart(product);
              }}
              alt=""
            />
          </div>
          <hr />
        </div>
      ))}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getCartTotal().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getCartTotal().toFixed(2)}</h3>
            </div>
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className="cart-items-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
