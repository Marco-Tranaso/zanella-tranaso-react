import React from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'

const MovieCard = ({movie}) => {
    return (
        <div className="card-list">
            <Link to={`/player/${movie.id}`} className="card">
                <img src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path} alt="" />
                <p>{movie.original_title}</p>
            </Link>
        </div>
    )
}

export default MovieCard
