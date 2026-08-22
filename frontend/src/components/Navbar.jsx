import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../image/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="CampusConnect home">
        <img src={logoImage} alt="CampusConnect logo" className="logo-image" />
        <span className="logo-name">CampusConnect</span>
      </Link>

      <div className="nav-links">
        <Link to="/events">Events</Link>

        {token && <Link to="/dashboard">Dashboard</Link>}

        {!token ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register" className="nav-register">
              Join Now
            </Link>
          </>
        ) : (
          <>
            <span className="nav-user">
              Hi, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="nav-logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;