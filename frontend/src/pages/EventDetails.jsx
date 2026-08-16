import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  const events = {
    1: {
      title: "Tech Hackathon",
      category: "Hackathon",
      description:
        "A hands-on hackathon where students can build innovative solutions, work in teams and solve real-world problems.",
      date: "August 25, 2026",
      venue: "Innovation Lab",
      organizer: "Tech Club",
    },

    2: {
      title: "AI Workshop",
      category: "Workshop",
      description:
        "An introductory workshop covering artificial intelligence concepts and modern AI tools.",
      date: "August 28, 2026",
      venue: "Seminar Hall",
      organizer: "AI Club",
    },

    3: {
      title: "Coding Contest",
      category: "Competition",
      description:
        "Put your coding and problem-solving skills to the test in this exciting competition.",
      date: "September 2, 2026",
      venue: "Computer Lab",
      organizer: "Coding Club",
    },
  };

  const event = events[id];

  if (!event) {
    return (
      <main className="page">
        <h1>Event not found</h1>

        <Link to="/events" className="primary-button">
          Back to Events
        </Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <div className="details-card">
        <span className="event-category">
          {event.category}
        </span>

        <h1>{event.title}</h1>

        <p className="details-description">
          {event.description}
        </p>

        <div className="details-info">
          <div>
            <span>📅 Date</span>
            <strong>{event.date}</strong>
          </div>

          <div>
            <span>📍 Venue</span>
            <strong>{event.venue}</strong>
          </div>

          <div>
            <span>👤 Organizer</span>
            <strong>{event.organizer}</strong>
          </div>
        </div>

        <button className="primary-button">
          Register for Event
        </button>
      </div>
    </main>
  );
}

export default EventDetails;