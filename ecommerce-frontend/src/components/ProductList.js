import React from 'react';

import product1 from '../images/iphone.png';
import product2 from '../images/samsung_s24.png';
import product3 from '../images/headphone.png';
import product4 from '../images/dell_laptop.png';
import product5 from '../images/apple_watch.png';

const sampleImages = [product1, product2, product3, product4, product5];

function ProductList({ products, addToCart }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product, index) => (
        <div key={product._id || index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
          <img 
            src={sampleImages[index % sampleImages.length]} 
            alt={product.name} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
          />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
