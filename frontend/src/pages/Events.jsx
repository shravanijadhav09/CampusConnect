import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedEvents, setSavedEvents] = useState([]);

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

    const saved = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    setSavedEvents(saved);
    fetchEvents();
  }, []);

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category).filter(Boolean)),
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || event.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const toggleSavedEvent = (eventId) => {
    const current = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    const updated = current.includes(eventId)
      ? current.filter((id) => id !== eventId)
      : [...current, eventId];

    localStorage.setItem("savedEvents", JSON.stringify(updated));
    setSavedEvents(updated);
  };

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
      <div className="page-heading">
        <span>Discover</span>
        <h1>Campus Events</h1>
      </div>

      <div className="search-panel">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by event, venue or category"
          className="search-input"
        />

        <div className="filter-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p>No matching events found.</p>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <span className="event-category">{event.category}</span>

              <h3>{event.title}</h3>

              <p className="event-description">{event.description}</p>

              <div className="event-info">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
              </div>

              <div className="event-actions">
                <Link to={`/events/${event.id}`} className="event-button">
                  View Details
                </Link>

                <button
                  type="button"
                  className={`save-button ${
                    savedEvents.includes(event.id) ? "saved" : ""
                  }`}
                  onClick={() => toggleSavedEvent(event.id)}
                >
                  {savedEvents.includes(event.id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;