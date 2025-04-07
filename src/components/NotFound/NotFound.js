import React from 'react';
import "./NotFound.css";
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <section className="not-found">
            <div className='not-found__main-container'>
                <div className="not-found__text-container">
                    <h2 className="not-found__title">404</h2>
                    <p className="not-found__text">Страница не найдена</p>
                </div>
                <Link className="not-found__link" to="/">
                    <p4 className="not-found__link-text">Назад</p4>
                </Link>
            </div>
        </section>
    )
}

export default NotFound;
