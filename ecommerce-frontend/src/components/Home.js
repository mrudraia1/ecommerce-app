import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const backendURL = process.env.REACT_APP_BACKEND_URL;


function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${backendURL}/products`);
    setProducts(res.data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛒 Product List</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}

export default Home;