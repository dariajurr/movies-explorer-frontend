import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const history = useHistory();
    
    function goBack () {
        history.goBack();
    }

    return (
        <section className='notFound'>
            <h1 className='notFound__title'>404</h1>
            <p className='notFound__subtitle'>Страница не найдена</p>
            <button className="notFound__btn" onClick={goBack}>
                Назад
            </button>
        </section>
    );
}
export default NotFound;