import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <span className="brand-badge">GeoPhotoMap</span>
        <h1>Start building your visual travel map.</h1>
        <p>
          Create an account, upload photos with coordinates, and visualize every
          memory on an interactive map.
        </p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <p className="auth-subtitle">Join and start uploading geotagged photos.</p>

        <input
          placeholder="Full name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email address"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;