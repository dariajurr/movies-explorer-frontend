import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({movies, saved}) {
  return (
    <>
      <Header/>
      <main className='movies'>
          <SearchForm/>
          <MoviesCardList movies = {movies} saved = {saved} />
          <Preloader/>
      </main>
      <Footer/>
    </> 
  );
}

export default Movies;