import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({movie, changeLikeStatus}) {
    const location = useLocation();
    const [locPath, setLocPath] = useState(location.pathname);
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        setLocPath(location.pathname);
        if (locPath === '/movies') {
          setBaseUrl('https://api.nomoreparties.co');
        }
        if (locPath === '/saved_movies') {
          setBaseUrl('');
        }
    }, [locPath]);

    function getDuration (duration) {
      const hours = Math.trunc(duration/60);
      const minutes = duration%60; 
      
      return `${hours} ч ${minutes} м`
    }

    function hadleLikeClick(e) {
      e.preventDefault();
      changeLikeStatus(movie, movie.isSaved);
    }

  return (
    <article className='movieCard'>
        {locPath === '/movies' && movie.isSaved &&<button type="button" className="movieCard__btn-saved" onClick={hadleLikeClick}></button>}
        {locPath === '/movies' && !movie.isSaved && <button type="button" className="movieCard__btn movieCard__save-btn" onClick={hadleLikeClick}>Сохранить</button>}
        {locPath === '/saved_movies' && <button type="button" className="movieCard__btn movieCard__delete-btn" onClick={hadleLikeClick}>&#10006;</button>}
        <a className='movieCard__link' href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img src={`${baseUrl}${movie.image.url||movie.image}`} alt={movie.nameRU} className='movieCard__image'/>
        </a>
        <div className="movieCard__info">
            <h2 className="movieCard__title">{movie.nameRU}</h2>
            <p className="movieCard__duration">{getDuration(movie.duration)}</p>
        </div>
    </article>
  );
}

export default MoviesCard;