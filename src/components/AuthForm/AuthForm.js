import React from 'react';
import './AuthForm.css';
import Logo from '../Logo/Logo';

function AuthForm({
    name, 
    title, 
    textBtn, 
    textSubTitle, 
    textLink, 
    hrefLink, 
    onSubmit, 
    isValid,
    error,
    children }) {
    return (
        <section className='authForm'>
            <div className='authForm__container'>
                <Logo/>
                <h2 className='authForm__title'>{title}</h2> 
                <form className='authForm__form' name={`${name}`} onSubmit={onSubmit} noValidate>
                    <div className='authForm__inputs'>                   
                        {children}                             
                        <p className='authForm__error-massage'>{error}&nbsp;</p>
                    </div>   
                <button type='submit' className='authForm__btn' disabled={!isValid}>{textBtn}</button>
                </form>                  
                <p className='authForm__subtitle'>{textSubTitle}<a className='authForm__link' href={`/${hrefLink}`}>{textLink}</a></p>
            </div>
        </section>        
    )
}
export default AuthForm;