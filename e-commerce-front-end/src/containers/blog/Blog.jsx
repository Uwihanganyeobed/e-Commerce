import React, { useState, useEffect } from 'react';
import Article from '../../components/article/Article';
import './blog.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import required modules

function Blog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/new'); // Updated route for new products
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

  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <p className="gradient__text">A lot of New Products are coming for you!</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination]} // Add modules
        spaceBetween={30}
        slidesPerView={3} // Number of slides to show at once
        pagination={{ clickable: true }} // Enable pagination
        navigation // Enable navigation buttons
        loop={true} // Enable looping
        direction="horizontal" // Ensure swiping direction is horizontal
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.prodId}>
            <Link to={`/products/equipHome/${product.prodId}`}>
              <Article imgUrl={product.prodImage} date="Mar 21, 2024" text={product.prodName} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Blog;
