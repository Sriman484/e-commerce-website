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
    window.print(); // Print the receipt
  };

  return (
    <div className="container mt-5 text-center p-5">
      <h2>Payment Page</h2>
      <p className="fw-bold">Total Amount: ₹{totalAmount.toFixed(2)}</p>

      <h4>Select Payment Method</h4>
      <select
        className="form-select w-50 mx-auto mb-3"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="UPI">UPI</option>
        <option value="Net Banking">Net Banking</option>
        <option value="Card">Debit/Credit Card</option>
      </select>

      {paymentMethod === "UPI" && <input type="text" className="form-control w-50 mx-auto mb-3" placeholder="Enter UPI ID" />}
      {paymentMethod === "Net Banking" && <input type="text" className="form-control w-50 mx-auto mb-3" placeholder="Enter Bank Name" />}
      {paymentMethod === "Card" && (
        <>
          <input type="text" className="form-control w-50 mx-auto mb-2" placeholder="Card Number" />
          <input type="text" className="form-control w-50 mx-auto mb-3" placeholder="CVV" />
        </>
      )}

      {!paymentSuccess ? (
        <button className="btn btn-success" onClick={handlePayment}>Pay Now</button>
      ) : (
        <div className="mt-4 p-3 border border-success rounded bg-light">
          <h4 className="text-success">Payment Successful!</h4>
          <p>Transaction ID: #{Math.floor(Math.random() * 100000000)}</p>
          <p>Amount Paid: ₹{totalAmount.toFixed(2)}</p>
          <button className="btn btn-primary" onClick={handlePrint}>Print Receipt</button>
        </div>
      )}
    </div>
  );
}

export default Payment;