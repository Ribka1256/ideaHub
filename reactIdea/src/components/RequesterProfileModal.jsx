import { useEffect, useState } from 'react';
import { getUserProfile } from '../api/ideas';
import '../style/theme.css'; 

function RequesterProfileModal({ requestData, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(requestData.requester_username)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [requestData.requester_username]);

  return (
    <div className="nature-modal-overlay" onClick={onClose}>
      <div className="access-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Floating Close Button */}
        <button className="access-modal-close" onClick={onClose}>✕</button>

        {loading ? (
          <div className="modal-loader">🌱 Fetching Profile...</div>
        ) : (
          <>
            {/* Header: Large Avatar and Name */}
            <div className="profile-modal-header">
                <div className="profile-avatar-large">
                    {requestData.requester_username[0].toUpperCase()}
                </div>
                <h2 className="access-modal-title">{requestData.requester_username}</h2>
                <p className="profile-subtitle">Visionary Member</p>
            </div>

            {/* Profile Stats Row */}
            {profile && (
              <div className="profile-stats-row">
                <div className="stat-item">
                  <span className="stat-label">Joined</span>
                  <span className="stat-value">{new Date(profile.date_joined).toLocaleDateString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Submitted</span>
                  <span className="stat-value">{profile.ideas_submitted} Ideas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Approved</span>
                  <span className="stat-value">{profile.ideas_approved} Visions</span>
                </div>
              </div>
            )}

            {/* Request Reason: Using the "Inset Well" style */}
            <div className="request-message-section">
              <h4 className="message-heading">Reason for Request</h4>
              <div className="message-content-box">
                {requestData.message || "No introduction message provided."}
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <button className="btn-logout-pill" onClick={onClose} style={{backgroundColor: '#533224'}}>
                    Close Profile
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RequesterProfileModal;