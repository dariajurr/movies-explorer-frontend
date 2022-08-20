import React from 'react';
import image from '../../images/promo.png';
import './Promo.css';

function Promo() {
  return ( 
   <section className='promo'>
        <div className='promo__wrapper'>
            <h1 className='promo__title'>Учебный проект студента факультета <nobr>Веб-разработки.</nobr></h1>
            <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a className='promo__btn' href='#about'>Узнать больше</a>
        </div>
        <img src={image} alt='промо-картинка' className='promo__img'/>
   </section>
  );
}

export default Promo;