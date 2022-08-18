import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, saved=[]}) {
    return (
        <section className='moviesCardList'>
            <div className='moviesCardList__items'>
                {movies.map((movie) => (          
                <MoviesCard movie={movie} key={movie.id} saved={saved}/>
                ))}
            </div>
            { movies.length >= 12 && <button className="moviesCardList__more-btn">Ещё</button>}
        </section>
    );
}

export default MoviesCardList;