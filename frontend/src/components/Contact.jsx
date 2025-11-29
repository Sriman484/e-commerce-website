import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

function Footer() {
    const { darkMode } = useDarkMode();
    
    return (
        <div
            className="p-5"
            style={{ 
                background: darkMode 
                    ? 'rgba(18, 18, 18, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: darkMode 
                    ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
                    : '0 2px 20px rgba(0, 0, 0, 0.08)',
                bottom: 0,
                width: '100%'
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className={`${darkMode ? 'text-white' : 'text-dark'}`}>TrenzZ</h5>
                        <p className={`${darkMode ? 'text-white' : 'text-dark'}`}>
                            Your one-stop shop for the latest trends & best deals.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5 className={`${darkMode ? 'text-white' : 'text-dark'}`}>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/products" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Shop
                                </Link>
                            </li>

                            <li>
                                <Link to="/" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h5 className={`${darkMode ? 'text-white' : 'text-dark'}`}>Support</h5>
                        <ul className={`list-unstyled ${darkMode ? 'text-white' : 'text-dark'}`}>
                            <li>
                                <a href="mailto:trenzz@gmail.com" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Email: trenzz@gmail.com
                                </a>
                            </li>

                            <li>
                                <a hef="tel:+919080345678" 
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Phone: +91 9080345678
                                </a>
                            </li>

                            <li>
                                <a 
                                    href="https://maps.app.goo.gl/jEgXeAByf6WQ8i9M9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${darkMode ? 'text-white' : 'text-dark'} text-decoration-none`}
                                >
                                    Poonamalle-Avadi road, Thiruverkadu, Chennai - 600077
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>

                <div className="text-center mt-3">
                    <p className={`${darkMode ? 'text-white' : 'text-dark'} mb-0`}>
                        &copy; 2025 TrenzZ. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;