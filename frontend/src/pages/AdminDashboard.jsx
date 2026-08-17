
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events"
      );

      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/registrations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch registrations:",
        error
      );
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const handleEdit = (event) => {
    setEditingEvent(event);

    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 16),
      venue: event.venue,
      category: event.category,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      if (editingEvent) {
        const response = await axios.put(
          `http://localhost:5000/api/admin/events/${editingEvent.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
        setEditingEvent(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/admin/events",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        venue: "",
        category: "",
      });

      fetchEvents();
    } catch (error) {
      console.error("Event operation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to process event."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/admin/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      setEvents(
        events.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error("Delete event error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete event."
      );
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-card">
        <h1>Admin Dashboard 👑</h1>

        <p>
          {editingEvent
            ? "Update the event details."
            : "Create a new campus event."}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Event Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          />

          <label>Date</label>

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Venue</label>

          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter venue"
            required
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Workshop, Hackathon, Seminar..."
            required
          />

          {message && <p>{message}</p>}

          {error && <p>{error}</p>}

          <button
            type="submit"
            className="primary-button"
          >
            {editingEvent
              ? "Update Event"
              : "Create Event"}
          </button>

          {editingEvent && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditingEvent(null);

                setFormData({
                  title: "",
                  description: "",
                  date: "",
                  venue: "",
                  category: "",
                });

                setMessage("");
                setError("");
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <section className="manage-events">
          <h2>Manage Events</h2>

          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <div
                className="admin-event-card"
                key={event.id}
              >
                <div>
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <p>
                    📅{" "}
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </p>

                  <p>📍 {event.venue}</p>

                  <p>🏷️ {event.category}</p>
                </div>

                <div className="admin-event-actions">
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEdit(event)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(event.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      <section className="manage-registrations">
        <h2>Manage Registrations</h2>

        {registrations.length === 0 ? (
          <p>No registrations available.</p>
        ) : (
          registrations.map((registration) => (
            <div
              className="registration-card"
              key={registration.registration_id}
            >
              <h3>{registration.event_title}</h3>

              <p>👤 {registration.name}</p>

              <p>✉️ {registration.email}</p>

              <p>
                📅 Registered:{" "}
                {new Date(
                  registration.registered_at
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
