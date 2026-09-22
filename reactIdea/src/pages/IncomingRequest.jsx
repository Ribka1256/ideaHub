import { useEffect, useState } from 'react';
import { getMyAccessRequests, approveRequest, denyRequest } from '../api/ideas';
import NavBar from '../components/NavBar';
import RequesterProfileModal from '../components/RequesterProfileModal';
import '../style/theme.css';

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null); // ADD

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
    <div className="detail-page-wrapper">
      <NavBar />
      <header className="idea-detail-hero" style={{ minHeight: '40vh', paddingBottom: '0' }}>
        <div className="content-wrap">
          <h1 className="dashboard-hero-title">Permissions</h1>
          <p className="dashboard-hero-subtitle">
            Manage who can see your protected intellectual property
          </p>

          <div className="summary-container" style={{ display: 'block', marginTop: '40px' }}>
            <div className="dashboard-card-header">
              <h2 className="my-ideas-title">Access Requests</h2>
              <div className="status-legend">
                <span className="dot dot--pending"></span>
                <span style={{opacity: 0.6, fontSize: '0.9rem', fontWeight: 600}}>Pending review</span>
              </div>
            </div>

            <div className="ideas-list-wrapper">
              {requests.map((r) => (
                <div className="idea-row-container" key={r.id}>
                  <div className="idea-info-group">
                    <strong>{r.idea_title || `Idea #${r.idea}`}</strong>
                    <span>ID reference {r.id}</span>
                  </div>

                  {/* MODIFIED: clickable, opens modal */}
                  <div
                    className="requester-info"
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                    onClick={() => setSelectedRequest(r)}
                  >
                    <div className="mini-avatar" style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        backgroundColor: '#FFF', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#533224'
                    }}>
                        {r.requester_username[0].toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.requester_username}</span>
                  </div>

                  <div className="badge-pill-status">{r.status}</div>

                  <div className="dash-action-group">
                    {r.status === 'pending' ? (
                      <>
                        <button className="btn-dash-edit" onClick={() => handleApprove(r.id)}>Approve</button>
                        <button className="btn-dash-delete" onClick={() => handleDeny(r.id)}>Deny</button>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.5, fontWeight: 700 }}>
                        DECIDED
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="empty-state" style={{padding: '40px', textAlign: 'center', opacity: 0.5}}>
                  <p>Your protected documents are secure. No pending requests.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ADD: modal render */}
      {selectedRequest && (
        <RequesterProfileModal
          requestData={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default IncomingRequests;