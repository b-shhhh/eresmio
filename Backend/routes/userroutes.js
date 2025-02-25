import express from 'express';
import { registerUser, loginUser, editProfile, fetchUsers, fetchUserProfile } from '../controller/usercontroller.js';

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Edit user profile
router.put('/profile/:userId', editProfile);

// Fetch user profile by ID
router.get('/profile/:userId', fetchUserProfile);

// Fetch all users
router.get('/users', fetchUsers);

export default router;