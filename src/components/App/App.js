import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { PopUpContext } from '../../contexts/PopUpContext';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { setLocal } from '../../utils/utils.js';
import { useCurrentWidth } from '../../hooks/useCaurrentWidth';

function App() {
  const history = useHistory();
  const location = useLocation();
  const width = useCurrentWidth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, getUserInfo] =  useState([]);
  const [navPopupOpen, setNavPopupOpen] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const JWT = localStorage.getItem('user');
    if (JWT) {
      auth.valid(JSON.parse(JWT).token)
        .then((res) => {
          if (!res) {
            setLoggedIn(false);
            localStorage.removeItem('user');
            history.push('/signin');
          } else {
            setLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => console.error(err));
    }
  }
  
  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getProfileInfo(), api.getMovies()])
      .then(([info, savedMovies]) => {
        getUserInfo(info);
        setLocal('savedMovies', savedMovies);
      })
    .catch((err) => console.log(err)); 
    }
  }, [loggedIn]);

  function handleNavPopupClick() {
    setNavPopupOpen(true);
  }

  function closePopup() {
    setNavPopupOpen(false);
  }

  function handleUpdateUser(data) {
    getUserInfo(data);
  }

  function signOut () {
    setLoggedIn(false);
    localStorage.clear();
  };
  
  return (
    <CurrentUserContext.Provider value={{loggedIn, currentUser}}>    
      <PopUpContext.Provider value={{handleNavPopupClick, closePopup, width}}>
        <div className="App">
          <Switch> 
            <Route exact path="/">     
              <Main/>
            </Route>    
            <Route path="/signin">  
              {loggedIn ? <Redirect to="/"/> : <SignIn setLoggedIn={setLoggedIn}/>}   
            </Route>
            <Route path="/signup">
              {!loggedIn ? <SignUp setLoggedIn={setLoggedIn}/> : <Redirect to="/"/>}     
            </Route>   
            <Route path="/movies">
              <ProtectedRoute        
                component={Movies}
              />
            </Route>    
            <Route path="/saved_movies">
              <ProtectedRoute 
                component={SavedMovies}
              />  
            </Route>    
            <Route path="/profile">
              <ProtectedRoute 
                component={Profile}
                onSubmit={handleUpdateUser}
                onSignOut={signOut}
              />
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