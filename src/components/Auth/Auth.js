import React from 'react';
import "./Auth.css";
import closedEye from '../../images/eye-closed_icon.svg';
import openEye from '../../images/eye-open_icon.svg';
import backIcon from '../../images/arrow-left.svg';
import { Link } from 'react-router-dom';

function Auth(props) {
    const [isLogging, setLogging] = React.useState(true);
    const [isVisible, setVisible] = React.useState(false);
    const [isInputsValid, setValidity] = React.useState(false);

    function changeVisibility() {
        setVisible(!isVisible);
    }

    function changeAuth() {
        setLogging(!isLogging);
    }


    return (
        <section className="auth">
            <div className='auth__form-container'>
                <Link className='auth__icon-container' to='/'>
                    <img src={backIcon} className='auth__back-icon' alt='Назад' />
                </Link>
                <h2 className='auth__title'>{isLogging ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
                <form className='auth__form'>
                    {isLogging ? '' : <input className='auth__input' name='name' placeholder='Имя' required />}
                    <input className='auth__input' name='email' placeholder="Email" required />
                    <div className='auth__password-container'>
                        <input className='auth__input' name='password' type={isVisible ? 'text' : 'password'} placeholder="Пароль" required />
                        <img src={isVisible ? closedEye : openEye} className='auth__visibility-icon' alt='Видимость' onClick={changeVisibility} />
                    </div>
                    {isLogging ? '' : <input className='auth__input' name='repeat-password' placeholder='Повторите пароль' type='password' required />}
                    <button className={isInputsValid ? 'auth__button' : 'auth__disable-button auth__button'}>
                        {isLogging ? <span className='auth__button-text'>Войти</span> : <span className='auth__button-text'>Регистрация</span>}
                    </button>
                    <div className='auth__link-container'>
                        <h3 className='auth__link-text'>{isLogging ? "Ещё нет аккаунта? " : 'Уже есть аккаунт? '}
                            <span className='auth__link' onClick={changeAuth}>{isLogging ? "Регистрация" : 'Вход'}
                            </span></h3>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Auth;