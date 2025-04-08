import React from 'react';
import './Slide.css';
import rateStar from '../../images/star-icon.svg';
//import { Link } from 'react-router-dom';

function Slide(props) {

    const { poster, title, rate } = props.movie;
    

    return (
        <aside className='slide'>
            <img className='slide__poster' alt='Постер фильма' src={poster} />
            <div className='slide__text-container'>
                <h3 className='slide__title'>{title}</h3>
                <p className='slide__rate'>IMD рейтинг: <span className='slide__rate-span'>
                    <img src={rateStar} className='slide__star-icon' alt='Звёздочка' />
                    {rate}</span></p>
            </div>
        </aside>
    )
}

export default Slide;
