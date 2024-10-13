import React, { useState } from "react"; // Import useState
import "./appProducts.css";
import ProductValue from "../valuedProducts/ProductValue";
import ProductBar from "../../components/product-bar/ProductBar";

const AppProducts = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Create state for search query

  return (
    <div className="gpt3__appProducts" id="#appProduct">
      <ProductBar setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery */}
      <div className="gpt3__appProductsContainer">
        <div className="gpt3__appProducts-left">
          <div className="left__KFLS-programs" id="deals">
            <h1 href="#">All deals</h1>
            <a href="#">New Houses</a>
            <a href="#">In Negotiations</a>
            <a href="#">Watchlist</a>
          </div>
          <div className="left__KFLS-Departments" id="rentDept">
            <h5>KFLS-Departments</h5>
            <span>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Locations</label>
            </span>
            <span>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Value</label>
            </span>
            <span>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Sizes</label>
            </span>
          </div>
          <div className="left__KFLS-price" id="priceSell">
            <h3>Price</h3>
            <a href="#" style={{ fontWeight: "bold" }}>
              All
            </a>
            <a href="#">Under $10</a>
            <a href="#">Under $15</a>
            <a href="#">Under $35</a>
            <a href="#">Under $60</a>
            <a href="#">Under $100</a>
            <a href="#">Under $200 & above</a>
          </div>
          <div className="left__KFLS-discount" id="discount">
            <h3>Discount</h3>
            <a href="#" style={{ fontWeight: "bold" }}>
              All deals
            </a>
            <a href="#">10% off or more</a>
            <a href="#">53% off or more</a>
            <a href="#">45% off or more</a>
            <a href="#">70% off or more</a>
          </div>
          <div className="left__KFLS-rating" id="ratings">
            <h3>Customer Ratings</h3>
            <div className="rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
            <div className="rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
            <div className="rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </div>
            <div className="rating">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="left__KFLS-discount" id="discount">
            <h3>Discount</h3>
            <a href="#" style={{ fontWeight: "bold" }}>
              All deals
            </a>
            <a href="#">10% off or more</a>
            <a href="#">53% off or more</a>
            <a href="#">45% off or more</a>
            <a href="#">65% off or more</a>
            <a href="#">75% off or more</a>
            <a href="#">80% off or more</a>
          </div>
        </div>
        <div className="gpt3__appProducts-right">
          <ProductValue searchQuery={searchQuery} category={""} /> {/* Pass searchQuery */}
          {/* Uncomment other components as needed */}
          {/* <ProductValueHome />
          <ProductValueWear /> */}
        </div>
      </div>
      <div className="products__footer">
        <br />
        <div className="back_to-top" id="#appProduct">
          <p>Back to top</p>
        </div>
      </div>
    </div>
  );
};

export default AppProducts;
