
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your registrations.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/registrations/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRegistrations(response.data);
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load registrations."
        );
      } finally {
        setLoading(false);
      }
    };

    const saved = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    setSavedEvents(saved);
    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-section">
          <p>Loading your registrations...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-section">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span>Student Dashboard</span>

          <h1>My Dashboard</h1>

          <p>Welcome back 👋</p>
        </div>

        <Link to="/events" className="primary-button">
          Explore Events
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>📅</span>
          <strong>{registrations.length}</strong>
          <p>Registered Events</p>
        </div>

        <div className="stat-card">
          <span>⭐</span>
          <strong>{savedEvents.length}</strong>
          <p>Saved Events</p>
        </div>

        <div className="stat-card">
          <span>🚀</span>
          <strong>Active</strong>
          <p>Stay Connected</p>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>My Registered Events</h2>

        {registrations.length === 0 ? (
          <div className="empty-dashboard">
            <span>📅</span>

            <h3>No registered events yet</h3>

            <p>
              Discover upcoming events and register for
              something interesting.
            </p>

            <Link to="/events" className="primary-button">
              Explore Events
            </Link>
          </div>
        ) : (
          registrations.map((registration) => (
            <div
              className="dashboard-event"
              key={registration.registration_id}
            >
              <div>
                <span className="event-category">
                  {registration.category}
                </span>

                <h3>{registration.title}</h3>

                <p>{registration.description}</p>

                <p>
                  📅{" "}
                  {new Date(
                    registration.date
                  ).toLocaleDateString()}
                </p>

                <p>📍 {registration.venue}</p>
              </div>

              <Link
                to={`/events/${registration.event_id}`}
                className="secondary-button"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </section>

      <section className="dashboard-section dashboard-saved-section">
        <h2>Saved Events</h2>

        {savedEvents.length === 0 ? (
          <div className="empty-dashboard">
            <span>⭐</span>

            <h3>No saved events yet</h3>

            <p>
              Save the events you like and revisit them later.
            </p>
          </div>
        ) : (
          <div className="saved-event-list">
            {savedEvents.map((eventId) => (
              <div className="saved-event-item" key={eventId}>
                <div>
                  <span className="event-category">Saved</span>
                  <h3>Event #{eventId}</h3>
                </div>

                <Link to={`/events/${eventId}`} className="secondary-button">
                  Open
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;

