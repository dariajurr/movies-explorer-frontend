import React from 'react';
import './SignUp.css'
import AuthForm from '../AuthForm/AuthForm';

function SignUp({onSubmit}) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    function handleChangeName(e) {
        setName(e.target.value);
    };

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    };

    function handleChangePassword(e) {
        setPassword(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault()        
        onSubmit(name, password, email);
    };

    return (
        <AuthForm 
            userName = {true}
            name='sigup' 
            title='Добро пожаловать!' 
            textBtn='Войти'
            textSubTitle='Уже зарегистрированы?'
            textLink='Войти'
            hrefLink='signin'
            onSubmit={handleSubmit} 
            onChangeEmail={handleChangeEmail} 
            onChangePassword={handleChangePassword}
            onChangeName = {handleChangeName}
        >
            <label htmlFor='input-authForm-name' className='authForm__label'>Имя</label>
            <input    
                        id='input-authForm-name'
                        type='text'
                        name='name'
                        autoComplete="on"
                        className='authForm__input'
                        onChange={handleChangeName}                       
                        required
                        />
        </AuthForm>

    )
}
export default SignUp;