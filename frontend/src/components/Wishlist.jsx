import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

function Wishlist({ addToCart }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={`container py-5 ${darkMode ? 'text-white' : ''}`}>
        <div className="text-center py-5">
          <h2>Your Wishlist is Empty</h2>
          <p className="text-muted">Start adding products you love!</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container py-5 ${darkMode ? 'text-white' : ''}`}>
      <h2 className="mb-4">My Wishlist ({wishlistItems.length})</h2>
      <div className="row g-4">
        {wishlistItems.map((product) => (
          <div key={product.id} className="col-sm-12 col-md-6 col-lg-4">
            <div className={`card h-100 shadow-sm ${darkMode ? 'bg-dark border-secondary' : ''}`}>
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => navigate(`/products/${product.id}`)}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold">₹{product.price}</p>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary flex-fill"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;

