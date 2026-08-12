import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyIdeas, deleteIdea } from '../api/ideas';
import '../style/theme.css'; // Consistent nature theme

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    getMyIdeas()
      .then((res) => setIdeas(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vision? 🍂')) return;
    await deleteIdea(id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="nature-loader">🌿 Organizing your workspace...</div>;

  return (
    <div className="app-home">
      {/* 1. HERO HEADER */}
      <header className="hero-split" style={{ height: '40vh', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
        <div className="hero-content">
          <h1 className="auth-title" style={{ color: 'var(--feature-bar)', fontSize: '3.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--feature-bar)', opacity: 0.8 }}>
            Manage your intellectual property and track your progress.
          </p>
        </div>
      </header>

      {/* 2. OVERLAPPING DASHBOARD CARD */}
      <div className="detail-container">
        <div className="detail-main-card">
          
          <div className="dashboard-top-bar">
            <h2 className="section-serif">My Ideas</h2>
            <Link to="/idea/create" className="btn-pill" style={{ textDecoration: 'none' }}>
              + Create New Vision
            </Link>
          </div>

          <div className="table-wrapper">
            <table className="nature-table">
              <thead>
                <tr>
                  <th>Vision Title</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ideas.map((idea) => (
                  <tr key={idea.id}>
                    <td className="table-title-cell">
                        <strong>{idea.title}</strong>
                        <span>{idea.category || 'General'}</span>
                    </td>
                    <td>
                      <span className={`nature-badge badge--${idea.status}`}>
                        {idea.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions">
                        <button 
                          className="table-btn edit" 
                          onClick={() => navigate(`/ideas/${idea.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button 
                          className="table-btn delete" 
                          onClick={() => handleDelete(idea.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {ideas.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🍃</div>
                <p>No ideas planted yet. Start your journey today.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default Dashboard;