import React from 'react';
import Cart from './Cart';

function CartPage({ cart, setCart }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🛒 Your Cart</h1>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default CartPage;
