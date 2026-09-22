import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getIdea, getComments, createComment, deleteComment } from '../api/ideas';
import AccessResquestModel from '../components/AccessResquestModel.jsx';
import NavBar from '../components/NavBar'; // Ensure NavBar is imported
import '../style/theme.css'; 

function IdeaDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getIdea(id)
      .then((res) => setIdea(res.data))
      .catch((err) => {
        console.error(err);
        setIdea(null);
      })
      .finally(() => setLoading(false));

    getComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => {
        console.error(err);
        setComments([]);
      });
  };

  useEffect(() => { load(); }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await createComment(id, commentText);
    setCommentText('');
    getComments(id).then((res) => setComments(res.data));
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (loading) return <div className="nature-loader">🌱 Growing content...</div>;
  if (!idea) return <div className="nature-error">Idea not found.</div>;

  return (
    <div className="detail-page-wrapper">
      <NavBar />
      
      {/* 1. HERO SECTION: Title and Author matching the design */}
      <section className="idea-detail-hero">
        <div className="content-wrap">
          <span className="concept-label">{idea.category || 'General Concept'}</span>
          <h1 className="idea-title">{idea.title}</h1>
          <p className="author-label">By {idea.owner_username}</p>

          {/* 2. THE GLASS SUMMARY CARD */}
          <div className="summary-container">
            <div className="summary-text-side">
              <h2>Project Summary</h2>
              <p>{idea.summary}</p>
            </div>

            {/* 3. ACCESS BOX (Sub-card) */}
            <div className="private-card">
              {idea.document ? (
                <>
                  <div className="lock-icon">🔓</div>
                  <h4>Document Unlocked</h4>
                  <a href={idea.document} className="btn-request" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                    View Full Pitch
                  </a>
                </>
              ) : (
                <>
                  <div className="lock-icon">🔒</div>
                  <h4>Private Document</h4>
                  {user ? (
                    <button className="btn-request" onClick={() => setShowRequestModal(true)}>
                      Request Access..
                    </button>
                  ) : (
                    <p style={{fontSize: '0.8rem', opacity: 0.7}}>Sign in to request access</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 4. COMMENTS SECTION */}
          <h2 className="community-header">Community Discussion</h2>
          
<div className="comments-section-container">
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
        {/* Avatar with the first letter of the username */}
        <div className="comment-avatar">{c.author_username[0].toUpperCase()}</div>
        
        <div className="comment-body">
          <div className="comment-header">
            <strong>{c.author_username}</strong>
            {user && user.username === c.author_username && (
              <button 
                className="btn-delete-comment" 
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            )}
          </div>
          <p>{c.text}</p>
        </div>
      </div>
    ))}
    
    {comments.length === 0 && (
      <p style={{ textAlign: 'center', color: 'white', opacity: 0.5, fontStyle: 'italic' }}>
        No discussions yet. Be the first to start the conversation!
      </p>
    )}
  </div>
</div>
        </div>
      </section>

      {showRequestModal && (
        <AccessResquestModel
          idea={idea}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            setShowRequestModal(false);
            load(); // Reload to update status if necessary
          }}
        />
      )}
      
      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default IdeaDetail;