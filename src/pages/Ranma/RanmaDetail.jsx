import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Ranma.css';
import hero_banner from '../../assets/hero_banner.jpg';
import poster_ranma from '../../assets/poster-ranma.avif';

const RanmaDetail = () => {
  const navigate = useNavigate();


  const ranmaData = {
    title: "Ranma ½",
    originalTitle: "らんま½",
    overview: "Akane Tendo incontra il suo nuovo fidanzato Ranma Saotome, un prodigio delle arti marziali con un segreto: si trasforma magicamente in una ragazza a contatto con l'acqua fredda.",
    rating: 8.5,
    releaseDate: "2024",
    genre: "Anime, Commedia, Arti Marziali",
    episodes: "12 episodi",
    studio: "MAPPA"
  };

  return (
    <div 
      className="ranma-detail" 
      style={{ backgroundImage: `url(${hero_banner})` }}
    >
      <div className="overlay">
        <div className="ranma-detail-container">
          <div className="back-link">
            <Link to="/" className="back-home">← Torna alla Home</Link>
          </div>
          
          <img 
            className="ranma-poster"
            src={poster_ranma} 
            alt={ranmaData.title}
          />
          
          <div className="ranma-info">
            <h1>{ranmaData.title}</h1>
            <p className="ranma-subtitle">{ranmaData.originalTitle}</p>
            
            <p className="ranma-overview">{ranmaData.overview}</p>
            
            <div className="ranma-meta">
              <span className="rating">⭐ {ranmaData.rating}</span>
              <span className="release">{ranmaData.releaseDate}</span>
              <span className="genre">{ranmaData.genre}</span>
            </div>
            
            <div className="ranma-meta">
              <span className="episodes">{ranmaData.episodes}</span>
              <span className="studio">Studio: {ranmaData.studio}</span>
            </div>
            
            <button className="play-btn" onClick={() => navigate('/trailer')}>
              ▶ Guarda il Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RanmaDetail;