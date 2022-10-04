import React from 'react';
import './Navigation.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { PopUpContext } from '../../contexts/PopUpContext';
import NavUnAuth from '../NavUnAuth/NavUnAuth';
import NavAuth from '../NavAuth/NavAuth';
import Humburger from '../Humburger/Humburger';

function Navigation() {
    const { loggedIn } = React.useContext(CurrentUserContext);
    const { width } = React.useContext(PopUpContext);

    return (
        <nav className='nav-menu'>
            { !loggedIn && <NavUnAuth/> }
            { width > 768 && loggedIn && <NavAuth/> }
            { width <= 768 && loggedIn && <Humburger/> }
        </nav>
    );
}

export default Navigation;