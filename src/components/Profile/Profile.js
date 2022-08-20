import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

function Profile(props) {
    const history = useHistory();
    const { currentUser } = React.useContext(CurrentUserContext);
    const [name , setName] = React.useState(currentUser.name);
    const [email, setEmail ] = React.useState(currentUser.email);
    const [isEdit, setIsEdit] = React.useState(true);

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser, isEdit]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handlEdit() {
        setIsEdit(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onSubmit({
          name,
          email
        });

        setIsEdit(true);
    }

    function signOut() {
        localStorage.removeItem('user');
        props.signOut();
        history.push('/signin');
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
                            onChange={handleChangeName}
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
                            onChange={handleChangeEmail}
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
                    <span className="profile__input-error">&nbsp;</span>
                    <button type='submit' className={`profile__btn profile__save-btn ${isEdit && 'profile__item_display_none'}`}>Сохранить</button>
                </form>
                <button type='button' className={`profile__btn profile__edit-btn ${!isEdit && 'profile__item_display_none'}`} onClick={handlEdit}>Редактировать</button>
                <button className={`profile__signOut-btn ${!isEdit && 'profile__item_display_none'}`} onClick={signOut}>Выйти из аккаунта</button>
            </section>
        </> 
    );
    }

export default Profile;