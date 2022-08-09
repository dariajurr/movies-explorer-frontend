import React from 'react';
import './Techs.css';


function Techs() {
  return (
    <section className='techs'>
        <h2 className='techs__title h2-heading'>Технологии</h2>
        <div className='techs__content'>
            <h3 className='techs__content-title'>7 технологий</h3>
            <p className='techs__content-subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__content-items'>
                <li className='techs__content-item'>HTML</li>
                <li className='techs__content-item'>CSS</li>
                <li className='techs__content-item'>JS</li>
                <li className='techs__content-item'>React</li>
                <li className='techs__content-item'>Git</li>
                <li className='techs__content-item'>Express.js</li>
                <li className='techs__content-item'>mongoDB</li>
            </ul>
        </div>
    </section>
  );
}

export default Techs;