import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;


function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendURL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  return (
    <div>
      <h2>All Orders 📦</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name} - ${item.price}</li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
