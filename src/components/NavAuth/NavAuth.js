import React from 'react';
import { Link } from 'react-router-dom';
import './NavAuth.css';

function NavAuth() {
  return ( 
    <ul className='NavAuth'>
      <li className="NavAuth__item">
        <Link to="/movies" className="NavAuth__link">Фильмы</Link>
      </li>
      <li className="NavAuth__item">
        <Link to="/saved-movies " className="NavAuth__link">Сохранённые фильмы</Link>
      </li>
      <li className="NavAuth__item NavAuth__item_gray">
        <Link to="/profile" className="NavAuth__link">Аккаунт</Link>
      </li>
    </ul> 
  );
}

export default NavAuth;