import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className='about' id='about'>
        <h2 className='about__title h2-heading'>О проекте</h2>
        <ul className='about__features'>
            <li className='about__feature'>
                <h3 className='about__feature-title'>Дипломный проект включал 5 этапов</h3>
                <p className='about__feature-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className='about__feature'>
                <h3 className='about__feature-title'>На выполнение диплома ушло 5 недель</h3>
                <p className='about__feature-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
        </ul>
        <div className='about__timing'>
          <div className='about__timing-item about__timing-item_weeks_one'>
            <h3 className='about__timing-title'>1 неделя</h3>
            <p className='about__timing-subtitle'>Back-end</p>
          </div>
          <div className='about__timing-item about__timing-item_weeks_four'>
            <h3 className='about__timing-title'>4 недели</h3>
            <p className='about__timing-subtitle'>Front-end</p>
          </div>
        </div>
    </section>
  );
}

export default AboutProject;