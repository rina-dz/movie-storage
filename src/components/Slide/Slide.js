import React from 'react';
import './Slide.css';
import rateStar from '../../images/star-icon.svg';
//import { Link } from 'react-router-dom';

function Slide(props) {

    const { poster, title, rate } = props.movie;

    // мб убрать рейтинг и заменить его на год??
    // либо сделать два варианта слайда для топ-10 и для списка найденных фильмов
    // тк при search приходит массив с объектами, где нет параметра рейтинга
    // а при поиске по id он есть...

    // возможно перенести рейтинг выше названия, а также добавить кнопку 'добавить в избранное'
    // внизу slide (кнопка как в топе у ibdb)

    //добавить тени внутрь при наведении на каждый отдельный слайд
    

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
