import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const cardsRef = useRef();

  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsIm5iZiI6MTc2MzI5MzA4MC41MTUsInN1YiI6IjY5MTliNzk4Y2VjZmNmNGM3ZTlhZTVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I";

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    const savedFavorites = localStorage.getItem('netflixFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const toggleFavorite = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedFavorites;
    if (favorites.some(fav => fav.id === movie.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id)
    } else {
      updatedFavorites = [...favorites, movie]
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('netflixFavorites', JSON.stringify(updatedFavorites));
  }

  const isFavorite = (movieId) => favorites.some(fav => fav.id === movieId)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    }
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title || "Popolari su Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies.map(movie => (
          <div className="card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.original_title || movie.title}
                onError={(e) => {

                  if (e.target.src !== '/placeholder.webp') {
                    e.target.src = '/placeholder.webp';
                  }
                }}
              />
              <p>{movie.original_title || movie.title}</p>
            </Link>

            <div className="card-overlay">
              <Link to={`/movie/${movie.id}`} className="icon-button" title="Informazioni">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </Link>

              <button
                className={`icon-button favorite ${isFavorite(movie.id) ? 'added' : ''}`}
                onClick={(e) => toggleFavorite(e, movie)}
                title={isFavorite(movie.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite(movie.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
