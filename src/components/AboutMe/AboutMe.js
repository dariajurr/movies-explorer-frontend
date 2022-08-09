import React from 'react';
import image from '../../images/aboutMe.jpg';
import './AboutMe.css';

function AboutMe() {
  return ( 
    <section className='aboutMe'>
        <h2 className='aboutMe__title h2-heading'>Студент</h2>     
        <div className='aboutMe__info'>
            <div className='aboutMe__info-text'>
                <h3 className='aboutMe__info-title'>Виталий</h3>
                <p className='aboutMe__info-subtitle'>Фронтенд-разработчик, 30 лет</p>
                <p className='aboutMe__info-description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <a className='aboutMe__info-link' href='https://github.com/dariajurr'>Github</a>
            </div>
            <img className='aboutMe__info-image' src={image} alt='моё фото'/>
        </div>
        <div className='aboutMe__portfolio'>
            <h3 className='aboutMe__portfolio-title'>Портфолио</h3>
            <ul className='aboutMe__portfolio-items'>
                <li className='aboutMe__portfolio-item'>
                    <a href='https://dariajurr.github.io/how-to-learn/' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Статичный сайт</a>
                    </li>
                <li className='aboutMe__portfolio-item'>
                    <a href='https://dariajurr.github.io/russian-travel/' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Адаптивный сайт</a>
                    </li>
                <li className='aboutMe__portfolio-item'>
                    <a href='dariajurr.students.nomoredomains.xyz' target='_blank' className='aboutMe__portfolio-link' rel="noreferrer">Одностраничное приложение</a>
                    </li>
            </ul>
        </div>
   </section>
  );
}

export default AboutMe;