import React, { useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

function Helpdesk() {
  const { darkMode } = useDarkMode();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? 'text-white' : ''}`}>
      <div className={`card p-4 w-100 ${darkMode ? 'bg-dark border-secondary' : ''}`} style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-3">Helpdesk</h2>
        <p className={`text-center ${darkMode ? 'text-light' : 'text-muted'} mb-4`}>
          Have any questions or issues? Fill out the form below, and we'll get back to you soon.
        </p>

        {submitted && (
          <div className="alert alert-success" role="alert">
            Thank you! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              placeholder="Enter your name" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea 
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              rows="4" 
              placeholder="Describe your issue..." 
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Helpdesk;