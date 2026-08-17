import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CampusConnect API is running 🚀",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "PostgreSQL connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You are authenticated!",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});