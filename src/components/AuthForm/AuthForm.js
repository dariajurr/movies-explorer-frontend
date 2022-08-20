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
    onChangeEmail, 
    onChangePassword,
    children }) {
    return (
        <section className='authForm'>
            <div className='authForm__container'>
                <Logo/>
                <h2 className='authForm__title'>{title}</h2> 
                <form className='authForm__form' name={`${name}`} onSubmit={onSubmit}>
                    <div className='authForm__inputs'>                   
                        {children}                             
                        <label htmlFor='input-authForm-email' className='authForm__label'>Email</label>
                        <input    
                        id='input-authForm-email'
                        type='email'
                        name='email'
                        autoComplete="on"
                        className='authForm__input'
                        onChange={onChangeEmail}                       
                        required
                        />
                        <label htmlFor='input-authForm-password' className='authForm__label'>Пароль</label>
                        <input 
                        id='input-authForm-password'
                        type='password'
                        name='password'
                        autoComplete="on"
                        className='authForm__input authForm__input-error'
                        onChange={onChangePassword}
                        required
                        />
                        <p className='authForm__error-massage'>Что-то пошло не так...</p>
                    </div>   
                <button type='submit' className='authForm__btn'>{textBtn}</button>
                </form>                  
                <p className='authForm__subtitle'>{textSubTitle}<a className='authForm__link' href={`/${hrefLink}`}>{textLink}</a></p>
            </div>
        </section>        
    )
}
export default AuthForm;