import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
        <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className='footer__items'>
          <p className='footer__copyright'>&copy; 2020</p>
          <ul className='footer__links'>
            <li><a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a></li>
            <li><a className='footer__link' href='https://github.com/dariajurr'>Github</a></li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;