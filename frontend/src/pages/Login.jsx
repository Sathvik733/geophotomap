import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  };

  return (
    <div className="auth-page premium-auth">
      <div className="auth-hero">
        <div className="glass-card">
          <span className="brand-badge">GeoPhotoMap</span>
          <h1>Turn your photos into a living map.</h1>
          <p>
            Upload geotagged pictures, explore memories by location, and
            collaborate through comments.
          </p>

          <div className="feature-list">
            <span>Interactive map</span>
            <span>Photo uploads</span>
            <span>Comments</span>
            <span>AI-ready descriptions</span>
          </div>
        </div>
      </div>

      <form className="auth-card premium-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Login to continue exploring your map.</p>

        <label>Email</label>
        <input
          placeholder="Enter your email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Login</button>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;