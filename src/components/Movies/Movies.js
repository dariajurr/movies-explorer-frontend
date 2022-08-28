import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { filterMovie, setLocal, getLocal } from '../../utils/utils';
import { checkSavedMovies, updateIsSaved } from '../../utils/utils';
import api from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

function Movies() {
  const [isLoader, setIsLoader] = useState(false);  
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState(getMovies());
  const [searchParams, setSearchParams] = useState(getLocal('searchParams'));

  useEffect(() => {
    const allMovies = getLocal('allMovies');

    if (allMovies.length === 0) {
      setIsLoader(true);
      MoviesApi.getMovies()
        .then(result => {
          setLocal("allMovies", result);

        api.getMovies()
          .then(result => {
            setLocal('savedMovies', result);
            const moviesLs = getLocal("allMovies");
            const handelesMovies = checkSavedMovies(moviesLs, result);

            setLocal("allMovies", handelesMovies);

            setMovies(handelesMovies);
            setIsLoader(false);
          })
          .catch((err) => {
          console.log(err);
          setError(true);
          });
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, []);

  function getMovies() {
    const allMovies = getLocal('allMovies');
    const filtredMovies = getLocal("filtredMovies");

    if (filtredMovies.length === 0) {
      localStorage.removeItem('searchParams');
      return allMovies;
    } else {
      return filtredMovies;
    }
  }

  function getSearchMovies(keyWords, isShort) {
    setIsLoader(true);
    setSearchParams({keyWords, isShort});

    const moviesLs = getLocal("allMovies");
    
    filterMovie(moviesLs, keyWords, isShort)
    .then(res => {
      if (!res) {
        setError(true);
        setIsLoader(false);
        return;
      }

      setLocal("filtredMovies", res);
      setLocal("searchParams", {keyWords, isShort});

      setMovies(res);
      setIsLoader(false);
    })
  }

  function handleMovieLike(data, isSaved) {
      const moviesLs = getLocal("allMovies");
      const moviesSearchLs = getLocal("filtredMovies");
      const savedMoviesLs = getLocal("savedMovies");
      
      api.changeLikeStatus(data, isSaved)
      .then(res => {
        if (res.movieId) {          
          res.isSaved = true;
          savedMoviesLs.push(res);

          updateIsSaved(moviesLs, data.id, {isSaved: true, movieId: res._id});
          updateIsSaved(moviesSearchLs, data.id, {isSaved: true, movieId: res._id});

          setLocal("allMovies", moviesLs);
          setLocal("filtredMovies", moviesSearchLs);
          setLocal("savedMovies", savedMoviesLs);
          
          setMovies(getMovies());
        }
        if (res.message === 'Карточка удалена') {
          res.isSaved = false;
          savedMoviesLs.forEach((mov, index, arr) => {
              if (data.id === mov.movieId) {
                arr.splice(index, 1);
              }
          })

          updateIsSaved(moviesLs, data.id, {isSaved: false, movieId: ''});
          updateIsSaved(moviesSearchLs, data.id, {isSaved: false, movieId: ''});

          setLocal("allMovies", moviesLs);
          setLocal("filtredMovies", moviesSearchLs);
          setLocal("savedMovies", savedMoviesLs);  

          setMovies(getMovies());
        }     
    })
  }

  function handleMessage() {
    if (error) {
      return `Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз`;
    } else if (!error && movies.length === 0) {
      return "Ничего не найдено";
    }
  }

  return (
    <>
      <Header/>
      <main className='allMovies'>
          <SearchForm getMovies = {getSearchMovies} searchParams = {searchParams}/>
          <MoviesCardList movies={movies} error={error} changeLikeStatus = {handleMovieLike}/>
          {!isLoader && handleMessage() && <p className="moviesCardList__message">{handleMessage()}</p> }
          {isLoader && <Preloader/>}
      </main>
      <Footer/>
    </> 
  );
}

export default Movies;