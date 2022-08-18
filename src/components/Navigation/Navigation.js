import React from 'react';
import { useState, useEffect } from 'react';
import './Navigation.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NavUnAuth from '../NavUnAuth/NavUnAuth';
import NavAuth from '../NavAuth/NavAuth';
import Humburger from '../Humburger/Humburger';

function Navigation() {
    const [windowWidth, setWindiwWidth] = useState(window.innerWidth);
    const {loggedIn} = React.useContext(CurrentUserContext);

    useEffect(() => {
    window.addEventListener("resize", function () {
        setWindiwWidth(window.innerWidth);
      });
    }, [windowWidth]);

    return (
        <nav className='nav-menu'>
            { !loggedIn && <NavUnAuth/> }
            { windowWidth > 768 && loggedIn && <NavAuth/> }
            { windowWidth <= 768 && loggedIn && <Humburger/> }
        </nav>
    );
}

export default Navigation;