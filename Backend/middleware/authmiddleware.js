import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

 export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        req.user = decoded; // Store user info in request for later use
        next(); // Proceed to the next middleware or route handler
    });
    
    const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default verifyToken; // Default export