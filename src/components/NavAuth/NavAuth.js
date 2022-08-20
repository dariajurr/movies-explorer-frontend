import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavAuth.css';
import { PopUpContext } from '../../contexts/PopUpContext';

function NavAuth({mainPage}) {
  const { closePopup } = React.useContext(PopUpContext)

  return ( 
    <ul className='navAuth'>
      {mainPage && <li className="navAuth__item">
                    <NavLink to="/" exact  className="navAuth__link" activeClassName="navAuth__link_active" onClick={closePopup}>Главная</NavLink>
                </li>}
      <li className="navAuth__item">
        <NavLink to="/movies" className="navAuth__link" activeClassName="navAuth__link_active" onClick={closePopup}>Фильмы</NavLink>
      </li>
      <li className="navAuth__item">
        <NavLink to="/saved_movies" className="navAuth__link" activeClassName="navAuth__link_active" onClick={closePopup}>Сохранённые фильмы</NavLink>
      </li>
      <li className="navAuth__item navAuth__item_right">
        <NavLink to="/profile" className="navAuth__link navAuth__link_gray" onClick={closePopup}>Аккаунт</NavLink>
      </li>
    </ul> 
  );
}

export default NavAuth;