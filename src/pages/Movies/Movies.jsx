import React, { useState, useEffect } from 'react'
import './Movies.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('popular')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsIm5iZiI6MTc2MzI5MzA4MC41MTUsInN1YiI6IjY5MTliNzk4Y2VjZmNmNGM3ZTlhZTVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I'
        }
    }

    const categories = [
        { id: 'popular', name: 'Popolari', endpoint: 'popular' },
        { id: 'top_rated', name: 'Più Votati', endpoint: 'top_rated' },
        { id: 'now_playing', name: 'Al Cinema', endpoint: 'now_playing' },
        { id: 'upcoming', name: 'In Arrivo', endpoint: 'upcoming' }
    ]

    useEffect(() => {
        setMovies([])
        setPage(1)
        setHasMore(true)
        fetchMovies(1, selectedCategory)
    }, [selectedCategory])

    const fetchMovies = async (pageNum, category) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${category}?language=it-IT&page=${pageNum}`,
                options
            )
            const data = await response.json()
            
            if (pageNum === 1) {
                setMovies(data.results)
            } else {
                setMovies(prev => [...prev, ...data.results])
            }
            
            setHasMore(pageNum < data.total_pages)
            setLoading(false)
        } catch (error) {
            console.error('Errore nel caricamento dei film:', error)
            setLoading(false)
        }
    }

    const loadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchMovies(nextPage, selectedCategory)
    }

    const getCategoryName = () => {
        const category = categories.find(cat => cat.endpoint === selectedCategory)
        return category ? category.name : 'Film'
    }

    return (
        <>
        <Navbar/>
        <div className='movies-page'>
            <div className="movies-header">
                <h1>Film</h1>
                <div className="category-tabs">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`tab-btn ${selectedCategory === category.endpoint ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.endpoint)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="movies-count">
                <p>{movies.length} {movies.length === 1 ? 'film' : 'film'} - {getCategoryName()}</p>
            </div>

            <div className="movies-grid">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={`${movie.id}-${index}`} 
                        movie={movie}
                        showNewBadge={selectedCategory === 'now_playing' || selectedCategory === 'upcoming'}
                    />
                ))}
            </div>

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Caricamento...</p>
                </div>
            )}

            {!loading && hasMore && movies.length > 0 && (
                <div className="load-more">
                    <button className="load-more-btn" onClick={loadMore}>
                        Carica Altri Film
                    </button>
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="no-results">
                    <p>Nessun film trovato</p>
                </div>
            )}
        </div>
        <Footer/>
        </>
    )
}

export default Movies