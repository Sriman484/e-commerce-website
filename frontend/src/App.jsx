import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Helpdesk from "./components/HelpDesk";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import ProductDet from "./components/ProductDet";
import AuthModal from "./components/AuthModal";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import ToastContainer from "./components/ToastContainer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    
    // Show modal only on first visit
    if (!hasVisited) {
      // Small delay for better UX
      setTimeout(() => {
        setShowAuthModal(true);
      }, 500);
      // Mark as visited
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    // Force NavBar to refresh
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  return (
    <DarkModeProvider>
      <Router>
        <NavBar key={refreshKey} onOpenAuth={handleOpenAuthModal} showToast={showToast} />
        <AuthModal isOpen={showAuthModal} onClose={handleCloseAuthModal} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} cartItems={cartItems} showToast={showToast} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDet addToCart={addToCart} cartItems={cartItems} showToast={showToast} />}
          />
          <Route path="/help" element={<Helpdesk />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} showToast={showToast} />}
          />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/wishlist"
            element={<Wishlist addToCart={addToCart} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Contact />
      </Router>
    </DarkModeProvider>
  );
}

export default App;