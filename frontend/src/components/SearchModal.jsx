import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://trenzz.onrender.com/api/products`);
      const allProducts = response.data.items || [];
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-content ${darkMode ? 'bg-dark text-white' : ''}`}>
          <div className="modal-header border-0">
            <h5 className="modal-title">Search Products</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Searching...' : '🔍 Search'}
                </button>
              </div>
            </form>

            {results.length > 0 && (
              <div className="mt-3">
                <h6>Results ({results.length})</h6>
                <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {results.map((product) => (
                    <button
                      key={product.id}
                      className={`list-group-item list-group-item-action ${
                        darkMode ? 'bg-dark text-white border-secondary' : ''
                      }`}
                      onClick={() => handleProductClick(product.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{product.name}</h6>
                          <p className="mb-0 text-muted">₹{product.price}</p>
                        </div>
                        <span className="badge bg-primary">View →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && results.length === 0 && !loading && (
              <div className="text-center text-muted py-4">
                No products found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

