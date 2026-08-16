import pool from "../config/db.js";

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check whether event exists
    const event = await pool.query(
      "SELECT id FROM events WHERE id = $1",
      [eventId]
    );

    if (event.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check if user already registered
    const existingRegistration = await pool.query(
      `SELECT id FROM registrations
       WHERE user_id = $1 AND event_id = $2`,
      [userId, eventId]
    );

    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    // Register user
    const result = await pool.query(
      `INSERT INTO registrations (user_id, event_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, eventId]
    );

    res.status(201).json({
      message: "Registered successfully",
      registration: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Failed to register for event",
    });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
        r.id AS registration_id,
        e.id AS event_id,
        e.title,
        e.description,
        e.date,
        e.venue,
        e.category,
        r.registered_at
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = $1
       ORDER BY e.date ASC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("My registrations error:", error);

    res.status(500).json({
      message: "Failed to fetch registrations",
    });
  }
};