import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function Product({ addToCart, cartItems, showToast }) {
  const { darkMode } = useDarkMode();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate();

  const applyFilter = (type, productsToFilter) => {
    const products = productsToFilter || allProducts;
    let filtered = products;
    
    if (type && type !== 'all') {
      filtered = products.filter(product => {
        const productType = product.type || product.Type || product.productType || product.product_type;
        return String(productType).trim() === String(type).trim();
      });
    }
    
    setFilteredProducts(filtered);
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filter changes
    
    // Calculate total pages for filtered products
    const total = filtered.length;
    setTotalPages(Math.ceil(total / itemsPerPage));
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const API_BASE = 'https://trenzz-backend.vercel.app';
      
      // First, try to fetch types directly from the database using the types endpoint
      let typesFromAPI = [];
      try {
        const typesResponse = await axios.get(`${API_BASE}/api/products/types`);
        typesFromAPI = typesResponse.data.types || [];
      } catch (typesError) {
        console.log('⚠️ Types endpoint not available:', typesError.message);
      }

      // Fetch all products
      let allItems = [];
      let page = 1;
      let hasMore = true;
      const maxPages = 50;
      
      while (hasMore && page <= maxPages) {
        try {
          const response = await axios.get(`${API_BASE}/api/products?page=${page}&limit=100`);
          const items = response.data.items || [];
          
          if (items.length === 0) {
            hasMore = false;
          } else {
            allItems = [...allItems, ...items];
            if (page >= response.data.totalPages) {
              hasMore = false;
            } else {
              page++;
            }
          }
        } catch (pageError) {
          console.error(`Error fetching page ${page}:`, pageError);
          hasMore = false;
        }
      }
      
      setAllProducts(allItems);
      
      // Use types from API endpoint if available, otherwise try to extract from products
      let types = [];
      if (typesFromAPI.length > 0) {
        // Use types from the database query (most reliable)
        types = typesFromAPI.sort();
      } else {
        // Fallback: try to extract from products
        const typesSet = new Set();
        allItems.forEach(item => {
          const productType = item.type || item.Type || item.productType || item.product_type;
          if (productType && productType.trim() !== '') {
            typesSet.add(String(productType).trim());
          }
        });
        types = Array.from(typesSet).sort();
      }
      
      setProductTypes(types);
      
      // Apply initial filter
      applyFilter('all', allItems);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Get products for current page
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const isInWishlist = (productId) => {
    const wishlist = localStorage.getItem('wishlist');
    if (!wishlist) return false;
    return JSON.parse(wishlist).some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    const wishlist = localStorage.getItem('wishlist');
    let items = wishlist ? JSON.parse(wishlist) : [];
    
    if (isInWishlist(product.id)) {
      items = items.filter(item => item.id !== product.id);
      showToast('Removed from wishlist', 'success');
    } else {
      items.push(product);
      showToast('Added to wishlist! ❤️', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(items));
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleTypeFilter = (type) => {
    applyFilter(type, allProducts);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const displayProducts = getPaginatedProducts();

  return (
    <div className={`container py-5 ${darkMode ? 'text-white' : ''}`}>
      <h2 className="text-center mb-4">Product List</h2>
      
      {/* Filter Buttons */}
      <div className="mb-4">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className={`btn ${selectedType === 'all' ? 'btn-primary' : darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
            onClick={() => handleTypeFilter('all')}
            style={{ borderRadius: '20px', minWidth: '80px' }}
          >
            All ({allProducts.length})
          </button>
          {productTypes && productTypes.length > 0 ? (
            productTypes.map((type) => {
              const count = allProducts.filter(p => {
                const productType = p.type || p.Type || p.productType || p.product_type;
                return String(productType).trim() === String(type).trim();
              }).length;
              
              return (
                <button
                  key={type}
                  className={`btn ${selectedType === type ? 'btn-primary' : darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                  onClick={() => handleTypeFilter(type)}
                  style={{ borderRadius: '20px', minWidth: '80px' }}
                >
                  {String(type)} ({count})
                </button>
              );
            })
          ) : (
            <div className="w-100 text-center mt-2">
              <small className={`${darkMode ? 'text-light' : 'text-muted'}`}>
                No product types found. Found {allProducts.length} products. 
                {allProducts.length > 0 && (
                  <span> First product type: {allProducts[0]?.type || 'undefined'}</span>
                )}
              </small>
            </div>
          )}
        </div>
        {selectedType !== 'all' && (
          <div className="text-center mt-3">
            <p className={`${darkMode ? 'text-light' : 'text-muted'} mb-0`}>
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} of type: <strong>{selectedType}</strong>
            </p>
          </div>
        )}
      </div>

      {displayProducts.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5">No products found in this category.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => handleTypeFilter('all')}
          >
            View All Products
          </button>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {displayProducts.map((product) => (
          <div key={product.id} className="col-sm-12 col-md-6 col-lg-4">
            <div className={`card h-100 shadow-sm ${darkMode ? 'bg-dark border-secondary' : ''}`} style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="position-relative">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "350px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${product.id}`)}
                />
                <button
                  className="btn btn-sm position-absolute top-0 end-0 m-2"
                  onClick={() => toggleWishlist(product)}
                  style={{ 
                    backgroundColor: isInWishlist(product.id) ? '#dc3545' : 'transparent',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isInWishlist(product.id) ? 'none' : '2px solid #dc3545',
                    transition: 'all 0.3s ease',
                    fontSize: '1.3rem',
                    boxShadow: isInWishlist(product.id) ? '0 4px 12px rgba(220, 53, 69, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                      e.target.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                  title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isInWishlist(product.id) ? '🤍' : '❤️'}
                </button>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{product.name}</h5>
                <p className="card-text fw-bold mb-2 text-center">Price: ₹{product.price}</p>
                <div className="mt-auto d-flex justify-content-between gap-2">
                  <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'} flex-fill`} onClick={() => navigate(`/products/${product.id}`)}>
                    View Details
                  </button>
                  <button className="btn btn-primary flex-fill" onClick={() => addToCart(product)}>
                    Add to Cart{" "}
                    {getCartQuantity(product.id) > 0 && `(${getCartQuantity(product.id)})`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className={`pagination ${darkMode ? 'pagination-dark' : ''}`}>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className={`page-link ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className={`page-link ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className={`page-link ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
          </div>
          )}
        </>
      )}
    </div>
  );
}

export default Product;