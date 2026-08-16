import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events"
        );

        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1>Campus Events</h1>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>Campus Events</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Campus Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Venue:</strong> {event.venue}
            </p>

            <p>
              <strong>Category:</strong> {event.category}
            </p>

                      <Link
            to={`/events/${event.id}`}
            className="event-button"
          >
            View Details
          </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Events;