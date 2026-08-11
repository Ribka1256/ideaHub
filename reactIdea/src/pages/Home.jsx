import '../style/theme.css';
import { useEffect, useState, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdeas } from '../api/ideas';

function Home() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getIdeas().then((res) => setIdeas(res.data.slice(0, 5)));
  }, []);

  const handleSubmit = (idea) =>{
    navigate(`/ideas/${idea.id}`)
  }

  return (
    <div className="app-home">
      {/* 1. Hero Layer */}
      <header className="hero-split">
        <div className="hero-content">
          <h1>Rennale<br/>Renuelly</h1>
          <p>A nature-inspired sanctuary for your most ambitious concepts. Pitch, protect, and watch your ideas bloom.</p>
          <button className="btn-pill" onClick={handleSubmit} >Explore Ideas</button>
        </div>
      </header>

      {/* 2. Feature Bar Layer */}
      <section className="feature-container">
        <div className="feature-bar">
          <div className="feature-col">
            <div className="feature-icon">🎯</div>
            <h4>Strategy</h4>
            <p>Every concept is aligned with a clear path to market success.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">📊</div>
            <h4>Analytics</h4>
            <p>Data-driven insights to help refine and pivot your work.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">🚀</div>
            <h4>Launch</h4>
            <p>Go from draft to deployment with expert community support.</p>
          </div>
          <div className="feature-col">
            <div className="feature-icon">🌐</div>
            <h4>Network</h4>
            <p>Global reach for local entrepreneurs and creators.</p>
          </div>
        </div>
      </section>

      {/* 3. Grid Layer */}
      <section className="grid-section">
        <div className="ideas-grid">
          {/* Card 1: Sage */}
          <div className="exact-card color-sage">
            <div className="card-icon-circle">✿</div>
            <h3>Stare Seador</h3>
            <p>Sustainable landscape design for modern cities.</p>
          </div>

          {/* Card 2: Forest */}
          <div className="exact-card color-forest">
            <div className="card-icon-circle">🌿</div>
            <h3>Teavnt</h3>
            <p>Deep wood botanical research and cultivation.</p>
          </div>

          {/* Card 3: Brown */}
          <div className="exact-card color-brown">
            <div className="card-icon-circle">🍂</div>
            <h3>Vouihufercs</h3>
            <p>Autumnal harvest and grain storage solutions.</p>
          </div>

          {/* Card 4: Image */}
          <div className="exact-card card-image"></div>

          {/* Card 5: Dark Brown */}
          <div className="exact-card color-dark-brown">
            <div className="card-icon-circle">☘</div>
            <h3>Esecl Fiaste</h3>
            <p>Deep soil fertilization and health tracking.</p>
          </div>

          {/* Card 6: Tan */}
          <div className="exact-card color-tan">
            <div className="card-icon-circle">⬡</div>
            <h3>Blisstdare</h3>
            <p>Geometric modular architecture for forests.</p>
          </div>
        </div>
      </section>

      <footer className="exact-footer">PESTRES 1</footer>
    </div>
  );
}

export default Home;