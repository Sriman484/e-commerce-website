import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function Cart({ cartItems, removeFromCart, showToast }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast('Item removed from cart', 'info');
  };

  return (
    <div className={`container mt-5 ${darkMode ? 'text-white' : ''}`}>
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5 mb-4">Your cart is empty.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className={`card h-100 shadow-sm ${darkMode ? 'bg-dark border-secondary' : ''}`}>
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/products/${item.id}`)}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text fw-bold">Price: ₹{item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text fw-bold">
                      Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove One
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            <button
              className="btn btn-success mt-3 px-4 py-2"
              onClick={() => navigate("/payment", { state: { totalAmount } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <br />
      <br />
    </div>
  );
}

export default Cart;