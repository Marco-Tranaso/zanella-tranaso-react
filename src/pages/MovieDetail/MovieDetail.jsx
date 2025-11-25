import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsIm5iZiI6MTc2MzI5MzA4MC41MTUsInN1YiI6IjY5MTliNzk4Y2VjZmNmNGM3ZTlhZTVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: { Authorization: TOKEN, accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status_code) setError(data.status_message || "Errore nel caricamento");
        else setMovie(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Caricamento…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="error">Film non trovato</p>;

  const { title, original_title, poster_path, backdrop_path, overview, vote_average, release_date } = movie;

  return (
    <div 
      className="movie-detail" 
      style={{ backgroundImage: backdrop_path ? `url(https://image.tmdb.org/t/p/original${backdrop_path})` : 'none' }}
    >
      <div className="overlay">
        <div className="movie-detail-container">
          <div className="back-link">
            <Link to="/" className="back-home">← Torna alla Home</Link>
          </div>
          <img 
            className="movie-poster"
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/300x450?text=Immagine+Non+Disponibile'} 
            alt={title || original_title} 
          />
          <div className="movie-info">
            <h1>{title || original_title}</h1>
            <p className="movie-overview">{overview || "Descrizione non disponibile"}</p>
            <div className="movie-meta">
              <span className="rating">⭐ {vote_average ? vote_average.toFixed(1) : "N/A"}</span>
              <span className="release">{release_date || "N/A"}</span>
            </div>
            <button className="play-btn" onClick={() => navigate(`/player/${id}`)}>
              ▶ Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
