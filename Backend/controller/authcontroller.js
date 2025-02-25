import pool from '../config/db.js'; // Ensure this path is correct
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User signup
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check if the user already exists
        const existingUser  = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser .rows.length > 0) {
            return res.status(400).json({ error: "User  already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser  = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        // Respond with the new user data (excluding password)
        const { password: _, ...userData } = newUser .rows[0]; // Exclude password from response
        res.status(201).json(userData);
    } catch (err) {
        console.error("Error during registration:", err.message); // Log the error
        res.status(500).json({ error: err.message });
    }
};

// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(400).json({ error: 'User  not found' });

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Error during login:", err.message); // Log the error
        res.status(500).json({ error: err.message });
    }
};