import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({movies}) {
  return (
    <>
      <Header/>
      <main className='savedMovies'>
          <SearchForm/>
          <MoviesCardList movies = {movies} />
      </main>
      <Footer/>
    </> 
  );
}

export default SavedMovies;