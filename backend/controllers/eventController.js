import pool from "../config/db.js";

export const getEvents = async (req, res) => {
  console.log("GET /api/events reached");

  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY date ASC"
    );

    console.log("Query result:", result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error("DATABASE ERROR");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Detail:", error.detail);

    res.status(500).json({
      message: error.message,
      code: error.code,
      detail: error.detail,
    });
  }
};