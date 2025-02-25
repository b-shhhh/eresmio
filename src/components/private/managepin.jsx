// src/components/ManagePin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/managepin.css';

const ManagePin = () => {
    const [pins, setPins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPins = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/pins', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPins(response.data);
            } catch (error) {
                console.error("Error fetching pins:", error.response?.data.error);
            }
        };

        fetchPins();
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/pins/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setPins(pins.filter(pin => pin.id !== id));
        } catch (error) {
            console.error("Error deleting pin:", error.response?.data.error);
        }
    };

    return (
        <div className="manage-pins-container">
            <h1>Manage Your Pins</h1>
            <div className="pins-list">
                {pins.length === 0 ? (
                    <p>No pins available. Please add some pins.</p>
                ) : (
                    pins.map(pin => (
                        <div key={pin.id} className="pin-card">
                            <img src={pin.image_url} alt={pin.description} />
                            <h3>{pin.title}</h3>
                            <p>{pin.description}</p>
                            <button onClick={() => handleDelete(pin.id)}>Delete</button>
                            <button onClick={() => navigate(`/edit-pin/${pin.id}`)}>Edit</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManagePin;