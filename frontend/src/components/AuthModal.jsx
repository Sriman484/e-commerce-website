import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function AuthModal({ isOpen, onClose }) {
  const { darkMode } = useDarkMode();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/users?username=${formData.username}&password=${formData.password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        alert("Login Successful! ✅");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", formData.username);
        onClose();
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("Signup Successful! ✅");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", formData.username);
        onClose();
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${darkMode ? 'bg-dark text-white' : ''}`}>
          <div className="modal-header border-0 pb-0">
            <h2 className="modal-title w-100 text-center">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-4 pb-4">
            <div className="d-flex justify-content-center mb-3">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${isLogin ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`btn ${!isLogin ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={isLogin ? handleLogin : handleSignup}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                style={{ fontSize: "1.1rem", padding: "0.75rem" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={onClose}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

