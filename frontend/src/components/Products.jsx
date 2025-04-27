import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product({ addToCart, cartItems }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://trenzz.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
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

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Product List</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="card-img-top"
                style={{ height: "350px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{product.name}</h5>
                <p className="card-text fw-bold mb-2 text-center">Price: ₹{product.price}</p>
                <div className="mt-3 d-flex justify-content-between gap-2">
                  <button className="btn btn-outline-secondary flex-fill" onClick={() => navigate(`/products/${product.id}`)}>
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
    </div>
  );
}

export default Product;