import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Import the User icon from lucide-react
import "../css/dashheader.css";

const DashHeader = ({ avatar, name }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const handleManagePins = () => {
    navigate("/managepin");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic (e.g., clearing tokens) here
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <img src="/resources/Eresmio.png" alt="Logo" />
      </div>
      <div className="header-actions">
        <button
          className="add-post-btn"
          onClick={() => navigate("/addpost")}
        >
          Add Post
        </button>
        <div className="profile-dropdown">
          <div className="profile-icon" onClick={toggleDropdown}>
            {avatar ? (
              <img src={avatar} alt="Profile Icon" className="header-avatar" />
            ) : (
              // Use the Lucide User icon if no avatar is provided
              <User size={40} color="#ffff" />
            )}
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleProfile}>Profile</button>
              <button onClick={handleManagePins}>Manage Pin</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
