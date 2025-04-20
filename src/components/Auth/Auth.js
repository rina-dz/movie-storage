import React from 'react';
import "./Auth.css";
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import backIcon from '../../images/arrow-left.svg';
import { Link } from 'react-router-dom';

function Auth(props) {
    const [isLogging, setLogging] = React.useState(true);

    function changeAuth() {
        setLogging(!isLogging);
    }

    return (
        <section className='auth'>
            <div className='auth__form-container'>
                <Link className='auth__icon-container' to='/'>
                    <img src={backIcon} className='auth__back-icon' alt='Назад' />
                </Link>
                <h2 className='auth__title'>{isLogging ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
                {isLogging ?
                    <Login changeAuth={changeAuth} handleSubmit={props.handleLogin} /> :
                    <Register changeAuth={changeAuth} handleSubmit={props.handleRegister} />}
            </div>
        </section>
    )
}

export default Auth;