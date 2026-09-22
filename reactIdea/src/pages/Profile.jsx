import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMe, updateProfile } from '../api/auth';
import NavBar from '../components/NavBar';
import '../style/theme.css'; 

function Profile() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => {
        const u = res.data;
        setFullName(u.full_name || u.fullName || '');
        setEmail(u.email || '');
        setPhone(u.phone || '');
        setLocation(u.location || '');
        setMemberSince(u.date_joined);
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updateProfile({ full_name: fullName, email, phone, location });
      setSuccess('Profile updated successfully! 🌱');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div className="nature-loader">🌱 Tending to your profile...</div>;

  return (
    <div className="blur-background-wrapper">
      <NavBar />
      
      {/* 1. HERO HEADER */}
      <header className="idea-detail-hero" style={{ minHeight: '35vh', paddingBottom: '0' }}>
        <div className="content-wrap">
          <h1 className="dashboard-hero-title">የእኔ መገለጫ</h1>
          <p className="dashboard-hero-subtitle">
            Member since: {memberSince ? new Date(memberSince).toLocaleDateString() : '—'}
          </p>
        </div>
      </header>

      {/* 2. OVERLAPPING PROFILE CARD */}
      <div className="detail-container">
        <div className="summary-container" style={{ display: 'block', marginTop: '40px' }}>
          
          {/* Floating Avatar from your reference image */}
          <div className="profile-avatar-top">
            <div className="avatar-circle-main">👤</div>
          </div>

          <form onSubmit={handleSubmit} className="nature-form" style={{ marginTop: '40px' }}>
            <div className="form-row-dual">
              <div className="nature-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <div className="nature-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="form-row-dual">
              <div className="nature-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251..."
                />
              </div>

              <div className="nature-input-group">
                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Addis Ababa, Ethiopia"
                />
              </div>
            </div>

            {error && <div className="nature-error-message">{error}</div>}
            {success && <div className="nature-success-message">{success}</div>}

            <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <button className="btn-pill" type="submit" style={{ backgroundColor: 'var(--accent-orange)' }}>
                  💾 Save Changes
                </button>
            </div>
          </form>

          {/* 3. PASSWORD SECTION */}
          <div className="profile-password-section-ui">
            <h3 className="section-serif" style={{ marginTop: '50px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px', fontSize: '1.8rem' }}>
              የይለፍ ቃል ይቀይሩ
            </h3>
            
            <div className="nature-input-group" style={{ maxWidth: '450px' }}>
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
              <button className="btn-pill" style={{ marginTop: '20px', backgroundColor: '#533224', color: 'white' }}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default Profile;