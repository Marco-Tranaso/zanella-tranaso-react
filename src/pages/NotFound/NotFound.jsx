import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">Ops! Qualcosa è andato storto</h1>
        <div className="notfound-code">404</div>
        <p className="notfound-message">
          Ci dispiace, non riusciamo a trovare la pagina che stai cercando.
        </p>
        <p className="notfound-submessage">
          Potresti trovare ciò che cerchi sulla home page.
        </p>
        <div className="notfound-buttons">
          <button className="notfound-btn primary" onClick={() => navigate('/')}>
            Torna alla Home
          </button>
          <button className="notfound-btn secondary" onClick={() => navigate(-1)}>
            Indietro
          </button>
        </div>
        <div className="notfound-links">
          <p>Codice errore: <strong>NSES-404</strong></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;