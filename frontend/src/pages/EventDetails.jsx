import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${id}`
        );

        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <h1>Loading event...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="event-card">
        <h1>{event.title}</h1>

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

        <Link to="/events" className="event-button">
          Back to Events
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;