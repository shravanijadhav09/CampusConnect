import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

function Landing() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Hackathon",
      description:
        "Build innovative solutions and compete with talented students.",
      date: "August 25, 2026",
      venue: "Innovation Lab",
      category: "Hackathon",
    },
    {
      id: 2,
      title: "AI Workshop",
      description:
        "Explore the basics of artificial intelligence and modern AI tools.",
      date: "August 28, 2026",
      venue: "Seminar Hall",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Coding Contest",
      description:
        "Challenge yourself and test your problem-solving skills.",
      date: "September 2, 2026",
      venue: "Computer Lab",
      category: "Competition",
    },
  ];

  return (
    <main>
      {/* Hero */}

      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            🎓 Made for students
          </span>

          <h1>
            Your Campus.
            <br />
            <span>Your Community.</span>
            <br />
            Your Events.
          </h1>

          <p>
            Discover workshops, hackathons, competitions,
            clubs and exciting events happening around your campus.
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
          <div className="hero-card">
            <span>✨</span>
            <h3>Something exciting is happening!</h3>
            <p>Find your next campus experience.</p>
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
              Easily find workshops, hackathons,
              competitions and activities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Stay Updated</h3>
            <p>
              Never miss an exciting event happening
              on your campus.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Connect</h3>
            <p>
              Meet students, discover communities and
              participate together.
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

        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
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
          <p>
            Connecting students with their campus community.
          </p>
        </div>

        <p>© 2026 CampusConnect</p>
      </footer>
    </main>
  );
}

export default Landing;