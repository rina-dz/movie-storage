import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <p className='footer__text'>© 2025 <span className='footer__name'>Дзядзина Арина</span></p>
                <Link className='footer__link' to='https://www.omdbapi.com/'>OMDb API</Link>
                <Link className='footer__link' to='https://github.com/rina-dz'>GitHub</Link>
            </div>
        </footer>
    )
}

export default Footer;
