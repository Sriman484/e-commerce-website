import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDet() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]); // State to manage cart items
    const { id } = useParams();

    // Fetch product details
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products/" + id);
                console.log(response.data);
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

    // Get cart quantity for a product
    const getCartQuantity = (productId) => {
        const cartItem = cartItems.find((item) => item._id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    // Add to Cart function
    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex((item) => item._id === product._id);
        if (existingItemIndex > -1) {
            // Item exists, update quantity
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            // New item, add to cart
            const updatedCart = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCart);
        }
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

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={products.image || "https://via.placeholder.com/500"}
                        alt={products.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="display-4">{products.name}</h1>
                    <p className="text-muted">Product ID: {products.id}</p>
                    <p className="h4 text-success">₹{products.price}</p>
                    <p className="lead">{products.description}</p>

                    <div className="d-flex justify-content-start">
                        <button
                            className="btn btn-primary flex-fill"
                            onClick={() => addToCart(products)}
                        >
                            Add to Cart{" "}
                            {getCartQuantity(products.id) > 0 && `(${getCartQuantity(products.id)})`}
                        </button>
                        <button className="btn btn-secondary" style={{ width: '150px' }}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDet;