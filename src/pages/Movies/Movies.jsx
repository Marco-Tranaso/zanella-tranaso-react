import React, { useEffect, useState } from 'react';
import './Movies.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Movies = () => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWEzZTNkYjliY2FmMDcyMmI1ZGY1NTcxZWY2MTMyYiIsIm5iZiI6MTc2MzI5MzA4MC41MTUsInN1YiI6IjY5MTliNzk4Y2VjZmNmNGM3ZTlhZTVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E1RjqoqbYcSgsER6kvV2DC7HRr3wbLgvnZoExG-902I'
        }
    };

    // 💡 MODIFICA: La funzione usa AbortController e gestisce l'aggiunta/reset
    async function getMovies(pageNumber, reset = false, signal = null) {
        setLoading(true);

        try {
            // Usa il signal di abort se fornito
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${pageNumber}`, { ...options, signal });
            const data = await res.json();

            // Aggiorna lo stato dei film: se 'reset' è true, sostituisci; altrimenti aggiungi.
            setMovies(prevMovies =>
                reset ? (data.results || []) : [...prevMovies, ...(data.results || [])]
            );

            if (data.page >= data.total_pages) {
                setHasMore(false);
            }

        } catch (error) {
            // Ignora l'errore se è un AbortError (chiamata interrotta da React Strict Mode)
            if (error.name !== 'AbortError') {
                console.error('Errore durante la fetch: ', error);
            }
        } finally {
            // Imposta loading a false solo se non c'è stato abort (più pulito, ma lo teniamo semplice)
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            getMovies(nextPage);
        }
    };

    // 💡 SOLUZIONE ROBUSA AL BUG DELLA DOPPIA CHIAMATA
    useEffect(() => {
        // 1. Creiamo un AbortController per la pulizia
        const controller = new AbortController();
        const signal = controller.signal;

        // 2. Eseguiamo la prima fetch (pagina 1)
        // Passiamo 'true' per 'reset' e il 'signal'
        getMovies(1, true, signal);

        // 3. Funzione di Cleanup di useEffect:
        // Se l'effect viene eseguito due volte (Strict Mode) o se il componente
        // viene smontato, questa funzione viene chiamata e annulla la fetch in corso.
        return () => {
            controller.abort();
            setLoading(false); // In caso di abort, resetta loading
        };
    }, []); // Array di dipendenze vuoto: si esegue solo al mount.

    // Il resto della logica del componente (return) rimane invariato

    return (
        <>
            <Navbar />
            <div className="movies-page">
                <div>
                    <h1>Esplora tutti i Film</h1>
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>

                    {loading && <h3 className='loading-message'>Caricamento in corso...</h3>}

                    {!loading && hasMore && (
                        <button onClick={loadMore} className="load-more-btn">
                            Carica Altri Film
                        </button>
                    )}

                    {!hasMore && !loading && movies.length > 0 && (
                        <p className='end-message'>Hai raggiunto la fine dei risultati di TMDB.</p>
                    )}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Movies;