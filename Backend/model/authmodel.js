// models/authmodel.js
import pool from "../db.js";

// Create a new user and return the created row
export const createUser = async (username, email, hashedPassword, contactNumber, gender) => {
  const query = `
    INSERT INTO users (username, email, password, contact_number, gender)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [username, email, hashedPassword, contactNumber, gender];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find a user by email
export const findEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
