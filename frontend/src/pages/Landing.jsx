import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";

function Landing() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");

        const today = new Date();

        const upcoming = response.data
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);

        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Failed to fetch upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🎓 Made for students</span>

          <h1>
            Your Campus.
            <br />
            <span>Your Community.</span>
            <br />
            Your Events.
          </h1>

          <p>
            Discover workshops, hackathons, competitions, clubs and exciting
            events happening around your campus.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-button">
              Explore Events
            </Link>

            <Link to="/register" className="secondary-button">
              Join CampusConnect
            </Link>
          </div>
        </div>

       <div className="hero-visual">
  <div className="hero-card preview-card">
    <div className="card-badge">⚡ Next Up</div>
    {upcomingEvents.length > 0 ? (
      <>
        <span className="card-tag">{upcomingEvents[0].category}</span>
        <h3>{upcomingEvents[0].title}</h3>
        <p className="card-date">
          📅 {new Date(upcomingEvents[0].date).toLocaleDateString()}
        </p>
        <p className="card-venue">📍 {upcomingEvents[0].venue}</p>
      </>
    ) : (
      <>
        <span className="card-tag">Hackathon</span>
        <h3>Annual Tech Clash</h3>
        <p className="card-date">📅 Coming Soon</p>
        <p className="card-venue">📍 Main Auditorium</p>
      </>
    )}
  </div>
</div>
      </section>

      {/* Why CampusConnect */}
      <section className="why-section">
        <div className="section-heading">
          <span>Why CampusConnect?</span>

          <h2>
            Everything happening on campus,
            <br />
            all in one place.
          </h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Discover Events</h3>
            <p>
              Easily find workshops, hackathons, competitions and activities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Stay Updated</h3>
            <p>Never miss an exciting event happening on your campus.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Connect</h3>
            <p>
              Meet students, discover communities and participate together.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <div className="section-heading events-heading">
          <div>
            <span>What's happening?</span>
            <h2>Upcoming Events</h2>
          </div>

          <Link to="/events" className="view-all">
            View all →
          </Link>
        </div>

        {loading ? (
          <p>Loading events...</p>
        ) : upcomingEvents.length === 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id || event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to explore your campus?</h2>

        <p>
          Join CampusConnect and never miss what's happening around you.
        </p>

        <Link to="/register" className="primary-button">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <h3>CampusConnect</h3>
          <p>Connecting students with their campus community.</p>
        </div>

        <p>© 2026 CampusConnect</p>
      </footer>
    </main>
  );
}

export default Landing;