import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useDarkMode } from '../contexts/DarkModeContext';

function ProductDet({ addToCart, cartItems, showToast }) {
    const { darkMode } = useDarkMode();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://trenzz.onrender.com/api/products/" + id);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id]);

    const getCartQuantity = (productId) => {
        const cartItem = cartItems.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">Failed to load product: {error}</div>;
    }

    if (!products) {
        return <div className="alert alert-warning" role="alert">Product not found</div>;
    }

    const isInWishlist = () => {
        const wishlist = localStorage.getItem('wishlist');
        if (!wishlist) return false;
        return JSON.parse(wishlist).some(item => item.id === products.id);
    };

    const toggleWishlist = () => {
        const wishlist = localStorage.getItem('wishlist');
        let items = wishlist ? JSON.parse(wishlist) : [];
        
        if (isInWishlist()) {
            items = items.filter(item => item.id !== products.id);
            showToast('Removed from wishlist', 'info');
        } else {
            items.push(products);
            showToast('Added to wishlist! ❤️', 'success');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(items));
    };

    return (
        <div className={`container my-5 ${darkMode ? 'text-white' : ''}`}>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={products.image || "https://via.placeholder.com/500"}
                        alt={products.name}
                        className="img-fluid rounded shadow"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="display-4 text-center">{products.name}</h1><br />
                    <p className={`h4 text-center ${darkMode ? 'text-light' : 'text-secondary'}`}>PRICE : ₹{products.price}</p><br />
                    <p className="lead">{products.description || 'No description available'}</p>
                    <br /><br />
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary flex-fill"
                            onClick={() => addToCart(products)}
                        >
                            Add to Cart{" "}
                            {getCartQuantity(products.id) > 0 && `(${getCartQuantity(products.id)})`}
                        </button>
                        <button
                            className={`btn ${isInWishlist() ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={toggleWishlist}
                            style={{ minWidth: '50px' }}
                            title={isInWishlist() ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {isInWishlist() ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDet;