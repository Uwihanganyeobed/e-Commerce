import "./monoProducts.css";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaginateElement from "../lastPagination/PaginateElement";
import ProductValue from "../valuedProducts/ProductValue";
import ToogleModelRating from "../comment&Rating/ToogleModelRating";
import ToogleModelComment from "../comment&Rating/ToogleModelComment";
import ProductBar from "../../components/product-bar/ProductBar"
import axios from "axios";

const MonoProduct = () => {
  const { id } = useParams(); // Get the product ID from URL parameters
  const [product, setProduct] = useState(null);

  // Fetch a single product by ID
  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`); // Fetch product by ID
      setProduct(response.data);
      console.log("Fetched product:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]); // Fetch product whenever ID changes

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <>
      <ProductBar />
      <div className="gpt3__monoProduct">
        <div className="gpt3__left-img">
          <img src={product.prodImage} alt="img" />
          {/* Additional images can be rendered here */}
        </div>
        <div className="gpt3__center-img">
          <img src={product.prodImage} alt="img" />
        </div>
        <div className="gpt3__right-img">
          <h2><u>{product.prodName}</u></h2>
          <br />
          <span>
            <label>7 orders</label>
            <a href="#home">Free shipping</a>
          </span>
          <div className="gpt3__priceOwnDiscount">
            <p>${product.new_price}</p>
            <label>Discounted price of {(Math.round(((product.old_price - product.new_price) / product.old_price) * 100 * 100) / 100).toFixed(2)}%</label>
          </div>
          {/* Color selection and other details */}
          <span className="gpt3__priceOwnDiscount_colors">
            <label>Color:</label>
            <Stack spacing={2} direction="row">
              {/* Color buttons */}
              <Button variant="outlined" color="primary">White</Button>
              <Button variant="contained" color="error">Red</Button>
              {/* Add more colors as needed */}
            </Stack>
          </span>
          {/* Ratings and comments */}
          <span className="gpt3__priceOwnDiscount_qty">
            <ToogleModelRating />
            <ToogleModelComment />
          </span>
          {/* Shipping information */}
          <div className="gpt3__priceOwnDiscount_shipping">
            <p>Estimated time of arrival:</p>
            <h3>13th Mar-16th Mar (Shipping from China)</h3>
          </div>
          {/* Add to cart button */}
          <div className="gpt3__buy-now">
            <Tooltip title="Add" placement="top">
              <button onClick={() => console.log("Add to cart")}>Add To Cart</button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Similar products based on category */}
      <ProductValue searchQuery={""} category={product.prodCategory} />

      {/* Pagination and back to top */}
      <div className="products__footer">
        <PaginateElement />
        <div className="back_to-top" id="#appProduct">
          <p>Back to top</p>
        </div>
      </div>
    </>
  );
};

export default MonoProduct;