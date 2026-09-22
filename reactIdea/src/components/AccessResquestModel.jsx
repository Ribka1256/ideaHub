import { useState } from 'react';
import { createAccessRequest } from '../api/ideas';
import '../style/theme.css'; 

function AccessRequestModal({ idea, onClose, onSuccess }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createAccessRequest(idea.id, message);
      onSuccess();
    } catch (err) {
      setError('Failed to send request. You may have already requested this.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nature-modal-overlay" onClick={onClose}>
      <div className="access-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Floating Close Button */}
        <button className="access-modal-close" onClick={onClose}>✕</button>

        {/* Lock Icon */}
        <div className="access-modal-icon">
          <div className="lock-shape">🔒</div>
        </div>

        <h2 className="access-modal-title">Request Access</h2>
        <p className="access-modal-subtitle">
          You are requesting to view <strong>{idea.title}</strong>
        </p>

        <form onSubmit={handleSubmit} className="access-modal-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduction Message"
            required
          />

          {error && <div className="nature-error-message">{error}</div>}

          <button className="btn-request-submit" type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccessRequestModal;