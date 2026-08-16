import EventCard from "../components/EventCard";

function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Hackathon",
      description: "Build innovative solutions with your team.",
      date: "August 25, 2026",
      venue: "Innovation Lab",
    },
    {
      id: 2,
      title: "AI Workshop",
      description: "Learn the basics of modern AI technologies.",
      date: "August 28, 2026",
      venue: "Seminar Hall",
    },
    {
      id: 3,
      title: "Coding Contest",
      description: "Test your problem-solving and coding skills.",
      date: "September 2, 2026",
      venue: "Computer Lab",
    },
  ];

  return (
    <div>
      <h1>Campus Events</h1>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default Events;