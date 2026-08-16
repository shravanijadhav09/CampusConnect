import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CampusConnect
      </Link>

      <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>

        <Link to="/register" className="nav-register">
          Join Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;