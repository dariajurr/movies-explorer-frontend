import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { EmailRegexp, NameRegexp } from '../../utils/constants';
import api from '../../utils/MainApi';

function Profile(props) {
    const history = useHistory();
    const { currentUser } = React.useContext(CurrentUserContext);
    const [name , setName] = React.useState(currentUser.name);
    const [email, setEmail ] = React.useState(currentUser.email);
    const [isEdit, setIsEdit] = React.useState(true);
    const [isValid, setIsValid] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [succesMsg, setSuccesMsg] = React.useState("");
    const [nameIsValid, setNameIsValid] = React.useState(true);
    const [emailIsValid, setEmailIsValid] = React.useState(true);

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser, isEdit]); 

    React.useEffect(() => {
        if (nameIsValid && emailIsValid && (name !== currentUser.name || email !== currentUser.email)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, email]); 

    function handleChangeName(e) {
        setName(e.target.value);

        if (NameRegexp.test(e.target.value)) {
            setNameIsValid(true);
            setErrorMsg('');
        } else {
            setNameIsValid(false);
            setErrorMsg('Имя должно быть длиннее 2 и короче 30 букв');
        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);

        if (EmailRegexp.test(e.target.value)) {
            setEmailIsValid(true);
            setIsValid(true);
            setErrorMsg('');
        } else {
            setEmailIsValid(false);
            setErrorMsg('Неверный формат Email');
        }
    }

    function handlEdit() {
        setSuccesMsg('');
        setIsEdit(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsValid(false);
        api.setProfileInfo({
            name,
            email
        })
        .then(res => {
            if (res.message) {  
                setIsValid(false); 
                setEmailIsValid(false);
                setErrorMsg(res.message);     
            } else {
                props.onSubmit({
                    name,
                    email
                });
                setIsEdit(true);
                setSuccesMsg('Данные успешно изменены');
            }            
        })
        .catch((err) => console.log(err));
    }

    function signOut() {
        props.onSignOut();
        history.push('/');
    }

    return (
        <>
            <Header/>
            <section className='profile'>
                <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
                <form name='edit-profile' className='profile__form' onSubmit={handleSubmit}>
                    <div className="profile__input-span-group">
                        <label htmlFor='input-name' className='profile__label'>Имя</label>
                        <input
                            value={name || ''} 
                            onInput={handleChangeName}
                            id='input-name'
                            type='text'
                            name='name'
                            className='profile__input'
                            minLength='2'
                            maxLength='30'
                            required
                            disabled={isEdit}
                        />
                    </div>
                    <div className="profile__input-span-group">
                        <label htmlFor='input-email' className='profile__label'>Email</label>
                        <input
                            value={email || ''} 
                            onInput={handleChangeEmail}
                            id='input-email'
                            type='text'
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                            name='about'
                            className='profile__input'
                            minLength='2'
                            maxLength='200'
                            required
                            disabled={isEdit}
                        />
                    </div>
                    <span className={`profile__span-text ${errorMsg && 'profile__span-text_error'} ${succesMsg && 'profile__span-text_succes'}`}>
                        {!isValid && errorMsg}
                        {isValid && succesMsg}
                        &nbsp;
                    </span>
                    <button type='submit' className={`profile__btn profile__save-btn ${isEdit && 'profile__item_display_none'}`} disabled={!isValid}>Сохранить</button>
                </form>
                <button type='button' className={`profile__btn profile__edit-btn ${!isEdit && 'profile__item_display_none'}`} onClick={handlEdit}>Редактировать</button>
                <button className={`profile__signOut-btn ${!isEdit && 'profile__item_display_none'}`} onClick={signOut}>Выйти из аккаунта</button>
            </section>
        </> 
    );
    }

export default Profile;