import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "../css/profile.css";

const UserProfile = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("created");
    const navigate = useNavigate();

    // Fetch user data when the component mounts
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId"); // Ensure this is correctly saved

            // Check if userId is available
            if (!userId) {
                throw new Error("User ID not found. Please log in again.");
            }

            const response = await axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { username, name } = response.data; // Adjust according to your API response structure
            setName(name);
            setUsername(username);
        } catch (error) {
            console.error("Error fetching user data:", error.response ? error.response.data : error);
            // Optionally, you can navigate back to the login page if the user ID is not found
            if (error.message === "User ID not found. Please log in again.") {
                navigate("/login");
            }
        }
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId"); // Get the userId from localStorage

            if (!userId) {
                throw new Error("User ID not found. Please log in again.");
            }

            await axios.put(`http://localhost:3000/api/users/profile/${userId}`, {
                username,
                name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePostClick = () => {
        navigate("/addpost");
    };

    useEffect(() => {
        fetchUserData(); // Fetch user data when component mounts
    }, []);

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="avatar-container">
                    <div className="header-avatar-initial">
                        {name.charAt(0).toUpperCase()}
                    </div>
                </div>
                {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="edit-profile-form">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="edit-name-input"
                        />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="edit-username-input"
                        />
                        <button type="submit" className="save-btn">
                            Save
                        </button>
                    </form>
                ) : (
                    <>
                        <h1 className="profile-name">{name}</h1>
                        <p className="profile-username">{username}</p>
                    </>
                )}
            </div>

            {/* Profile Actions */}
            <div className="profile-actions">
                <button className="edit-btn" onClick={handleEditProfile}>
                    {isEditing ? "Cancel" : "Edit profile"}
                </button>
            </div>

            {/* Profile Tabs */}
            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === "created" ? "active" : ""}`}
                    onClick={() => handleTabClick("created")}
                >
                    Posted
                </button>
            </div>

            {/* Content Section */}
            <div className="profile-content">
                {activeTab === "created" && (
                    <div className="created-content">
                        <p>Nothing to show—yet. Photos you post will live here.</p>
                        <button className="post-btn" onClick={handlePostClick}>
                            Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;