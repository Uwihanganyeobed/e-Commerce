import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addCartItem = (item) => {
    const isInCart = cartItems.find((cartItem) => cartItem.prodId === item.prodId);

    if (isInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.prodId === item.prodId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  console.log(cartItems)

  const removeFromCart = (item) => {
    const isInCart = cartItems.find((cartItem) => cartItem.prodId === item.prodId);

    if (isInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.prodId !== item.prodId));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.prodId === item.prodId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.new_price * item.quantity, 0);
  };

  const getItemTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeFromCart,
        clearCart,
        getCartTotal,
        getItemTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
