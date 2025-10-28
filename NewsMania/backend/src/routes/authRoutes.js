import express from "express";
import bcrypt from "bcryptjs"; // used for hashing passwords securely
import { createTables } from "../createTable.js";
import pool from "../pool.js"; // import the Postgres pool
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();
dotenv.config();

createTables();
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // Result looks like this
    //     result = {
    //   command: "INSERT",
    //   rowCount: 1,
    //   oid: 12345,
    //   rows: [
    //     {
    //       id: 1,
    //       username: "aayush",
    //       email: "aayush@example.com",
    //       password: "$2a$10$hashedpasswordhere"
    //     }
    //   ]
    // }

    const user = result.rows[0];

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // keep secret in .env
      { expiresIn: "1h" }
    );

    // 4. Send token + user back
    // res.status(201).json({ user, token });  // we dont send user directly bcz it includes hashed password which we dont want to send to client.
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      res.status(400).json({ error: "Email already exists, try to login." });
    } else {
      res.status(500).json({ error: "Database error" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 1. Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    //register nagari login gare
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "User not found, please register first." });
    }

    const user = result.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password); // even though user.password is hashed it can be compared using bcrypt.compare
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Send token + user info
    res.json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
