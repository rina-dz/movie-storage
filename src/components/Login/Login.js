import React from 'react';
import "./Login.css";
import useFormWithValidation from '../../hooks/useFormValidator';
import closedEye from '../../images/eye-closed_icon.svg';
import openEye from '../../images/eye-open_icon.svg';
import loading_icon from '../../images/loading-icon_color-white.png';

function Login(props) {
    const [isVisible, setVisible] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const { values, handleChange, handleSubmit, errors, isValid } = useFormWithValidation(props.handleSubmit);

    function handleLogin(e) {
        setLoading(true);
        handleSubmit(e);
        setLoading(false);
    }

    return (
        <form className='login__form' onSubmit={handleLogin}>
            <input className='login__input' placeholder="E-mail" type='email' name="email" value={values?.email}
                onChange={handleChange} minLength={2} required pattern='^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-zA-Z]{2,}$' />
            <span className="login__input-error">{errors?.email}</span>
            <div className='login__password-container'>
                <input className='login__input' name='password' type={isVisible ? 'text' : 'password'} placeholder="Пароль"
                    value={values?.password} onChange={handleChange} minLength={4} maxLength={28} required
                />
                <img src={isVisible ? openEye : closedEye} className='login__visibility-icon' alt='Видимость'
                    onClick={() => { setVisible(!isVisible) }} />
            </div>
            <span className="login__input-error">{errors?.password}</span>
            <button className={isValid ? 'login__button' : 'login__disable-button login__button'}
                disabled={isValid ? false : true} type='submit'>
                {isLoading ?
                    <img className='login__loading-icon' src={loading_icon} alt='Загрузка' /> :
                    <span className='login__button-text'>Войти</span>
                }
            </button>
            <div className='login__link-container'>
                <h3 className='login__link-text'>Ещё нет аккаунта? <span className='login__link' onClick={props.changeAuth}>Регистрация</span></h3>
            </div>
        </form>
    )
}

export default Login;
