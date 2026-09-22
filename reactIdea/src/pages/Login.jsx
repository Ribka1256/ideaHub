import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../style/loginReg.css'; 

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
    <div className="auth-page-wrapper">
      <div className="auth-card">
        
        {/* LEFT SIDE: Visual Content */}
        <div className="auth-visual-side">
          <div className="visual-content">
            <h1 className="welcome-text">Welcome Back<br/>to IdeaHub</h1>
            <p className="welcome-subtext">Continue your creative journey</p>
          </div>
        </div>

        {/* RIGHT SIDE: Warm Form Side */}
        <div className="auth-form-side">
          <h2 className="auth-header">Sign in</h2>
          <p className="auth-subtitle">Access your account to continue your creative journey</p>

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

            {error && <div className="nature-error-message">{error}</div>}

            <button className="btn-primary-rust" type="submit">Sign in</button>
          </form>

          <div className="auth-divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          <p className="nature-auth-footer">
            Don't have an account? <Link to="/register" className="footer-link">Join Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;