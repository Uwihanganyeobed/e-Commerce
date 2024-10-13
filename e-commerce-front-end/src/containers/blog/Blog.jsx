import React, { useState, useEffect } from 'react';
import Article from '../../components/article/Article';
import './blog.css';
import { Link } from 'react-router-dom';

function Blog() {
  const [products, setProducts] = useState([]);
  const [randomImages, setRandomImages] = useState([]);

  // Shuffle function definition
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/allproducts');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  const newDealProducts = products.filter(product => product.prodCategory === 'newDeals');

  useEffect(() => {
    if (newDealProducts.length === 0) return;

    let shuffledImages = shuffleArray([...newDealProducts]); // Use a copy of the array

    const updateRandomImages = () => {
      const nextImages = shuffledImages.concat(shuffledImages[0]).slice(1, 5);
      setRandomImages(nextImages);
      shuffledImages = shuffleArray(shuffledImages);
    };

    const intervalId = setInterval(updateRandomImages, 5000);
    return () => clearInterval(intervalId);
  }, [newDealProducts]);

  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">A lot of New Products are coming for you!</h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          {randomImages.length > 0 &&
            <Link to={`/products/home/${randomImages[0].prodId}`}>
              <Article imgUrl={randomImages[0].prodImage} date="Mar 21, 2024" text={randomImages[0].prodName} />
            </Link>
          }
        </div>
        <div className="gpt3__blog-container_groupB">
          {randomImages.slice(1).map((image, index) => (
            <Link key={index} to={`/products/home/${image.prodId}`}>
              <Article imgUrl={image.prodImage} date="Mar 21, 2024" text={image.prodName} />
            </Link>
          ))}
          {randomImages.length === 4 &&
            <Link key={4} to={`/products/home/${randomImages[0].prodId}`}>
              <Article imgUrl={randomImages[0].prodImage} date="Mar 21, 2024" text={randomImages[0].prodName} />
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Blog;