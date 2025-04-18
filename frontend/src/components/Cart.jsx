import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center fs-5">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
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
                      onClick={() => removeFromCart(item._id)}
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
    </div>
  );
}

export default Cart;