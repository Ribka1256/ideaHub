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
        {/* Brand Logo */}
        <Link to="/home" className="nav-brand">
          IdeaHub
        </Link>

        {/* Navigation Links - Order and Naming matched to image */}
        <nav className="nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            HOME
          </NavLink>
          <NavLink to="/idealist" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            IDEAS
          </NavLink>
          <NavLink to="/ideas/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            CREATE
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            DASHBOARD
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            PROFILE
          </NavLink>
          <NavLink to="/incomingRequest" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            PERMISSIONS
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="nav-user">
          {user ? (
            <div className="user-controls">
              <span className="user-greeting">Hi, {user.username}</span>
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