import React from 'react';
import './SignIn.css'
import AuthForm from '../AuthForm/AuthForm';

function SignIn({onSubmit}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    };

    function handleChangePassword(e) {
        setPassword(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault()        
        onSubmit(password, email);
    };

    return (
        <AuthForm 
            name='sigin' 
            title='Рады видеть!' 
            textBtn='Войти'
            textSubTitle='Ещё не зарегистрированы?'
            textLink='Регистрация'
            hrefLink='signup'
            onSubmit={handleSubmit} 
            onChangeEmail={handleChangeEmail} 
            onChangePassword={handleChangePassword}
        />

    )
}
export default SignIn;