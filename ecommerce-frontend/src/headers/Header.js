import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cart }) {
  return (
    <div style={{
      backgroundColor: '#007bff',
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    }}>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
        🛍️ Atlan Ecommerce
      </div>
      <div>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          Home
        </Link>
        <Link to="/cart" style={{ marginRight: '20px', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          Cart ({cart.length})
        </Link>
        <Link to="/orders" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          Orders
        </Link>
      </div>
    </div>
  );
}

export default Header;
