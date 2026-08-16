import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-category">
        {event.category}
      </div>

      <h3>{event.title}</h3>

      <p className="event-description">
        {event.description}
      </p>

      <div className="event-info">
        <p>📅 {event.date}</p>
        <p>📍 {event.venue}</p>
      </div>

      <Link
        to={`/events/${event.id}`}
        className="event-button"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;