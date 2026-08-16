import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span>Student Dashboard</span>
          <h1>Welcome back! 👋</h1>
          <p>Here's what's happening around your campus.</p>
        </div>

        <Link to="/events" className="primary-button">
          Explore Events
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>📅</span>
          <strong>3</strong>
          <p>Registered Events</p>
        </div>

        <div className="stat-card">
          <span>❤️</span>
          <strong>5</strong>
          <p>Saved Events</p>
        </div>

        <div className="stat-card">
          <span>🎓</span>
          <strong>8</strong>
          <p>Events Attended</p>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <span>Your activity</span>
          <h2>My Upcoming Events</h2>
        </div>

        <div className="dashboard-event">
          <div>
            <span className="event-category">
              Hackathon
            </span>

            <h3>Tech Hackathon</h3>

            <p>📅 August 25, 2026</p>
          </div>

          <Link
            to="/events/1"
            className="secondary-button"
          >
            View
          </Link>
        </div>

        <div className="dashboard-event">
          <div>
            <span className="event-category">
              Workshop
            </span>

            <h3>AI Workshop</h3>

            <p>📅 August 28, 2026</p>
          </div>

          <Link
            to="/events/2"
            className="secondary-button"
          >
            View
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;