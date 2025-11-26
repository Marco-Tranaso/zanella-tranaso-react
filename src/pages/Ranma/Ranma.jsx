import React from 'react';
import { useNavigate } from 'react-router-dom';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import './Ranma.css';

const Trailer = () => {
  const navigate = useNavigate();

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Indietro"
        className="back-arrow"
        onClick={() => navigate(-1)}
      />

      <iframe
        src="https://www.youtube.com/embed/qf_pRksXtTw?si=8PkctPic__mqcfs5"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
