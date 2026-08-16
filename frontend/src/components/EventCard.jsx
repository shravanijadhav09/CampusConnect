import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div>
      <h2>{event.title}</h2>

      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Venue: {event.venue}</p>

      <Link to={`/events/${event.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default EventCard;