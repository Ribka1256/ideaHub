import '../style/theme.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getIdeas } from '../api/ideas';

function Home(){

    const[ideas, setIdeas] = useState([])
    const{user, login} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
  getIdeas().then((res) => { // ✅ Added parentheses to EXECUTE the function
    setIdeas(res.data.slice(0, 6));
  });
}, []);

      return (
    <div className="app">
      <section style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <h1 style={{ color: 'var(--coffee-dark)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Share Your Next Big Idea
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          A space for young entrepreneurs to pitch, protect, and grow their ideas.
        </p>
        <button className="btn btn--main" style={{ width: 'auto' }} onClick={() => navigate('/ideas')}>
          Explore Ideas
        </button>
      </section>

      <section>
        <h2 style={{ color: 'var(--coffee-dark)', padding: '0 1.5rem' }}>Recent Ideas</h2>
        <div className="card-grid">
          {ideas.map((idea) => (
            <div className="card" key={idea.id} onClick={() => navigate(`/ideas/${idea.id}`)}>
              <img src={idea.cover_image || '/placeholder.png'} alt={idea.title} className="card__image" />
              <div className="card__body">
                <span className="badge">{idea.category || 'General'}</span>
                <h3>{idea.title}</h3>
                <p>{idea.summary?.slice(0, 80)}...</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

}

export default Home