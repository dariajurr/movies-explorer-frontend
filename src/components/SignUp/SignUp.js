import React, { useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css'
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import { EmailRegexp, NameRegexp } from '../../utils/constants';
import auth from '../../utils/Auth';

function SignUp({setLoggedIn}) {
    const history = useHistory();
    const [isValid, setIsValid] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [nameIsValid, setNameIsValid] = React.useState(false);
    const [emailIsValid, setEmailIsValid] = React.useState(false);
    const [passwordIsValid, setPasswordIsValid] = React.useState(false);

    useEffect(() => {
        setErrorMsg("");
    
        if (nameIsValid && emailIsValid && passwordIsValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [nameIsValid, emailIsValid, passwordIsValid]);

    function handleSubmit(e){   
        e.preventDefault();
        
        const form = document.forms.signup;
        const elements = form.elements;
        const name = elements.name;
        const email = elements.email;
        const password = elements.password; 

        if (name.validity.valid && email.validity.valid && password.validity.valid) {
            auth.signup(name.value, password.value, email.value)
            .then((res) => { 
                if (res.message) {   
                    setErrorMsg(res.message);     
                } else {
                    auth.signin(email.value, password.value)
                    .then(res => {
                        if (res.token) {
                            localStorage.setItem('user', JSON.stringify({
                                token: res.token
                            }));   
                            setLoggedIn(true);
                            return history.push('/movies');
                        }
                        if (res.message) {   
                            setErrorMsg(res.message); 
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }

    function checkName (inputValue) {
        if (NameRegexp.test(inputValue)) {
            setNameIsValid(true);
            return true;
        } else {
            setNameIsValid(false);
            return false;
        }
    }

    function checkEmail (inputValue) {
        
        if (EmailRegexp.test(inputValue)) {
            setEmailIsValid(true);
            return true;
        } else {
            setEmailIsValid(false);
            return false;
        }
    }

    function checkPassword (inputValue) {
        if (inputValue.length >= 8) {
            setPasswordIsValid(true);
            return true;
        } else {
            setPasswordIsValid(false);
            return false;
        }
    }

    return (
        <AuthForm 
            userName = {true}
            name='signup' 
            title='Добро пожаловать!' 
            textBtn='Зарегистрироваться'
            textSubTitle='Уже зарегистрированы?'
            textLink='Войти'
            hrefLink='signin'
            onSubmit={handleSubmit} 
            isValid={isValid}
            error={errorMsg}
        >
            <Input 
            id='input-authForm-name2' 
            title='Имя' 
            validation={{minLength: "2", maxLength: "30"}} 
            checkValidation={checkName}
            type='text'
            name='name' 
            errMsg='Имя должно быть длиннее 2 и короче 30 букв' />

            <Input 
            id='input-authForm-email' 
            title='Email' 
            checkValidation={checkEmail}
            type='email'
            name='email' 
            errMsg='Неверный формат Email' />

            <Input 
            id='input-authForm-password' 
            title='Пароль'
            validation={{minLength: "8"}} 
            checkValidation={checkPassword}
            type='password'
            name='password' 
            errMsg='Пароль должен быть длинее 8 символов'/>
        </AuthForm>

    )
}
export default SignUp;