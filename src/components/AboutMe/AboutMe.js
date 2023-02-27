import React from 'react';
import image from '../../images/aboutMe.jpg';
import './AboutMe.css';

function AboutMe() {
  return ( 
    <section className='aboutMe'>
        <h2 className='aboutMe__title h2-heading'>Студент</h2>     
        <div className='aboutMe__info'>
            <div className='aboutMe__info-text'>
                <h3 className='aboutMe__info-title'>Дарья</h3>
                <p className='aboutMe__info-subtitle'>Фронтенд-разработчик, 28 лет</p>
                <p className='aboutMe__info-description'>Начинающий frontend-разработчик, поклонник путешествий и пушистых животных. Живу в Красноярске. Работаю в небольшой студии по разработке сайтов.</p>
                <a className='aboutMe__info-link' href='https://github.com/dariajurr' target='_blank' rel="noreferrer">Github</a>
            </div>
            <img className='aboutMe__info-image' src={image} alt='моё фото'/>
        </div>
        <div className='aboutMe__portfolio'>
            <h3 className='aboutMe__portfolio-title'>Портфолио</h3>
            <ul className='aboutMe__portfolio-items'>
                <li className='aboutMe__portfolio-item'>
                    <a href='https://dariajurr.github.io/how-to-learn/' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Статичный сайт <span className='aboutMe__portfolio-icon'>&#x2197;</span></a>
                    </li>
                <li className='aboutMe__portfolio-item'>
                    <a href='https://dariajurr.github.io/russian-travel/' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Адаптивный сайт <span className='aboutMe__portfolio-icon'>&#x2197;</span></a>
                    </li>
                <li className='aboutMe__portfolio-item'>
                    <a href='https://mesto.dariajurr.site/' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Одностраничное приложение <span className='aboutMe__portfolio-icon'>&#x2197;</span></a>
                    </li>
            </ul>
        </div>
   </section>
  );
}

export default AboutMe;