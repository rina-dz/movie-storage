import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import search__icon from '../../images/search-icon.png';
import profile_icon from '../../images/profile-icon.svg'
import favorite_icon from '../../images/favorite_icon.svg';

function Header() {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const [nameValue, setNameValue] = React.useState('');
    let path = window.location.pathname;
    const containerClassName = isLoggedIn ? "header__container" : "header__container unlogged-container";

    function handleNameChange(e) {
        setNameValue(e.target.value);
    }

    function handleNameDelete() {
        setNameValue('');
    }

    return (
        <header className="header">
            <div className='header__main-container'>
                <Link className='header__main-logo' to='/' />
                <form className='header__search-form'>
                    <img className="header__search-icon" src={search__icon} alt="Иконка поиска" />
                    <input className='header__search-input' placeholder="Название фильма" onChange={handleNameChange} value={nameValue || ""} />
                    {nameValue ? <button className='header__delete-button' onClick={handleNameDelete} /> : ''}
                </form>
                {isLoggedIn ? (
                    <Link className={path === '/fav-movies' ? 'header__disable-link header__favorite-link' : 'header__enable-link header__favorite-link'} to='/fav-movies'>
                        <img className='header__favorite-icon' src={favorite_icon} alt='Избранное' />
                    </Link>
                ) : ('')}
                <Link className={path === '/profile' ? `header__disable-link ${containerClassName}` : `header__enable-link ${containerClassName}`}
                    to={isLoggedIn ? "/profile" : '/auth'}>
                    <img className="header__container-icon" src={profile_icon} alt="Иконка профиля" />
                    <p className="header__container-title">{isLoggedIn ? "Профиль" : 'Войти'}</p>
                </Link>
            </div>
        </header>
    )
}

export default Header;