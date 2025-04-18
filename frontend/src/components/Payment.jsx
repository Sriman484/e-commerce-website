import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-white shadow p-4 rounded w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-primary text-center">Payment Page</h2>
        <p className="fw-bold text-dark text-center fs-5">
          Total Amount: <span className="text-success">₹{totalAmount.toFixed(2)}</span>
        </p>

        <h5 className="text-secondary text-center mt-3">Select Payment Method</h5>
        <div className="mb-3">
          <select
            className="form-select"
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
              className="form-control mb-3"
              placeholder="Enter UPI ID"
            />
          )}
          {paymentMethod === "Net Banking" && (
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Bank Name"
            />
          )}
          {paymentMethod === "Card" && (
            <>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Card Number"
              />
              <input
                type="text"
                className="form-control mb-3"
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
          <div className="mt-4 p-3 border border-success rounded bg-light text-center">
            <h4 className="text-success">Payment Successful!</h4>
            <p className="fw-bold">
              Transaction ID:{" "}
              <span className="text-dark">
                #{Math.floor(Math.random() * 100000000)}
              </span>
            </p>
            <p className="fw-bold">
              Amount Paid:{" "}
              <span className="text-success">₹{totalAmount.toFixed(2)}</span>
            </p>
            <button className="btn btn-primary mt-2" onClick={handlePrint}>
              Print Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;