import React, { useState } from "react";
import "./SearchBar.css";
import search_icon from "../../assets/search_icon.svg";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsIm5iZiI6MTc2MzI5MzA4MC41MTUsInN1YiI6IjY5MTliNzk4Y2VjZmNmNGM3ZTlhZTVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I";

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
        onClick={() => setOpen(!open)}/>
      <input
        type="text"
        placeholder="Titles, people, genres"
        className={`search-input ${open ? "open" : ""}`}
        value={query}
        onChange={(e) => handleSearch(e.target.value)} />

      {open && results.length > 0 && (
        <div className="search-results">
          {results.map((movie) => (
            <div key={movie.id} className="search-item">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/50x70?text=?"
                }
                alt={movie.title}
              />
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
