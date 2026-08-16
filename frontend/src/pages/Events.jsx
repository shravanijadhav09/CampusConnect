import EventCard from "../components/EventCard";

function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Hackathon",
      description:
        "Build innovative solutions with your team.",
      date: "August 25, 2026",
      venue: "Innovation Lab",
      category: "Hackathon",
    },
    {
      id: 2,
      title: "AI Workshop",
      description:
        "Learn the basics of modern AI technologies.",
      date: "August 28, 2026",
      venue: "Seminar Hall",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Coding Contest",
      description:
        "Test your problem-solving and coding skills.",
      date: "September 2, 2026",
      venue: "Computer Lab",
      category: "Competition",
    },
    {
      id: 4,
      title: "Design Meetup",
      description:
        "Meet creative students and explore UI/UX design.",
      date: "September 5, 2026",
      venue: "Design Studio",
      category: "Meetup",
    },
  ];

  return (
    <main className="page">
      <div className="page-heading">
        <span>Discover</span>
        <h1>Campus Events</h1>
        <p>
          Find something interesting happening around your campus.
        </p>
      </div>

      <div className="filter-row">
        <button className="filter active">All</button>
        <button className="filter">Hackathons</button>
        <button className="filter">Workshops</button>
        <button className="filter">Competitions</button>
        <button className="filter">Meetups</button>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Events;