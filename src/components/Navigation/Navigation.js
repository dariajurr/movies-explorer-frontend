import React from 'react';
import { useState, useEffect } from 'react';
import './Navigation.css';
import NavUnAuth from '../NavUnAuth/NavUnAuth';
import NavAuth from '../NavAuth/NavAuth';
import Humburger from '../Humburger/Humburger';

function Navigation() {
    const [windowWidth, setWindiwWidth] = useState(window.innerWidth);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
    window.addEventListener("resize", function () {
        setWindiwWidth(window.innerWidth);
      });
    }, [windowWidth]);

    return (
        <nav className='nav-menu'>
            { !isUser && <NavUnAuth/> }
            { windowWidth > 768 && isUser && <NavAuth/> }
            { windowWidth <= 768 && isUser && <Humburger/> }
        </nav>
    );
}

export default Navigation;