import { useAuth } from '../context/AuthContext';
import '../style/theme.css';
import { useNavigate, NavLink, Link } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <header className="nature-nav">
      <div className="nav-container">
        {/* Brand Logo - Playfair Display Serif */}
        <Link to="/home" className="nav-brand">
          IdeaHub
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/eventlist" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Events
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Dashboard
          </NavLink>
          <NavLink to="/ideas/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Create
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Profile
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="nav-user">
          {user ? (
            <div className="user-controls">
              <span className="user-greeting">Hi, <strong>{user.username}</strong></span>
              <button className="btn-logout-pill" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login-pill">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;