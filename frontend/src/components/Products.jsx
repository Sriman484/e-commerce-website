import React, { useEffect, useState } from "react";
import axios from "axios";

function Product({ addToCart, cartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
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
      <h2 className="text-center">Product List</h2>
      <br />
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card p-3">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="img-fluid rounded"
                style={{ width: "500px", height: "300px", objectFit: "cover" }}
              />
              <h4 className="mt-2">{product.name}</h4>
              <p className="fw-bold">Price: ₹{product.price}</p>
              <p>{product.description}</p>
              <button className="btn btn-primary" onClick={() => addToCart(product)}>
                Add to Cart {getCartQuantity(product._id) > 0 && `(${getCartQuantity(product._id)})`}
              </button>
            </div>
          </div>
        ))}
      </div>
      <br /><br />
    </div>
  );
}

export default Product;