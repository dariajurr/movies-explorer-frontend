import React from 'react';
import { Route, Switch } from "react-router-dom";
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import {PopUpContext} from '../../contexts/PopUpContext';
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import SignIn from '../SignIn/SignIn.js';
import SignUp from '../SignUp/SignUp.js';
import NotFound from '../NotFound/NotFound.js';
import NavPopup from '../NavPopup/NavPopup.js';

//временные файлы
import card from '../../utils/movies.json';
import saved from '../../utils/dsvedMovies.json';
import user from '../../utils/users.json';

function App() {
  const [currentUser, getUserInfo] =  React.useState(user);
  const [movies, setCards] = React.useState(card);
  const [navPopupOpen, setNavPopupOpen] = React.useState(false);

  function handleNavPopupClick() {
    setNavPopupOpen(true);
  }

  function closePopup() {
    setNavPopupOpen(false);
  }

  function handleUpdateUser(data) {    
    getUserInfo(data);
  };

  function signUp (name, password, email) {
    console.log(name, password, email);
  }

  function signIn (password, email) {
    console.log(password, email);
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>    
      <PopUpContext.Provider value={{handleNavPopupClick, closePopup}}>
        <div className="App">
          <Switch> 
            <Route exact path="/">     
              <Main/>
            </Route>    
            <Route path="/movies">     
              <Movies movies = {movies} saved = {saved}/>
            </Route>  
            <Route path="/saved_movies">     
              <SavedMovies movies = {saved}/>
            </Route>
            <Route path="/profile">     
              <Profile onSubmit={handleUpdateUser}/>
            </Route>  
            <Route path="/signin">     
              <SignIn onSubmit={signIn}/>
            </Route>
            <Route path="/signup">     
              <SignUp onSubmit={signUp}/>
            </Route>        
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
          <NavPopup isOpen={navPopupOpen}/>
        </div>
        </PopUpContext.Provider>  
    </CurrentUserContext.Provider>
  );
}

export default App;