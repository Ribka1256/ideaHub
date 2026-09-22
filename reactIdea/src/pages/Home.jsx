import '../style/theme.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getIdeas, getFeaturedIdea } from '../api/ideas';
import { useAuth } from '../context/AuthContext';
// Import the specific icons from the Hi2 (Heroicons) set
import { 
  HiLink, 
  HiShieldCheck, 
  HiDocumentText, 
  HiChatBubbleOvalLeftEllipsis 
} from "react-icons/hi2";

function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    getFeaturedIdea()
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error('Failed to load featured visions:', err));
  }, []);

  return (
    <div className="app-home">
      {/* 1. Floating Pill Navbar (Matching the Photo) */}
      <nav className="nature-nav">
        <div className="nav-container">
          <Link to="/" className="nav-brand">IdeaHub</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link active">HOME</Link>
            <Link to="/ideas" className="nav-link">IDEAS</Link>
            <Link to="/create" className="nav-link">CREATE</Link>
            <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
            <Link to="/profile" className="nav-link">PROFILE</Link>
            <Link to="/permissions" className="nav-link">PERMISSIONS</Link>
          </div>
          <div className="nav-user">
            <span className="user-greeting">Hi, {user?.username || 'creator'}</span>
            <button onClick={logout} className="btn-logout-pill">Logout</button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="hero-split">
        <div className="hero-content">
          <span className="hero-eyebrow">INNOVATION MEETS SECURITY, CREATE</span>
          <h1> Share your idea.<br/> Protect your work.</h1>
          <p>Post a public summary, keep your full pitch private until you approve who sees it.</p>
          <button className="btn-pill" onClick={() => navigate('/ideas/create')}>Create Ideas</button>
        </div>
      </header>

      {/* 3. Feature Bar Layer with React Icons */}
      <section className="feature-container">
        <div className="feature-bar">
          <div className="feature-col">
            <div className="feature-icon">
              <HiLink style={{ color: '#B8B0D3' }} /> 
            </div>
            <h4>Share your idea</h4>
            <p>post a title, summary, and category that anyone can browse.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">
              <HiShieldCheck style={{ color: '#4FA5FF' }} />
            </div>
            <h4>Protect your work</h4>
            <p>the full document stays private by default.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">
              <HiDocumentText style={{ color: '#D4D0E5' }} />
            </div>
            <h4>Approve access</h4>
            <p>review requests and decide who sees the full pitch.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">
              <HiChatBubbleOvalLeftEllipsis style={{ color: '#E5E0F5' }} />
            </div>
            <h4>Discuss and refine</h4>
            <p>comments let others give feedback on the public summary.</p>
          </div>
        </div>
      </section>

      {/* 4. Grid Layer */}
      <section className="grid-section">
        <h2 className="section-serif" style={{color: 'white', marginBottom: '60px'}}>Featured Ideas</h2>

        <div className="ideas-grid">
          {featured.map((idea) => (
            <div
              className="exact-card"
              key={idea.id}
              onClick={() => navigate(`/ideas/${idea.id}`)}
            >
              <div className="card-icon-circle">
                <span style={{fontSize: '2rem'}}>💡</span>
              </div>

              <h3>{idea.title}</h3>
              <p className="card-category-label">{idea.category || 'INNOVATION'}</p>
            </div>
          ))}

          {featured.length === 0 && (
            <p style={{ color: 'white', opacity: 0.5 }}>Loading featured visions...</p>
          )}
        </div>
      </section>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default Home;