import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import "./Profile.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header />
            <section className="profile">
                <div className='profile__main-container'>
                    <p className="profile__title">Привет, <span className='profile__custom-title'>{currentUser.name}</span>!</p>
                    <div className="profile__container">
                        <div className="profile__text-container">
                            <p className="profile__label">Имя</p>
                            <p className="profile__value">{currentUser.name}</p>
                        </div>
                        <div className="profile__text-container">
                            <p className="profile__label">E-mail</p>
                            <p className="profile__value">{currentUser.email}</p>
                        </div>
                    </div>
                    <div className="profile__links">
                        <Link className="profile__change-link" to="/profile-change">Редактировать</Link>
                        <Link className="profile__exit-link" to="/auth">Выйти из аккаунта</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}


export default Profile;



