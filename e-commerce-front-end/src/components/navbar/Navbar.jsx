import React, { useState } from "react";
import { PiTrademarkRegisteredFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = [
    "All",
    "Electronics",
    "Books",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports",
  ];
  return (
    <nav className="primary-nav">
      <div className="gpt3__navbar">
        <div className="gpt3__navbar-links">
          <Link to="/">
            <div className="gpt3__navbar-links_logo">
              <p>KFLS</p>
              <PiTrademarkRegisteredFill color="lime" className="loo" />
            </div>
          </Link>
          <div className="gpt3__navbar-links_container">
            <Link to="/products">
              <a href="#possibility">Products</a>
            </Link>

            <Link to="/requests">
              <a href="#wgpt3">Requests</a>
            </Link>

            <Link to="/about">
              <a href="#wgpt3">About</a>
            </Link>
          </div>
          <div className="gpt3__navbar-search">
            <div className="dropdown">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="dropdown-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder={`Search in ${selectedCategory}`}
              />
              <button className="search-button">
                <IoIosSearch size={21} color="#fff" className="git" />
              </button>
            </div>
          </div>
          <div className="gpt3__navbar-sign">
            {localStorage.getItem("auth-token") ? (
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}

            <Link to="/delivery">
              <span className="user-location">
                <CiLocationOn color="white" size={35} cursor="pointer" />
                <label>
                  Deliver to <strong>Rwanda</strong>
                </label>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
