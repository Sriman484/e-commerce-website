import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import axios from 'axios';
import icon from "../assets/icon.png"

function NavBar({ onOpenAuth, showToast }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            const loggedIn = localStorage.getItem("isLoggedIn");
            const user = localStorage.getItem("username");
            if (loggedIn === "true") {
                setIsLoggedIn(true);
                setUsername(user || "");
            } else {
                setIsLoggedIn(false);
                setUsername("");
            }
        };
        
        checkLogin();
        // Listen for storage changes (when login happens in another component)
        window.addEventListener('storage', checkLogin);
        // Also check periodically
        const interval = setInterval(checkLogin, 1000);
        
        return () => {
            window.removeEventListener('storage', checkLogin);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    const getWishlistCount = () => {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist).length : 0;
    };

    const [wishlistCount, setWishlistCount] = useState(getWishlistCount());

    useEffect(() => {
        const interval = setInterval(() => {
            setWishlistCount(getWishlistCount());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const performSearch = async (query) => {
        if (!query.trim()) {
            setShowSearchResults(false);
            setSearchResults([]);
            return;
        }

        setSearchLoading(true);
        try {
            const response = await axios.get(`https://trenzz.onrender.com/api/products?page=1&limit=100`);
            const allProducts = response.data.items || [];
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(searchQuery);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
        setSearchQuery('');
        setShowSearchResults(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar-search-container')) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
        <nav className="navbar navbar-expand-lg" style={{ 
            background: darkMode 
                ? 'rgba(18, 18, 18, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: darkMode 
                ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
                : '0 2px 20px rgba(0, 0, 0, 0.08)',
            padding: '1.2rem 0',
            borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container-fluid px-4">
                <Link 
                    className="navbar-brand fw-bold" 
                    to="/" 
                    style={{ 
                        fontSize: '2rem', 
                        letterSpacing: '1px',
                        background: darkMode 
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: '700',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <img src={icon} alt="" className="img-fluid mb-2" height={47} width={47}/>
                    TrenzZ
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item">
                            <Link 
                                className="nav-link fw-medium px-3" 
                                to="/"
                                style={{ 
                                    fontSize: '1rem', 
                                    color: darkMode ? '#e0e0e0' : '#333',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = darkMode ? '#fff' : '#667eea';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link fw-medium px-3" 
                                to="/products"
                                style={{ 
                                    fontSize: '1rem', 
                                    color: darkMode ? '#e0e0e0' : '#333',
                                    transition: 'all 0.3s ease',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = darkMode ? '#fff' : '#667eea';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link fw-medium px-3" 
                                to="/cart"
                                style={{ 
                                    fontSize: '1rem', 
                                    color: darkMode ? '#e0e0e0' : '#333',
                                    transition: 'all 0.3s ease',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = darkMode ? '#fff' : '#667eea';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link fw-medium px-3 position-relative" 
                                to="/wishlist"
                                style={{ 
                                    fontSize: '1rem', 
                                    color: darkMode ? '#e0e0e0' : '#333',
                                    transition: 'all 0.3s ease',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = darkMode ? '#fff' : '#667eea';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Wishlist
                                {wishlistCount > 0 && (
                                    <span 
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                                        style={{ 
                                            fontSize: '0.65rem',
                                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                                            padding: '0.2rem 0.5rem',
                                            fontWeight: '600',
                                            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)'
                                        }}
                                    >
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link fw-medium px-3" 
                                to="/help"
                                style={{ 
                                    fontSize: '1rem', 
                                    color: darkMode ? '#e0e0e0' : '#333',
                                    transition: 'all 0.3s ease',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = darkMode ? '#fff' : '#667eea';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Helpdesk
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex gap-3 mt-3 mt-lg-0 justify-content-center align-items-center navbar-search-container" style={{ position: 'relative', width: '100%', maxWidth: '550px' }}>
                        <form onSubmit={handleSearch} className="d-flex align-items-center w-100" style={{ position: 'relative' }}>
                            <div className="input-group w-100" style={{ maxWidth: '400px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchQuery(value);
                                        if (value.trim()) {
                                            performSearch(value);
                                        } else {
                                            setShowSearchResults(false);
                                            setSearchResults([]);
                                        }
                                    }}
                                    style={{
                                        borderRadius: '12px 0 0 12px',
                                        border: darkMode 
                                            ? '1px solid rgba(255, 255, 255, 0.2)' 
                                            : '1px solid rgba(102, 126, 234, 0.3)',
                                        background: darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(255, 255, 255, 0.9)',
                                        color: darkMode ? '#fff' : '#333',
                                        padding: '0.6rem 1rem',
                                        fontSize: '0.95rem'
                                    }}
                                    onFocus={() => {
                                        if (searchResults.length > 0) {
                                            setShowSearchResults(true);
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="btn"
                                    style={{
                                        borderRadius: '0 12px 12px 0',
                                        border: darkMode 
                                            ? '1px solid rgba(255, 255, 255, 0.2)' 
                                            : '1px solid rgba(102, 126, 234, 0.3)',
                                        background: darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(255, 255, 255, 0.9)',
                                        color: darkMode ? '#fff' : '#333',
                                        padding: '0.6rem 1rem',
                                        fontSize: '0.95rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    disabled={searchLoading}
                                >
                                    {searchLoading ? '⏳' : '🔍'}
                                </button>
                            </div>
                            
                            {/* Search Results Dropdown */}
                            {showSearchResults && searchResults.length > 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        marginTop: '0.5rem',
                                        background: darkMode ? 'rgba(18, 18, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '12px',
                                        boxShadow: darkMode 
                                            ? '0 8px 30px rgba(0, 0, 0, 0.5)' 
                                            : '0 8px 30px rgba(0, 0, 0, 0.15)',
                                        border: darkMode 
                                            ? '1px solid rgba(255, 255, 255, 0.1)' 
                                            : '1px solid rgba(0, 0, 0, 0.1)',
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        zIndex: 1001,
                                        padding: '0.5rem'
                                    }}
                                >
                                    {searchResults.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleProductClick(product.id)}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                cursor: 'pointer',
                                                borderRadius: '8px',
                                                color: darkMode ? '#e0e0e0' : '#333',
                                                transition: 'all 0.2s ease',
                                                borderBottom: darkMode 
                                                    ? '1px solid rgba(255, 255, 255, 0.05)' 
                                                    : '1px solid rgba(0, 0, 0, 0.05)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = darkMode 
                                                    ? 'rgba(102, 126, 234, 0.2)' 
                                                    : 'rgba(102, 126, 234, 0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'transparent';
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1" style={{ margin: 0, fontSize: '0.95rem' }}>
                                                        {product.name}
                                                    </h6>
                                                    <p className="mb-0" style={{ 
                                                        fontSize: '0.85rem',
                                                        color: darkMode ? '#aaa' : '#666'
                                                    }}>
                                                        ₹{product.price}
                                                    </p>
                                                </div>
                                                <span style={{ 
                                                    fontSize: '1.2rem',
                                                    color: darkMode ? '#667eea' : '#667eea'
                                                }}>
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {showSearchResults && searchQuery && searchResults.length === 0 && !searchLoading && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        marginTop: '0.5rem',
                                        background: darkMode ? 'rgba(18, 18, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '12px',
                                        boxShadow: darkMode 
                                            ? '0 8px 30px rgba(0, 0, 0, 0.5)' 
                                            : '0 8px 30px rgba(0, 0, 0, 0.15)',
                                        border: darkMode 
                                            ? '1px solid rgba(255, 255, 255, 0.1)' 
                                            : '1px solid rgba(0, 0, 0, 0.1)',
                                        padding: '1.5rem',
                                        textAlign: 'center',
                                        color: darkMode ? '#aaa' : '#666',
                                        zIndex: 1001
                                    }}
                                >
                                    No products found
                                </div>
                            )}
                        </form>
                        <button
                            className="btn"
                            onClick={toggleDarkMode}
                            style={{ 
                                borderRadius: '12px',
                                width: '44px',
                                height: '44px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: darkMode 
                                    ? 'rgba(255, 255, 255, 0.1)' 
                                    : 'rgba(102, 126, 234, 0.1)',
                                border: 'none',
                                color: darkMode ? '#fff' : '#667eea',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = darkMode 
                                    ? 'rgba(255, 255, 255, 0.2)' 
                                    : 'rgba(102, 126, 234, 0.2)';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = darkMode 
                                    ? 'rgba(255, 255, 255, 0.1)' 
                                    : 'rgba(102, 126, 234, 0.1)';
                                e.target.style.transform = 'scale(1)';
                            }}
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="d-flex align-items-center px-3 fw-medium text-decoration-none"
                                    style={{ 
                                        color: darkMode ? '#e0e0e0' : '#333',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '12px',
                                        padding: '0.5rem 1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = darkMode ? '#fff' : '#667eea';
                                        e.target.style.background = darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(102, 126, 234, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = darkMode ? '#e0e0e0' : '#333';
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    👤
                                </Link>
                                <button 
                                    className="btn px-4"
                                    onClick={handleLogout}
                                    style={{ 
                                        borderRadius: '12px',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '600',
                                        background: darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(102, 126, 234, 0.1)',
                                        border: 'none',
                                        color: darkMode ? '#fff' : '#667eea',
                                        padding: '0.6rem 1.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = darkMode 
                                            ? 'rgba(255, 255, 255, 0.2)' 
                                            : 'rgba(102, 126, 234, 0.2)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(102, 126, 234, 0.1)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className="btn px-4"
                                    onClick={onOpenAuth}
                                    style={{ 
                                        borderRadius: '12px',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '600',
                                        background: 'transparent',
                                        border: darkMode 
                                            ? '2px solid rgba(255, 255, 255, 0.3)' 
                                            : '2px solid rgba(102, 126, 234, 0.3)',
                                        color: darkMode ? '#fff' : '#667eea',
                                        padding: '0.6rem 1.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = darkMode 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(102, 126, 234, 0.1)';
                                        e.target.style.borderColor = darkMode 
                                            ? 'rgba(255, 255, 255, 0.5)' 
                                            : 'rgba(102, 126, 234, 0.5)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.borderColor = darkMode 
                                            ? 'rgba(255, 255, 255, 0.3)' 
                                            : 'rgba(102, 126, 234, 0.3)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Login
                                </button>
                                <button 
                                    className="btn px-4"
                                    onClick={onOpenAuth}
                                    style={{ 
                                        borderRadius: '12px',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '600',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '0.6rem 1.5rem',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                                    }}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

export default NavBar;