import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getIdea, getComments, createComment } from '../api/ideas';
import '../style/theme.css'; // Use the same theme file

function IdeaDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    // FIXED: Passed 'id' to getIdea
    getIdea(id)
      .then((res) => setIdea(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // FIXED: lowercase false
    
    getComments(id).then((res) => setComments(res.data));
  };

  useEffect(() => { load(); }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await createComment(id, commentText);
    setCommentText('');
    getComments(id).then((res) => setComments(res.data));
  };

  if (loading) return <div className="nature-loader">🌱 Growing content...</div>;
  if (!idea) return <div className="nature-error">Idea not found.</div>;

  return (
    <div className="app-home">
      {/* 1. HERO HEADER - Title and Meta */}
      <header className="hero-split" style={{ height: '50vh', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)' }}>
        <div className="hero-content">
          <span className="category-tag">{idea.category || 'General Concept'}</span>
          <h1 style={{ fontSize: '3.5rem' }}>{idea.title}</h1>
          <p>By <strong>{idea.owner_username}</strong></p>
        </div>
      </header>

      {/* 2. OVERLAPPING CONTENT CARD */}
      <section className="detail-container">
        <div className="detail-main-card">
          <div className="detail-layout">
            
            {/* Left Column: Summary */}
            <div className="detail-description">
              <h3 className="section-serif">Project Summary</h3>
              <p>{idea.summary}</p>
            </div>

            {/* Right Column: Access & Actions */}
            <div className="detail-sidebar">
              <div className="access-box color-sage">
                {idea.document ? (
                  <>
                    <div className="sidebar-icon">🔓</div>
                    <h4>Document Unlocked</h4>
                    <a href={idea.document} className="btn-pill" target="_blank" rel="noopener noreferrer">
                      View Full Pitch
                    </a>
                  </>
                ) : (
                  <>
                    <div className="sidebar-icon">🔒</div>
                    <h4>Private Document</h4>
                    <p>This IP is protected. Request access to see full details.</p>
                    {user && (
                      <button className="btn-pill" onClick={() => setShowRequestModal(true)}>
                        Request Access
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 3. COMMENTS SECTION (The Sage Grid Look) */}
          <div className="comments-section">
            <h3 className="section-serif">Community Discussion</h3>
            
            {user && (
              <form onSubmit={handleComment} className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts or feedback..."
                />
                <button className="btn-pill" type="submit">Post Comment</button>
              </form>
            )}

            <div className="comments-list">
              {comments.map((c) => (
                <div className="nature-comment" key={c.id}>
                  <div className="comment-avatar">{c.author_username[0]}</div>
                  <div className="comment-body">
                    <strong>{c.author_username}</strong>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && <p className="no-comments">No discussions yet. Be the first!</p>}
            </div>
          </div>
        </div>
      </section>

      {showRequestModal && (
        <AccessRequestModal
          idea={idea}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => setShowRequestModal(false)}
        />
      )}
      
      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default IdeaDetail;