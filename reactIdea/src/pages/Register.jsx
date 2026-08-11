import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../api/auth';
import '../style/theme.css'; // Importing your nature theme

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await registerUser({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username or email may already be taken.');
    }
  };

  return (
    <div className="nature-auth-wrapper">
      <div className="nature-auth-card">
        {/* Consistent Logo Icon from your theme */}
        <div className="auth-circle-icon">✨</div>
        
        <h1 className="auth-title">Join IdeaHub</h1>
        <p className="auth-subtitle">Start your creative journey today</p>

        <form onSubmit={handleSubmit} className="nature-form">
          <div className="nature-input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. creative_mind"
              required
            />
          </div>

          <div className="nature-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="nature-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="nature-input-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="nature-error-message">{error}</div>}

          <button className="btn-auth-pill" type="submit">Create Account</button>
        </form>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <button className="btn-google-outline">
          <span className="g-icon">G</span> Sign up with Google
        </button>

        <p className="nature-auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;