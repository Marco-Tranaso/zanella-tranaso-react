import React, { useState } from "react";
import "./SearchBar.css";
import search_icon from "../../assets/search_icon.svg";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I";

  async function handleSearch(q) {
    setQuery(q);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}`,
        {
          headers: {
            accept: "application/json",
            Authorization: API_TOKEN,  
          },
        }
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Nessun risultato trovato:", err);
    }
  }

  return (
    <div className="search-wrapper">
      <img
        src={search_icon}
        alt="search"
        className="search-icon"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="search-overlay">
          <div className="search-header">
            <input
              type="text"
              placeholder="Titoli persone generi"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="close-btn" onClick={() => setOpen(false)}>X</button>
          </div>

          <div className="search-results">
            {results.length > 0 ? (
              results.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="search-item" onClick={() => setOpen(false)}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://via.placeholder.com/100x150?text=?"
                    }
                    alt={movie.title}
                  />
                  <span>{movie.title}</span>
                </Link>
              ))
            ) : (
              <p className="no-results">Nessun risultato trovato</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
