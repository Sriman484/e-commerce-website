import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import SearchModal from './SearchModal';

function NavBar({ onOpenAuth, showToast }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();

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

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ 
            background: darkMode 
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '1rem 0'
        }}>
            <div className="container-fluid px-4">
                <Link className="navbar-brand text-white fw-bold" to="/" style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>
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
                                className="nav-link text-white fw-semibold px-3" 
                                to="/"
                                style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-white fw-semibold px-3" 
                                to="/products"
                                style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-white fw-semibold px-3" 
                                to="/cart"
                                style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-white fw-semibold px-3 position-relative" 
                                to="/wishlist"
                                style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Wishlist
                                {wishlistCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-white fw-semibold px-3" 
                                to="/help"
                                style={{ fontSize: '1.1rem', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Helpdesk
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex gap-2 mt-3 mt-lg-0 justify-content-center align-items-center">
                        <button
                            className="btn btn-outline-light"
                            onClick={() => setShowSearch(true)}
                            style={{ 
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title="Search"
                        >
                            🔍
                        </button>
                        <button
                            className="btn btn-outline-light"
                            onClick={toggleDarkMode}
                            style={{ 
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-white d-flex align-items-center px-3 fw-semibold text-decoration-none"
                                    style={{ transition: 'all 0.3s' }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    👤 {username}
                                </Link>
                                <button 
                                    className="btn btn-outline-light px-4"
                                    onClick={handleLogout}
                                    style={{ 
                                        borderRadius: '25px',
                                        transition: 'all 0.3s',
                                        fontWeight: '500'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className="btn btn-outline-light px-4"
                                    onClick={onOpenAuth}
                                    style={{ 
                                        borderRadius: '25px',
                                        transition: 'all 0.3s',
                                        fontWeight: '500'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    Login
                                </button>
                                <button 
                                    className="btn btn-light px-4"
                                    onClick={onOpenAuth}
                                    style={{ 
                                        borderRadius: '25px',
                                        transition: 'all 0.3s',
                                        fontWeight: '500',
                                        color: '#667eea'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
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
        <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
        </>
    );
}

export default NavBar;