import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useCurrentWidth } from '../../hooks/useCaurrentWidth';
import { getLoadStep, getInitalCount } from '../../utils/utils';

function MoviesCardList({ movies, error, changeLikeStatus }) {
    const location = useLocation();
    const width = useCurrentWidth();
    const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitalCount(width));
    const [locPath, setLocPath] = useState(location.pathname);
    
    useEffect(() => {
        
        if (locPath === '/saved_movies') {
            setVisibleMoviesCount(movies.length);
        }
        
        setLocPath(location.pathname);

    }, [locPath]);

    

    function hadleLoadMore () {
        setVisibleMoviesCount((prevCount)=> prevCount + getLoadStep(width));
    }

    return (
        <section className='moviesCardList'>
            <div className='moviesCardList__items'>
                { !error && movies.slice(0, visibleMoviesCount).map((movie) =>           
                    <MoviesCard movie={movie} key={movie.id || movie._id} changeLikeStatus={changeLikeStatus}/>
                )}
            </div>
            { locPath === '/movies' && visibleMoviesCount< movies.length && 
                <button className="moviesCardList__more-btn" onClick={hadleLoadMore}>Ещё</button>
            }
        </section>
    );
}

export default MoviesCardList;