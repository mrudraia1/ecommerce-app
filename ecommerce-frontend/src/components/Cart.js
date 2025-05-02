import React from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  // const [cart, setCart] = useState([]);
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    try {
      await axios.post(`${backendURL}/orders`, { items: cart });
      alert('Order placed successfully!');
      setCart([]); // Empty the cart after successful order
    } catch (error) {
      console.error(error);
      // alert('Failed to place order.');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Cart 🛍️</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none' }}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;


// import React from 'react';

// function Cart({ cart }) {
//   const total = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div style={{ marginBottom: '20px' }}>
//       <h2>Cart 🛍️</h2>
//       <p>Items: {cart.length}</p>
//       <p>Total: ${total.toFixed(2)}</p>
//     </div>
//   );
// }

// export default Cart;
