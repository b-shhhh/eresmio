import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/header.css";

function Header() {
  const navigate = useNavigate(); // Initialize navigation

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the Landing Page
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src="/resources/Eresmio.png" alt="Logo" />
      </div>
      <div className="auth-links">
        <Link to="/login" className="login-link-head">
          Login
        </Link>
        <Link to="/signup" className="signup-link-head">
          SignUp
        </Link>
      </div>
    </header>
  );
}

export default Header;


