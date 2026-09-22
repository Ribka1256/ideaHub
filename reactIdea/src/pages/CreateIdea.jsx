import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIdea } from '../api/ideas';
import NavBar from '../components/NavBar'; // Ensure NavBar is included
import '../style/theme.css'; 

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('status', status);
    if (document) formData.append('document', document);
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      await createIdea(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create idea. Please check inputs.');
    }
  };

  return (
    <div className="nature-auth-wrapper glass-bg">
      <NavBar />
      
      <div className="share-vision-card">
        <div className="vision-icon">🌱</div>
        
        <h1 className="vision-title">Share Your Vision</h1>
        <p className="vision-subtitle">Plant your seeds for your next great venture</p>

        <form onSubmit={handleSubmit} className="nature-form">
          <div className="form-row-dual">
            <div className="nature-input-group">
              <label>Idea Title</label>
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="eg: farming"
                required
              />
            </div>

            <div className="nature-input-group">
              <label>Category</label>
              <input 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="eg: tech"
              />
            </div>
          </div>

          <div className="nature-input-group">
            <label>Public Summary</label>
            <textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              placeholder="briefly describe your idea"
              required
            />
          </div>

          <div className="form-row-dual">
            <div className="nature-input-group">
              <label>Cover Image</label>
              <input 
                type="file" 
                className="custom-file-input"
                onChange={(e) => setCoverImage(e.target.files[0])} 
              />
            </div>

            <div className="nature-input-group">
              <label>Full Document</label>
              <input 
                type="file" 
                className="custom-file-input"
                onChange={(e) => setDocument(e.target.files[0])} 
              />
            </div>
          </div>

          <div className="nature-input-group">
            <label>Publishing Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">save as draft</option>
              <option value="published">publish now</option>
            </select>
          </div>

          {error && <div className="nature-error-message">{error}</div>}

          <button className="btn-vision-orange" type="submit">
            Save Draft
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateIdea;