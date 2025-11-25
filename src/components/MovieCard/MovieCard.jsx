import React, { useState, useEffect } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, showNewBadge = false }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        checkIfFavorite()
    }, [movie.id])

    const checkIfFavorite = () => {
        const savedFavorites = localStorage.getItem('netflixFavorites')
        if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites)
            setIsFavorite(favorites.some(fav => fav.id === movie.id))
        }
    }

    const toggleFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const savedFavorites = localStorage.getItem('netflixFavorites')
        let favorites = savedFavorites ? JSON.parse(savedFavorites) : []

        if (isFavorite) {
            favorites = favorites.filter(fav => fav.id !== movie.id)
        } else {
            favorites.push(movie)
        }

        localStorage.setItem('netflixFavorites', JSON.stringify(favorites))
        setIsFavorite(!isFavorite)
    }

    const getRating = () => movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
    const getYear = () => movie.release_date ? new Date(movie.release_date).getFullYear() : ''
    const isNew = () => {
        if (!movie.release_date) return false
        const releaseDate = new Date(movie.release_date)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return releaseDate > thirtyDaysAgo
    }

    return (
        <div className="movie-card">
        
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.original_title || movie.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x281?text=Immagine+Non+Disponibile'
                    }}
                />

                {(showNewBadge && isNew()) && (
                    <div className="new-badge">Nuovo</div>
                )}

                <p className="movie-card-title">
                    {movie.original_title || movie.title}
                </p>
            </Link>

            <div className="movie-card-overlay">
                <div className="overlay-content">
                    <div className="movie-info">
                        <h3>{movie.original_title || movie.title}</h3>
                        <div className="movie-meta">
                            {movie.vote_average > 0 && (
                                <div className="movie-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <span>{getRating()}</span>
                                </div>
                            )}
                            {getYear() && (
                                <span className="movie-year">{getYear()}</span>
                            )}
                        </div>
                    </div>

                    <div className="movie-actions">
                        <Link to={`/movie/${movie.id}`} className="play-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Dettagli
                        </Link>
                        <button
                            className={`action-btn favorite-btn ${isFavorite ? 'added' : ''}`}
                            onClick={toggleFavorite}
                            title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </button>

                        <Link
                            to={`/movie/${movie.id}`}
                            className="action-btn"
                            title="Maggiori informazioni"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
