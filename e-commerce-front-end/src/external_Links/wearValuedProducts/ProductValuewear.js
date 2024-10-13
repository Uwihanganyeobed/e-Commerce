import React from "react";
import "./WearProductValue.css";
import { all_products } from "../../../src/assets/all_products";
import { Link } from "react-router-dom";

function ProductValuewear() {
  // Filter products to get only those with the category 'People's Fashion'
  const Product_People = all_products.filter(product => product.prodCategory === "People's Fashion");

  // Group products in sets of three
  const productsGrouped = [];
  for (let i = 0; i < Product_People.length; i += 3) {
    productsGrouped.push(Product_People.slice(i, i + 3));
  }

  return (
    <div className="navLef">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {productsGrouped.map((group, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {productsGrouped.map((group, index) => (
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
                      onClick={window.scrollTo(0, 0)}
                    />
                    <div className="product-model">{item.prodName}</div>
                    <div className="product-price">
                      ${item.new_price}{" "}
                      <label className="disable-me">${item.old_price}</label>
                    </div>
                    <Link to={`/products/you/${item.prodId}`}>
                      <button className="buy-button">Add to Cart</button>
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
          data-bs-target="#carouselExampleCaptions"
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
          data-bs-target="#carouselExampleCaptions"
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
}

export default ProductValuewear;
