import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import './App.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main'

function App() {
  const [currentUser, getUserInfo] =  React.useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">      
        <Header isUser={currentUser}/>
        <Main/>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;