import React from 'react';
import './Input.css';

function Input({
    id, 
    title,
    validation={},
    checkValidation,
    type, 
    name, 
    errMsg, 
    }) {

    const [isValid, setIsValid] = React.useState(false);

    function hadleChange (e) {
        if (checkValidation(e.target.value)) {
            setIsValid(false)
        } else {
            setIsValid(true);
        }
    }   
        
    return (
        <>
        <label htmlFor={id} className='authForm__label'>{title}</label>
        <input 
            id={id}
            {...validation}
            type={type}
            name={name}
            autoComplete="on"
            className={`authForm__input ${isValid && 'authForm__input-error'}`}
            onInput={hadleChange}
            required
        />   
        <p className='authForm__error-massage'>{isValid && errMsg}&nbsp;</p> 
        </>
        
    )
}
export default Input;