import React, { useContext, useState } from "react";
import NavLeft from "../../external_Links/Left-Navbar/NavLeft";
import { Link } from "react-router-dom";
import "./Bar.css";
import cart_icon from "../../assets/cart_icon.png";
import { CartContext } from "../../Context/CartContex";

const ProductBar = ({ setSearchQuery }) => {
  const { cartItems } = useContext(CartContext); // Use useContext to get the context value
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value); // Send the query to ProductValue
  };

  return (
    <div className="gpt3__LeftNav" id="#leftNav">
      <div className="navLeft">
        <svg
          className="mySvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          style={{ backgroundColor: "transparent", cursor: "pointer" }}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
        <NavLeft id="leftNav" />
      </div>
      <div className="myPz">
        <a href="#deals">Deals</a>
        <a href="#rentDept">Rent</a>
        <a href="#priceSell">Sell</a>
        <a href="#discount">Service</a>
        <a href="#ratings">Ratings</a>
      </div>
      <div className="search-cart">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder="Search for product..."
          className="search-input"
          aria-label="Search for product" // Accessibility improvement
        />
        <label className="nav-login-cart">
          <Link to="/cart">
            <img src={cart_icon} alt="Cart Icon" />
          </Link>
          <div className="nav-cart-count">{cartItems.length}</div>
        </label>
      </div>
    </div>
  );
};

export default ProductBar;