import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span>Welcome back 👋</span>

          <h1>Login to CampusConnect</h1>

          <p>
            Continue discovering what's happening on campus.
          </p>
        </div>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit" className="primary-button full">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;