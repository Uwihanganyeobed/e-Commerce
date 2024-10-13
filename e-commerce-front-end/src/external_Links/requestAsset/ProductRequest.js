import React, { useState } from "react";
import "./ProductRequest.css";
import OneSearch from "../oneSearch/OneSearch";
import { Link } from "react-router-dom";
import { DataCategory } from "../../assets/DataCategory";

const ProductRequest = () => {
  const [state, setState] = useState(0);

  return (
    <div className="request">
      <div className="request__headers">
        <button>Back</button>
        <h2>Request for a Product in Categories below</h2>
      </div>
      <hr />
      <div className="request__category">
        {DataCategory.map((category, index) => (
          <span key={index} className="request__category-data">
            <p>{category.categoryName}</p>
            <OneSearch options={category.categoryData} />
          </span>
        ))}
      </div>
      <hr />
      <div className="request__footer">
        <span className="request__max">
          <label>Maximum: (5)</label>
          <input
            type="number"
            value={state}
            onChange={(e) => setState(e.target.value <= 5 ? e.target.value : 0)}
          />
          <Link to="/">
            <button>Send</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ProductRequest;
