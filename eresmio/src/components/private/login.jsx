// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import axios from 'axios';
import '../css/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your login endpoint
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password,
            });
            console.log("Login successful:", response.data);
            
            // Save the token and userId in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Save the userId as well
            
            navigate("/dashboard");  // Redirect after successful login
        } catch (error) {
            console.error("Login error:", error.response?.data.error);
            setPasswordError(error.response?.data.error || "Login failed.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form-box">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="login-input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Email"
                            />
                        </div>

                        <div className="login-input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="login-show-password-btn"
                                aria-label="Toggle password visibility"
                            >
                                {passwordVisible ? 'Hide' : 'Show'} Password
                            </button>
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>

                        <div className="login-input-group">
                            <button type="submit" className="login-btn">Login</button>
                        </div>

                        <div className="login-signup-link">
                            <p>New here? <Link to="/signup">Signup here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;