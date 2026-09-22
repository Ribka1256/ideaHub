import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdeas } from '../api/ideas';
import '../style/theme.css'; // Using the unified nature theme

function IdeaList() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Color rotation helper (matches the colors in your theme.css)
  const colors = ['color-sage', 'color-brown', 'color-forest', 'color-tan'];

  useEffect(() => {
    getIdeas()
      .then((res) => setIdeas(res.data))
      .catch(() => setError('Failed to load ideas'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = ideas.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <div className="nature-loader">🌿 Exploring the forest of ideas...</div>;
if (error) return <div className="status status--error">{error}</div>;

  return (
    <div className="app-home">
      {/* 1. HERO SECTION (Matches Home Style) */}
      <header className="hero-split" style={{ height: '60vh' }}>
        <div className="hero-content">
          <h1 className="auth-title" style={{ fontSize: '4rem' }}>Browse<br/>Innovation</h1>
          <p style={{ color: 'var(--feature-bar)', opacity: 0.8, maxWidth: '600px' }}>
            Discover a growing ecosystem of projects from young entrepreneurs and creative minds.
          </p>
          
          {/* Nature-Styled Search Bar */}
          <div className="search-container">
            <input
              type="text"
              className="nature-search-input"
              placeholder="Search by title or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="search-icon-nature">🔍</span>
          </div>
        </div>
      </header>

      {/* 2. GRID SECTION (Deep Green Background with Dots) */}
      <section className="grid-section">
        <div className="ideas-grid">
          {filtered.map((idea, index) => (
            <div 
              className={`exact-card ${colors[index % colors.length]}`} 
              key={idea.id} 
              onClick={() => navigate(`/ideas/${idea.id}`)}
            >
              <div className="card-icon-circle">
                {idea.cover_image ? (
                  <img src={idea.cover_image} alt="" className="square-image-nav" />
                ) : (
                  <span>💡</span>
                )}
              </div>
              <h3>{idea.title}</h3>
              <p>{idea.category || 'General'}</p>
              <div className="card-hover-hint">View Details →</div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="no-results">
              <p>No ideas match your search. Try another path.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default IdeaList;