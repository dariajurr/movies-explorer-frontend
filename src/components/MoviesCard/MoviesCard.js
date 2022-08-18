import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({movie, saved=[]}) {
    const location = useLocation();
    const [locPath, setLocPath] = useState(location.pathname);

    useEffect(() => {
        setLocPath(location.pathname);
    }, [location.pathname]);

  return (
    <article className={`movieCard ${saved.some(el => el._id === movie._id) && 'movieCard_saved'}`}>
        {locPath === '/movies' && <button type="button" className="movieCard__btn movieCard__save-btn">Сохранить</button>}
        {locPath === '/saved_movies' && <button type="button" className="movieCard__btn movieCard__delete-btn">&#10006;</button>}
        <a className='movieCard__link' href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className='movieCard__image'/>
        </a>
        <div className="movieCard__info">
            <h2 className="movieCard__title">{movie.nameRU}</h2>
            <p className="movieCard__duration">{movie.duration}</p>
        </div>
    </article>
  );
}

export default MoviesCard;