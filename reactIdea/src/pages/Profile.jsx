import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMe, updateProfile } from '../api/auth';
import '../style/theme.css'; // Consistent theme file

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
        // Adjusted to match common backend naming (full_name vs fullName)
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
    <div className="app-home">
      {/* 1. HERO HEADER */}
      <header className="hero-split" style={{ height: '45vh', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
        <div className="hero-content">
          <h1 className="auth-title" style={{ color: 'var(--feature-bar)', fontSize: '3.5rem' }}>የእኔ መገለጫ</h1>
          <p style={{ color: 'var(--feature-bar)', opacity: 0.8 }}>
            Member since: {memberSince ? new Date(memberSince).toLocaleDateString() : '—'}
          </p>
        </div>
      </header>

      {/* 2. OVERLAPPING PROFILE CARD */}
      <div className="detail-container">
        <div className="detail-main-card">
          <div className="auth-circle-icon" style={{ marginTop: '-80px', border: '5px solid var(--cream)' }}>
            👤
          </div>

          <form onSubmit={handleSubmit} className="nature-form" style={{ marginTop: '20px' }}>
            <div className="form-row-dual">
              <div className="nature-input-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <div className="nature-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="form-row-dual">
              <div className="nature-input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251..."
                />
              </div>

              <div className="nature-input-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Addis Ababa, Ethiopia"
                />
              </div>
            </div>

            {error && <div className="nature-error-message">{error}</div>}
            {success && <div className="nature-success-message">{success}</div>}

            <button className="btn-auth-pill" type="submit" style={{ width: 'auto', padding: '15px 40px' }}>
              💾 Save Changes
            </button>
          </form>

          {/* 3. PASSWORD SECTION */}
          <div className="profile-password-section">
            <h3 className="section-serif" style={{ marginTop: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px' }}>
              የይለፍ ቃል ይቀይሩ
            </h3>
            <div className="nature-input-group" style={{ maxWidth: '400px' }}>
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
              <button className="btn-pill" style={{ marginTop: '15px', background: 'var(--card-brown)', color: 'white' }}>
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