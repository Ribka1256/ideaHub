import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
// import { registerUser } from '../api/auth'; 
import '../style/loginReg.css'; 

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { 
      setError("Passwords don't match"); 
      return; 
    }
    try {
      // await registerUser({ username, email, password });
      navigate('/login');
    } catch (err) { 
      setError('Registration failed. Try again.'); 
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Left Side: Visual (Same as Login) */}
        <div className="auth-visual-side">
          <div className="visual-overlay">
            <h1 className="welcome-text">Welcome<br/>to IdeaHub</h1>
            <p className="welcome-subtext">Continue your creative journey</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="form-container">
            <h2 className="auth-header">Join IdeaHub</h2>
            <p className="auth-subtitle">Start your creative journey today</p>

            <form onSubmit={handleSubmit} className="nature-form">
              <div className="nature-input-group">
                <label>Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>

              <div className="nature-input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="nature-input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <div className="nature-input-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>

              {error && <div className="nature-error-message">{error}</div>}
              
              <button className="btn-primary-rust" type="submit">Create Account</button>
            </form>

            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>

            <p className="nature-auth-footer">
              Already have an account? <Link to="/login" className="footer-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;