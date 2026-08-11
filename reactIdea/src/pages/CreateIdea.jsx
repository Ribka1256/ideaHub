import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIdea } from '../api/ideas';
import '../style/theme.css'; // Using the unified nature theme

function CreateIdea() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [document, setDocument] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('status', status);

    if (document) formData.append('document', document);
    // Fixed key name to cover_image to match typical Django models
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      await createIdea(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create idea. Please check your inputs and file sizes.');
    }
  };

  return (
    <div className="nature-auth-wrapper" style={{ padding: '80px 20px' }}>
      <div className="nature-auth-card" style={{ maxWidth: '700px' }}>
        <div className="auth-circle-icon">🌱</div>
        
        <h1 className="auth-title">Share Your Vision</h1>
        <p className="auth-subtitle">Plant the seeds for your next great venture</p>

        <form onSubmit={handleSubmit} className="nature-form">
          <div className="form-row-dual">
            <div className="nature-input-group">
              <label htmlFor="title">Idea Title</label>
              <input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Sustainable Urban Farming"
                required
              />
            </div>

            <div className="nature-input-group">
              <label htmlFor="category">Category</label>
              <input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="e.g. Technology"
              />
            </div>
          </div>

          <div className="nature-input-group">
            <label htmlFor="summary">Public Summary</label>
            <textarea 
              id="summary" 
              className="nature-textarea"
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              placeholder="Briefly describe your idea for the community feed..."
              required
            />
          </div>

          <div className="form-row-dual">
            <div className="nature-input-group">
              <label htmlFor="cover">Cover Image</label>
              <div className="file-input-wrapper">
                <input 
                  id="cover" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setCoverImage(e.target.files[0])} 
                />
              </div>
            </div>

            <div className="nature-input-group">
              <label htmlFor="document">Full Document (Protected)</label>
              <div className="file-input-wrapper">
                <input 
                  id="document" 
                  type="file" 
                  onChange={(e) => setDocument(e.target.files[0])} 
                />
              </div>
            </div>
          </div>

          <div className="nature-input-group">
            <label htmlFor="status">Publishing Status</label>
            <select 
              id="status" 
              className="nature-select"
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Save as Draft (Private)</option>
              <option value="published">Publish (Visible to All)</option>
            </select>
          </div>

          {error && <div className="nature-error-message">{error}</div>}

          <div style={{ marginTop: '30px' }}>
            <button className="btn-auth-pill" type="submit">
              🚀 {status === 'draft' ? 'Save Draft' : 'Launch Idea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIdea;