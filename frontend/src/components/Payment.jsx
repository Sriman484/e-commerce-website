import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const totalAmount = location.state?.totalAmount || 0;
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setPaymentSuccess(true);
    // Save order to localStorage
    const username = localStorage.getItem('username');
    if (username) {
      const orders = JSON.parse(localStorage.getItem(`orders_${username}`) || '[]');
      orders.push({
        id: Date.now(),
        items: [],
        total: totalAmount,
        date: new Date().toISOString()
      });
      localStorage.setItem(`orders_${username}`, JSON.stringify(orders));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? 'text-white' : ''}`}>
      <div className={`shadow p-4 rounded w-100 ${darkMode ? 'bg-dark border border-secondary' : 'bg-white'}`} style={{ maxWidth: "600px" }}>
        <h2 className={`${darkMode ? 'text-light' : 'text-primary'} text-center`}>Payment Page</h2>
        <p className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'} text-center fs-5`}>
          Total Amount: <span className="text-success">₹{totalAmount.toFixed(2)}</span>
        </p>

        <h5 className={`${darkMode ? 'text-light' : 'text-secondary'} text-center mt-3`}>Select Payment Method</h5>
        <div className="mb-3">
          <select
            className={`form-select ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Card">Debit/Credit Card</option>
          </select>
        </div>

        <div>
          {paymentMethod === "UPI" && (
            <input
              type="text"
              className={`form-control mb-3 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              placeholder="Enter UPI ID"
            />
          )}
          {paymentMethod === "Net Banking" && (
            <input
              type="text"
              className={`form-control mb-3 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              placeholder="Enter Bank Name"
            />
          )}
          {paymentMethod === "Card" && (
            <>
              <input
                type="text"
                className={`form-control mb-2 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                placeholder="Card Number"
              />
              <input
                type="text"
                className={`form-control mb-3 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                placeholder="CVV"
              />
            </>
          )}
        </div>

        {!paymentSuccess ? (
          <button className="btn btn-success w-100" onClick={handlePayment}>
            Pay Now
          </button>
        ) : (
          <div className={`mt-4 p-3 border border-success rounded text-center ${darkMode ? 'bg-dark' : 'bg-light'}`}>
            <h4 className="text-success">Payment Successful! ✅</h4>
            <p className="fw-bold">
              Transaction ID:{" "}
              <span className={darkMode ? 'text-light' : 'text-dark'}>
                #{Math.floor(Math.random() * 100000000)}
              </span>
            </p>
            <p className="fw-bold">
              Amount Paid:{" "}
              <span className="text-success">₹{totalAmount.toFixed(2)}</span>
            </p>
            <div className="d-flex gap-2 justify-content-center mt-3">
              <button className="btn btn-primary" onClick={handlePrint}>
                Print Receipt
              </button>
              <button className="btn btn-outline-primary" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;