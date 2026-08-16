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

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the event id :", id);
    const result = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("EVENT BY ID ERROR:", error.message);
    console.error("CODE:", error.code);
    console.error("DETAIL:", error.detail);

    res.status(500).json({
      message: error.message,
      code: error.code,
      detail: error.detail,
    });
  }
};