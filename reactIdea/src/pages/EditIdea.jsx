import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIdea, updateIdea } from '../api/ideas';
import '../style/theme.css'; // Using the unified nature theme

function EditIdea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing data
    getIdea(id)
      .then((res) => {
        const i = res.data;
        setTitle(i.title);
        setSummary(i.summary);
        setCategory(i.category);
        setStatus(i.status);
      })
      .catch(() => setError('Failed to load idea details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('status', status);

    try {
      await updateIdea(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update idea. Please check your inputs.');
    }
  };

  if (loading) return <div className="nature-loader">🌿 Gathering your data...</div>;

  return (
    <div className="app-home">
      {/* 1. HERO HEADER (Matches Home/Profile Style) */}
      <header className="hero-split" style={{ height: '40vh', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
        <div className="hero-content">
          <h1 className="auth-title" style={{ color: 'var(--feature-bar)', fontSize: '3.5rem' }}>Refine Idea</h1>
          <p style={{ color: 'var(--feature-bar)', opacity: 0.8 }}>
            Polish your vision and update your progress for the community.
          </p>
        </div>
      </header>

      {/* 2. OVERLAPPING EDIT CARD */}
      <div className="detail-container">
        <div className="detail-main-card" style={{ maxWidth: '800px', margin: '-60px auto 50px auto' }}>
          {/* Circular Icon Overlay */}
          <div className="auth-circle-icon" style={{ marginTop: '-80px', border: '5px solid var(--cream)' }}>
            ✍️
          </div>

          <form onSubmit={handleSubmit} className="nature-form" style={{ marginTop: '20px' }}>
            
            {/* Title & Category Grid */}
            <div className="form-row-dual">
              <div className="nature-input-group">
                <label htmlFor="title">Title</label>
                <input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="The name of your vision"
                  required
                />
              </div>

              <div className="nature-input-group">
                <label htmlFor="category">Category</label>
                <input 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="e.g. Agriculture, Tech"
                />
              </div>
            </div>

            {/* Summary Textarea */}
            <div className="nature-input-group">
              <label htmlFor="summary">Public Summary</label>
              <textarea 
                id="summary" 
                className="nature-textarea"
                style={{ minHeight: '160px' }}
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                placeholder="What has evolved since your last update?"
                required
              />
            </div>

            {/* Status Dropdown */}
            <div className="nature-input-group">
              <label htmlFor="status">Publishing Status</label>
              <select 
                id="status" 
                className="nature-select"
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">Draft (Private Archive)</option>
                <option value="published">Published (Live to Feed)</option>
              </select>
            </div>

            {error && <div className="nature-error-message">{error}</div>}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button className="btn-auth-pill" type="submit" style={{ width: 'auto', padding: '15px 40px' }}>
                💾 Save Changes
              </button>
              <button 
                type="button" 
                className="btn-pill" 
                style={{ background: 'transparent', border: '1px solid #ccc', color: '#666' }}
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default EditIdea;