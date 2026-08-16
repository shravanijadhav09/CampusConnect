import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span>Join the community 🎓</span>

          <h1>Create your account</h1>

          <p>
            Start discovering everything happening on your campus.
          </p>
        </div>

        <form>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit" className="primary-button full">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;