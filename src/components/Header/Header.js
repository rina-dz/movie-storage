import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import search__icon from '../../images/search-icon.png';
import profile_icon from '../../images/profile-icon.svg'


function Header(props) {
    const [nameValue, setNameValue] = React.useState('');

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
                <Link className="header__container" to={props.isLoggedIn ? "/profile" : '/log-in'}>
                    <img className="header__container-icon" src={profile_icon} alt="Иконка профиля" />
                    <p className="header__container-title">{props.isLoggedIn ? "Профиль" : 'Войти'}</p>
                </Link>
            </div>
        </header>
    )
}

export default Header;