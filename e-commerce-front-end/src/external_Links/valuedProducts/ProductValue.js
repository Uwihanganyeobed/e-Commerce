import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./productValue.css";

function ProductValue({ searchQuery = "", category = "" }) {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allproducts");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category and search query
  const filteredProducts = allProducts.filter((product) => {
    const name = product.prodName?.toLowerCase() || "";
    const prodCategory = product.prodCategory?.toLowerCase() || "";

    return (
      (!category || prodCategory === category.toLowerCase()) &&
      (name.includes(searchQuery.toLowerCase()) || prodCategory.includes(searchQuery.toLowerCase()))
    );
  });

  // Filter products by categories
  const electronics = filteredProducts.filter(
    (product) => product.prodCategory === "electronics"
  );
  const fashion = filteredProducts.filter(
    (product) => product.prodCategory === "peopleFashion"
  );
  const homeEquip = filteredProducts.filter(
    (product) => product.prodCategory === "equipHome"
  );

  // Group products in sets of three for each category
  const groupProducts = (products) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += 3) {
      grouped.push(products.slice(i, i + 3));
    }
    return grouped;
  };

  const electronicsGrouped = groupProducts(electronics);
  const fashionGrouped = groupProducts(fashion);
  const homeEquipGrouped = groupProducts(homeEquip);

  // Function to create carousels for a specific category
  const createCarousel = (groupedProducts, id, label) => (
    <div className="carousel-section">
      <h2>{label}</h2>
      <div
        id={`carousel-${id}`}
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {groupedProducts.map((group, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#carousel-${id}`}
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="product-deals">
                {group.map((item, itemIndex) => (
                  <div key={itemIndex} className="product-container">
                    <p className="product-type">{item.prodCategory}</p>
                    <img
                      className="product-image"
                      src={item.prodImage}
                      alt="ProductImage"
                      onClick={() => window.scrollTo(0, 0)} // Use arrow function to avoid immediate invocation
                    />
                    <div className="product-model">{item.prodName}</div>
                    <div className="product-price">
                      ${item.new_price}{" "}
                      <label className="disable-me">${item.old_price}</label>
                    </div>

                    <Link
                      to={`/products/${item.prodCategory?.toLowerCase()}/${
                        item._id
                      }`} // Use optional chaining
                    >
                      <button className="buy-button">Buy Now</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel-${id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visible prev">Prev</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carousel-${id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visible next">Next</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="product-carousel-container">
      {createCarousel(electronicsGrouped, "electronics", "Electronics")}
      {createCarousel(fashionGrouped, "PeopleFashion", "People's Fashion")}
      {createCarousel(homeEquipGrouped, "equipHome", "Equip-Home")}
    </div>
  );
}

export default ProductValue;
