import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // If you're using a backend logout endpoint (e.g., for session-based auth), call it:
        await axios.post("http://localhost:3000/api/auth/logout");
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear any tokens or user data stored in localStorage
        localStorage.removeItem("token");
        // Redirect to login page after logging out
        navigate("/");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Logging out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default LogoutPage;
