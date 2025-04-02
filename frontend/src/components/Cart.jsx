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
      <h2 className="text-center">Shopping Cart</h2>
      <br />
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-md-4 mb-3">
                <div className="card p-3">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{
                      width: "500px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <h4 className="mt-2">{item.name}</h4>
                  <p className="fw-bold">Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="fw-bold">
                    Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove One
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            <button
              className="btn btn-success mt-2"
              onClick={() => navigate("/payment", { state: { totalAmount } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default Cart;
