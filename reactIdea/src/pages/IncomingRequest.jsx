import { useEffect, useState } from 'react';
import { getMyAccessRequests, approveRequest, denyRequest } from '../api/ideas';
import '../style/theme.css'; // Consistent nature theme

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getMyAccessRequests()
      .then((res) => setRequests(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    await approveRequest(id);
    load();
  };

  const handleDeny = async (id) => {
    await denyRequest(id);
    load();
  };

  if (loading) return <div className="nature-loader">🌿 Reviewing requests...</div>;

  return (
    <div className="app-home">
      {/* 1. HERO HEADER */}
      <header className="hero-split" style={{ height: '40vh', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
        <div className="hero-content">
          <h1 className="auth-title" style={{ color: 'var(--feature-bar)', fontSize: '3.5rem' }}>Permissions</h1>
          <p style={{ color: 'var(--feature-bar)', opacity: 0.8 }}>
            Manage who can view your protected intellectual property.
          </p>
        </div>
      </header>

      {/* 2. OVERLAPPING REQUESTS CARD */}
      <div className="detail-container">
        <div className="detail-main-card">
          
          <div className="dashboard-top-bar">
            <h2 className="section-serif">Access Requests</h2>
            <div className="status-legend">
                <span className="dot dot--pending"></span> Pending review
            </div>
          </div>

          <div className="table-wrapper">
            <table className="nature-table">
              <thead>
                <tr>
                  <th>Vision / Idea</th>
                  <th>Requester</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Management</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td className="table-title-cell">
                        <strong>{r.idea_title || `Idea #${r.idea}`}</strong>
                        <span>ID Reference: {r.id}</span>
                    </td>
                    <td>
                      <div className="requester-info">
                         <div className="mini-avatar">{r.requester_username[0]}</div>
                         <strong>{r.requester_username}</strong>
                      </div>
                    </td>
                    <td>
                      <span className={`nature-badge badge--${r.status}`}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions">
                        {r.status === 'pending' ? (
                          <>
                            <button 
                              className="table-btn edit" 
                              onClick={() => handleApprove(r.id)}
                            >
                              Approve
                            </button>
                            <button 
                              className="table-btn delete" 
                              onClick={() => handleDeny(r.id)}
                            >
                              Deny
                            </button>
                          </>
                        ) : (
                          <span className="action-completed">Decision Logged</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {requests.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🛡️</div>
                <p>Your protected documents are currently secure. No pending requests.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default IncomingRequests;