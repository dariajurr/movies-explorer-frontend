import React, {useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import auth from '../../utils/Auth.js';
import api from '../../utils/MainApi.js';
import MoviesApi from '../../utils/MoviesApi.js';

//временные файлы
import saved from '../../utils/dsvedMovies.json';
import movie from '../../utils/movies.json';
import user from '../../utils/users.json';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, getUserInfo] =  React.useState(user);
  const [movies, setMovies] = React.useState(movie);
  const [navPopupOpen, setNavPopupOpen] = React.useState(false);

  /*useEffect(() => {
    const tokenCheck = () => {
      const JWT = localStorage.getItem('user');
      if (JWT) {    
        auth.valid(JSON.parse(JWT).token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              history.push('/');
            }
          })
          .catch((err) => console.error(err));
      }
    };
    tokenCheck();
  }, [history, loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getProfileInfo(), MoviesApi.getMovies()])
      .then(([res, data]) => {
        getUserInfo(res);
        setMovies(data);
      })
    .catch((err) => console.log(err)); 
    }
  }, [loggedIn]);*/

  function handleNavPopupClick() {
    setNavPopupOpen(true);
  }

  function closePopup() {
    setNavPopupOpen(false);
  }

  function handleUpdateUser(data) {
    /*api.setProfileInfo(data)
      .then(res => {
        getUserInfo(res);
    })
    .catch((err) => console.log(err));*/
  }

  function signUp (name, password, email) {
    auth.signup(name, password, email)
    .then((res) => {  
      if (res) {        
        history.push('/signin');
      }
    })
    .catch((err) => {
      console.log(err)
    });
  };

  function signIn (password, email) {
    auth.signin(password, email)
    .then(res => {  
      localStorage.setItem('user', JSON.stringify({
        token: res.token
      }));   
      setLoggedIn(true);  
      history.push('/');
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function signOut () {
    console.log();
    setLoggedIn(false);
    history.push('/signin');
  };
  
  return (
    <CurrentUserContext.Provider value={{loggedIn, currentUser}}>    
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
              <Profile onSubmit={handleUpdateUser} signOut={signOut}/>
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