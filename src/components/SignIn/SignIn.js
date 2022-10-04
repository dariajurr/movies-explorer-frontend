import React, { useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css'
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import auth from '../../utils/Auth';

function SignIn({setLoggedIn}) {
    const history = useHistory();
    const [isValid, setIsValid] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [emailIsValid, setEmailIsValid] = React.useState(false);
    const [passwordIsValid, setPasswordIsValid] = React.useState(false);

    useEffect(() => {
        setErrorMsg("");
    
        if (emailIsValid && passwordIsValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [emailIsValid, passwordIsValid]);

    function handleSubmit(e){  
        setIsValid(false); 
        e.preventDefault();
        
        const form = document.forms.signin;
        const elements = form.elements;
        const email = elements.email;
        const password = elements.password; 

        if (email.validity.valid && password.validity.valid) {
            auth.signin(password.value, email.value)
            .then((res) => { 
                if (res.message) {   
                    return setErrorMsg(res.message);     
                } 
                if (res.token) {
                    localStorage.setItem('user', JSON.stringify({
                        token: res.token
                    }));   
                    setLoggedIn(true);
                    return history.push('/movies');
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }


    function checkEmail (inputValue) {
        if (inputValue) {
            setEmailIsValid(true);
            return true;
        } else {
            setEmailIsValid(false);
            return false;
        }
    }

    function checkPassword (inputValue) {
        if (inputValue) {
            setPasswordIsValid(true);
            return true;
        } else {
            setPasswordIsValid(false);
            return false;
        }
    }

    return (
        <AuthForm 
            name='signin' 
            title='Рады видеть!' 
            textBtn='Войти'
            textSubTitle='Ещё не зарегистрированы?'
            textLink='Регистрация'
            hrefLink='signup'
            onSubmit={handleSubmit} 
            isValid={isValid}
            error={errorMsg}
        >
            <Input 
            id='input-authForm-email' 
            title='Email' 
            checkValidation={checkEmail}
            type='email'
            name='email' 
            errMsg='Полe email должно быть заполнено' />

            <Input 
            id='input-authForm-password' 
            title='Пароль'
            checkValidation={checkPassword}
            type='password'
            name='password' 
            errMsg='Полe пароль должно быть заполнено'/>
        </AuthForm>

    )
}
export default SignIn;