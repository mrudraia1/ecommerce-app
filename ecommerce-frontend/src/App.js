import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/CartPage';
import Orders from './components/Orders';
import Header from './headers/Header'; // <--- Import it
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div>
        <Header cart={cart} /> {/* <--- Add Header here */}
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
