// src/components/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[@$!%*?&#]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword();
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      console.log("Response:", response); // Log the response for debugging

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);

        // Redirect to dashboard on successful signup
        navigate("/dashboard");
      } else {
        setErrors({ general: response.data.error || "An unexpected error occurred." });
      }
    } catch (err) {
      console.error("Error during signup:", err.response ? err.response.data : err.message); // Log the error response
      setErrors({ general: err.response?.data?.error || "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errors.general && <p className="error">{errors.general}</p>}
          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;