import React from "react";

function Helpdesk() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-3">Helpdesk</h2>
        <p className="text-center text-muted mb-4">
          Have any questions or issues? Fill out the form below, and we'll get back to you soon.
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea className="form-control" rows="4" placeholder="Describe your issue..." required></textarea>
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