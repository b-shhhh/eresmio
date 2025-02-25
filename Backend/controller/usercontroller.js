import User from '../model/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userId: user.id }); // Include userId in the response
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Edit user profile
export const editProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;

        const [updated] = await User.update(updatedData, {
            where: { id: userId },
        });

        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await User.findByPk(userId);
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch user data
export const fetchUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters
        const user = await User.findByPk(userId); // Find the user by ID

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); // Respond with user data
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};