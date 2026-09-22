import { useNavigate } from 'react-router-dom';
import '../style/theme.css'; // Ensure the nature theme is imported

function IdeaCard({ idea, index }) {
  const navigate = useNavigate();

  // This helps rotate the colors so the grid looks like the reference photo
  const colors = ['color-sage', 'color-forest', 'color-brown', 'color-tan'];
  const cardColor = colors[index % colors.length];

  return (
    <div 
      className={`exact-card ${cardColor}`} 
      onClick={() => navigate(`/ideas/${idea.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-icon-circle">
        {idea.cover_image ? (
          <img src={idea.cover_image} alt="" className="square-image" />
        ) : (
          <span className="square-emoji">💡</span>
        )}
      </div>

      <div className="square-content">
        <span className="card-category-label">{idea.category || 'Innovation'}</span>
        <h3>{idea.title}</h3>
        <p className="card-summary-text">
            {idea.summary ? `${idea.summary.slice(0, 60)}...` : 'No summary provided.'}
        </p>
        <span className="card-author-tag">by {idea.owner_username}</span>
      </div>
    </div>
  );
}

export default IdeaCard;