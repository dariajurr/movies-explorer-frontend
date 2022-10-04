import React, { useState, useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { filterMovie, updateIsSaved, handleMessage, setLocal, getLocal } from '../../utils/utils';
import api from '../../utils/MainApi';

function SavedMovies() {
  const [error, setError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);  
  const [savedMovies, setSavedMovies] = useState(getLocal('savedMovies'));

  useEffect(() => {
    
  }, []);

  function getSearchSavedMovies(keyWords, isShort) {
    setIsLoader(true);

    const moviesLs = getLocal("savedMovies");
    
    filterMovie(moviesLs, keyWords, isShort)
    .then(res => {
      if (!res) {
        setError(true);
        setIsLoader(false);
        return;
      }

      setLocal("filtredSavedMovies", res);

      setSavedMovies(res);
      setIsLoader(false);
    })
  }

 function handleMovieLike(data, isSaved=true) {
    const allMoviesLs = getLocal('allMovies');
    const moviesSearchLs = getLocal("filtredMovies");
    const savedMoviesLs = getLocal('savedMovies');

    api.changeLikeStatus(data, isSaved)
    .then(res => {
      if (res.message === 'Карточка удалена') {  
        savedMoviesLs.forEach((mov, index, arr) => {
          if (data._id === mov._id) {
            arr.splice(index, 1);
          }
        }) 

        updateIsSaved(allMoviesLs, data.movieId, {isSaved: false, movieId: ''});
        updateIsSaved(moviesSearchLs, data.movieId, {isSaved: false, movieId: ''});

        setLocal("allMovies", allMoviesLs);
        setLocal("filtredMovies", moviesSearchLs);
        setLocal("savedMovies", savedMoviesLs);  

        setSavedMovies(savedMoviesLs);
      }        
    })
    .catch((err) => console.log(err));
}

  return (
    <>
      <Header/>
      <main className='savedMovies'>
          <SearchForm getMovies = {getSearchSavedMovies}/>
          <MoviesCardList movies = {savedMovies} changeLikeStatus={handleMovieLike} error={error}/>
          {!isLoader && <p className="moviesCardList__message">{handleMessage(error, savedMovies)}</p> }
          {isLoader && <Preloader/>}
      </main>
      <Footer/>
    </> 
  );
}

export default SavedMovies;