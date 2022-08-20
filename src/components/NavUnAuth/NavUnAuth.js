import React from 'react';
import { Link } from 'react-router-dom';
import './NavUnAuth.css';

function NavUnAuth() {
  return ( 
    <ul className='NavUnAuth'>
      <li className="NavUnAuth__item">
        <Link to="/signup" className="NavUnAuth__link">Регистрация</Link>
      </li>
      <li className="NavUnAuth__item">
        <Link to="/signin" className="NavUnAuth__link NavUnAuth__link_green">Войти</Link>
      </li>
    </ul> 
  );
}

export default NavUnAuth;