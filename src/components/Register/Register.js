import React, { useRef } from 'react';
import "./Register.css";
import useFormWithValidation from '../../hooks/useFormValidator';
import closedEye from '../../images/eye-closed_icon.svg';
import openEye from '../../images/eye-open_icon.svg';
import loading_icon from '../../images/loading-icon_color-white.png';

function Register(props) {
    const passwordInputRef = useRef(null);
    const [isVisible, setVisible] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const { values, handleChange, handleSubmit, errors, isValid } = useFormWithValidation(props.handleSubmit);

    function checkThePasswordsMatch(e) {
        e.target.value === passwordInputRef.current.value ?
            e.target.setCustomValidity('') : e.target.setCustomValidity('Пароли не совпадают');
        handleChange(e);
    }

    function handleRegister(e) {
        setLoading(true);
        handleSubmit(e);
        setLoading(false);
    }

    return (
        <form className='register__form' onSubmit={handleRegister} >
            <input className='register__input' name='name' placeholder='Имя' value={values?.name}
                onChange={handleChange} minLength={4} maxLength={40} required />
            <span className="register__input-error">{errors?.name}</span>
            <input className='register__input' placeholder="E-mail" type='email' name="email" value={values?.email}
                onChange={handleChange} minLength={2} required
                pattern='^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-zA-Z]{2,}$' />
            <span className="register__input-error">{errors?.email}</span>
            <div className='register__password-container'>
                <input className='register__input' name='password' type={isVisible ? 'text' : 'password'} placeholder="Пароль"
                    value={values?.password} onChange={handleChange} minLength={4} maxLength={28} ref={passwordInputRef} required
                />
                <img src={isVisible ? openEye : closedEye} className='register__visibility-icon' alt='Видимость'
                    onClick={() => { setVisible(!isVisible) }} />
            </div>
            <span className="register__input-error">{errors?.password}</span>
            <input className='register__input' name='repeatPassword' placeholder='Повторите пароль'
                onChange={checkThePasswordsMatch} type='password' value={values?.repeatPassword} required />
            <span className="register__input-error">{errors?.repeatPassword}</span>
            <button className={isValid ? 'register__button' : 'register__disable-button register__button'}
                disabled={isValid ? false : true} type='submit'>
                {isLoading ?
                    <img className='register__loading-icon' src={loading_icon} alt='Загрузка' /> :
                    <span className='register__button-text'>Регистрация</span>
                }
            </button>
            <div className='register__link-container'>
                <h3 className='register__link-text'>Уже есть аккаунт? <span className='register__link' onClick={props.changeAuth}>Вход</span></h3>
            </div>
        </form>
    )
}

export default Register;
