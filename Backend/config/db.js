 import pkg from "pg";
 const { Pool } = pkg;
 import dotenv from "dotenv";
 dotenv.config();

// // Database configuration using environment variables
 const pool = new Pool({
   user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "eresmio",
  password: process.env.DB_PASSWORD || "Nepal123",
  port: process.env.DB_PORT || 5432,
});

// // Test the database connection and create tables
 pool
  .connect()
 .then(() => {
   console.log("✅ Connected to PostgreSQL database!");
   return createTables(); // Create tables after successful connection
  })
  .catch((err) => {
    console.error("❌ Connection error:", err.stack);
    process.exit(1);
  });

// // Function to create tables
const createTables = async () => {
   try {
//     // Users Table (For Login/Signup)
  await pool.query(`
       CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
     password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);

//     // Profiles Table (User Additional Info)
    await pool.query(`
     CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
         full_name VARCHAR(100),
         bio TEXT,
         profile_picture TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
    `);

//     // Posts Table (User Posts)
   await pool.query(`
       CREATE TABLE IF NOT EXISTS posts (
         id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
         title TEXT NOT NULL,
        description TEXT,
         image_url TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       `);

    console.log("✅ Tables created successfully!");
 } catch (error) {
  console.error("❌ Error creating tables:", error);
  }
};

// // Export pool for potential further use
 export default pool;         