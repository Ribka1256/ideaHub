import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../style/theme.css'; // Ensure this matches your CSS filename

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="nature-auth-wrapper">
      <div className="nature-auth-card">
        {/* The Icon Circle from the grid cards */}
        <div className="auth-circle-icon">🌿</div>
        
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Continue your creative journey</p>

        <form onSubmit={handleSubmit} className="nature-form">
          <div className="nature-input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="nature-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="auth-extras">
             <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
          </div>

          {error && <div className="nature-error-message">{error}</div>}

          <button className="btn-auth-pill" type="submit">Sign In</button>
        </form>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <button className="btn-google-outline">
          <span className="g-icon">G</span> Sign in with Google
        </button>

        <p className="nature-auth-footer">
          Don't have an account? <Link to="/register">Join Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;