import React, { useEffect, useState } from "react";
import axios from "axios";

function Product({ addToCart, cartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://trenzz.onrender.com/api/products")
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item._id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card p-3 h-100">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="card-img-top img-fluid rounded"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold">Price: ₹{product.price}</p>
                <p className="card-text">{product.description}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart{" "}
                  {getCartQuantity(product._id) > 0 && `(${getCartQuantity(product._id)})`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;