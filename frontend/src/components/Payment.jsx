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
    <>
    <div className="container mt-5 p-4 text-center bg-white shadow rounded" style={{ maxWidth: "600px" }}>
      <h2 className="text-primary">Payment Page</h2>
      <p className="fw-bold text-dark fs-5">Total Amount: <span className="text-success">₹{totalAmount.toFixed(2)}</span></p>

      <h4 className="text-secondary mt-3">Select Payment Method</h4>
      <select
        className="form-select w-75 mx-auto mt-2 mb-3"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="UPI">UPI</option>
        <option value="Net Banking">Net Banking</option>
        <option value="Card">Debit/Credit Card</option>
      </select>

      <div className="w-75 mx-auto">
        {paymentMethod === "UPI" && <input type="text" className="form-control mb-3" placeholder="Enter UPI ID" />}
        {paymentMethod === "Net Banking" && <input type="text" className="form-control mb-3" placeholder="Enter Bank Name" />}
        {paymentMethod === "Card" && (
          <>
            <input type="text" className="form-control mb-2" placeholder="Card Number" />
            <input type="text" className="form-control mb-3" placeholder="CVV" />
          </>
        )}
      </div>

      {!paymentSuccess ? (
        <button className="btn btn-lg btn-success w-75" onClick={handlePayment}>Pay Now</button>
      ) : (
        <div className="mt-4 p-3 border border-success rounded bg-light">
          <h4 className="text-success">Payment Successful!</h4>
          <p className="fw-bold">Transaction ID: <span className="text-dark">#{Math.floor(Math.random() * 100000000)}</span></p>
          <p className="fw-bold">Amount Paid: <span className="text-success">₹{totalAmount.toFixed(2)}</span></p>
          <button className="btn btn-primary w-50" onClick={handlePrint}>Print Receipt</button>
        </div>
      )}
    </div>
    <br /><br /><br />
    </>
  );
}

export default Payment;