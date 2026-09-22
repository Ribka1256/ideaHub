import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyIdeas, deleteIdea } from '../api/ideas';
import NavBar from '../components/NavBar';
import '../style/theme.css'; 

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
    <div className="detail-page-wrapper">
      <NavBar />

      {/* 1. HERO HEADER */}
      <header className="idea-detail-hero" style={{ minHeight: '40vh', paddingBottom: '0' }}>
        <div className="content-wrap">
          <h1 className="dashboard-hero-title">Dashboard</h1>
          <p className="dashboard-hero-subtitle">
            Manage your intellectual property and track your progress
          </p>

          {/* 2. OVERLAPPING DASHBOARD CARD */}
          <div className="summary-container" style={{ display: 'block', marginTop: '40px' }}>
            
            <div className="dashboard-card-header">
              <h2 className="my-ideas-title">My Ideas 💡</h2>
              <Link to="/ideas/create" className="btn-add-vision">
                + add new vision
              </Link>
            </div>

            <div className="ideas-list-wrapper">
              {ideas.map((idea) => (
                <div className="idea-row-container" key={idea.id}>
                  {/* Left: Info */}
                  <div className="idea-info-group">
                    <strong>{idea.title}</strong>
                    <span>{idea.category || 'General'}</span>
                  </div>

                  {/* Middle: Status Badge */}
                  <div className="badge-pill-status">
                    {idea.status || 'APPROVED'}
                  </div>

                  {/* Right: Actions */}
                  <div className="dash-action-group">
                    <button 
                      className="btn-dash-edit" 
                      onClick={() => navigate(`/ideas/${idea.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-dash-delete" 
                      onClick={() => handleDelete(idea.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {ideas.length === 0 && (
                <div className="empty-state" style={{padding: '40px', textAlign: 'center', opacity: 0.5}}>
                  <p>No ideas planted yet. Start your journey today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default Dashboard;