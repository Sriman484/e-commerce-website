import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Helpdesk from "./components/HelpDesk";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Payment from "./components/Payment"
import ProductDet from "./components/ProductDet";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    alert("Item added to Cart Successfully ✅")
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/help" element={<Helpdesk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products/:id" element={<ProductDet/>} />
      </Routes>
      <Contact />
    </Router>
  );
}

export default App;
