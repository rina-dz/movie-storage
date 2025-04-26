import React from 'react';
import "./Header.css";
import SearchPopup from '../SearchPopup/SearchPopup';
import { Link } from 'react-router-dom';
import search_icon from '../../images/search-icon.png';
import loading_icon from '../../images/loading-icon_color-black.svg';
import profile_icon from '../../images/profile-icon.svg'
import favorite_icon from '../../images/favorite_icon.svg';

function Header(props) {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const [nameValue, setNameValue] = React.useState('');
    const [tipVisibility, setTipVisibility] = React.useState(false);
    const [searchedMovie, changeSearchedMovie] = React.useState({});
    const [isPopupOpen, setPopupOpen] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    let path = window.location.pathname;
    const containerClassName = isLoggedIn ? "header__container" : "header__container unlogged-container";

    function handleNameChange(e) {
        setNameValue(e.target.value);
        setTipVisibility(true);
        if (e.target.value.length === 8) {
            setTipVisibility(false);
            setLoading(true);
            let refusal = {
                Response: false,
            }
            props.getMovieById(e.target.value)
                .then((movie) => {
                    console.log(movie)
                    if (movie !== undefined) {
                        if (movie.Response && movie.Response !== 'False') {
                            changeSearchedMovie(movie);
                            setPopupOpen(true);
                        } else {
                            refusal.error = 'Фильм не найден :c';
                            changeSearchedMovie(refusal);
                            setPopupOpen(true);
                        }
                    } else {
                        refusal.error = 'Фильм не найден :c';
                        changeSearchedMovie(refusal);
                        setPopupOpen(true);
                    }
                })
                .catch(() => {
                    refusal.error = 'Произошла ошибка на сервере :c';
                    changeSearchedMovie(refusal);
                    setPopupOpen(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    function handleNameDelete() {
        setNameValue('');
        setTipVisibility(false);
        changeSearchedMovie({});
        setPopupOpen(false);
    }

    return (
        <header className="header">
            <div className='header__main-container'>
                <Link className='header__main-logo' to='/' />
                <form className='header__search-form' onBlur={() => { setPopupOpen(false) }}
                    onFocus={() => { 'Response' in searchedMovie ? setPopupOpen(true) : setPopupOpen(false) }}>
                    {tipVisibility ?
                        <p className='header__form-tip'>Введите imdbID полностью! Н-р: tt13406094</p> : ''
                    }
                    <SearchPopup isOpen={isPopupOpen} searchedMovie={searchedMovie} navigateToMovie={props.navigateToMovie} />
                    <img className="header__search-icon" src={search_icon} alt="Иконка поиска" />
                    <input className='header__search-input' placeholder="Введите imdbID"
                        onChange={handleNameChange} value={nameValue || ""} maxLength={10} />
                    {nameValue ?
                        isLoading ? <img className='header__loading-icon' src={loading_icon} alt='Загрузка' /> :
                            <button className='header__delete-button' onClick={handleNameDelete} />
                        : ''
                    }
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