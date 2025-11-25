import React, { useState, useEffect } from 'react'
import './Favorites.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('netflixFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId)
    setFavorites(updatedFavorites)
    localStorage.setItem('netflixFavorites', JSON.stringify(updatedFavorites))
  }

  const clearAllFavorites = () => {
    if (window.confirm('Sei sicuro di voler rimuovere tutti i preferiti?')) {
      setFavorites([])
      localStorage.removeItem('netflixFavorites')
    }
  }

  return (
    <>
      <Navbar />
      <div className='favorites-page'>
        <div className="favorites-header">
          <h1>I Miei Preferiti</h1>
          {favorites.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllFavorites}>
              Rimuovi Tutti
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <h2>Nessun contenuto nei preferiti</h2>
            <p>Aggiungi film e serie TV ai tuoi preferiti per vederli qui</p>
            <Link to="/" className="browse-btn">Esplora Contenuti</Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <div className="favorite-card" key={movie.id}>
                <Link to={`/player/${movie.id}`} className="card-link">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.original_title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x281?text=Immagine+Non+Disponibile'
                    }}
                  />
                  <div className="card-info">
                    <h3>{movie.original_title || movie.title}</h3>
                    {movie.release_date && (
                      <span className="release-year">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    )}
                  </div>
                </Link>

                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(movie.id)}
                  title="Rimuovi dai preferiti"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="hover-overlay">
                  <Link to={`/player/${movie.id}`} className="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Riproduci
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="favorites-count">
          {favorites.length > 0 && (
            <p>{favorites.length} {favorites.length === 1 ? 'contenuto' : 'contenuti'} nei preferiti</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Favorites