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

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
    } = req.body;

    if (!title || !description || !date || !venue || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO events
       (title, description, date, venue, category, organizer_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        description,
        date,
        venue,
        category,
        req.user.id,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      message: "Failed to delete event",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      date,
      venue,
      category,
    } = req.body;

    if (!title || !description || !date || !venue || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `UPDATE events
       SET title = $1,
           description = $2,
           date = $3,
           venue = $4,
           category = $5
       WHERE id = $6
       RETURNING *`,
      [
        title,
        description,
        date,
        venue,
        category,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event updated successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
};