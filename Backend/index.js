import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authroutes.js';
import pinRoutes from './routes/pinroutes.js';
import userRoutes from './routes/userroutes.js';
import dotenv from 'dotenv';
import path from 'path';
import errorHandler from './middleware/authmiddleware.js';

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // if you need to allow cookies
}));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/pins', pinRoutes);
app.use('/api/users', userRoutes);

// Static file serving for uploads
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get the directory name
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});