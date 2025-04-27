import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function ProductDet({ addToCart, cartItems }) {
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
                    <h1 className="display-4 text-center">{products.name}</h1><br />
                    <p className="h4 text-center text-secondary">PRICE : ₹{products.price}</p><br />
                    <p className="lead">{products.description}</p>
                    <br /><br />
                    <div className="d-flex justify-content-start">
                        <button
                            className="btn btn-primary flex-fill"
                            onClick={() => addToCart(products)}
                        >
                            Add to Cart{" "}
                            {getCartQuantity(products.id) > 0 && `(${getCartQuantity(products.id)})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDet;