import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Slide.css';
import rateStar from '../../images/star-icon.svg';
import heart_clicked from '../../images/heart-icon__clicked.png';
import heart_default from '../../images/heart-icon__default.png';
//import { Link } from 'react-router-dom';

function Slide(props) {

    const { poster, title, rate, year, imdbID } = props.movie;
    const [isLiked, setMovieLike] = React.useState(false);
    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        currentUser.favMovies.includes(imdbID) ? setMovieLike(true) : setMovieLike(false)
        // props.favMovies.includes(imdbID) ? setMovieLike(true) : setMovieLike(false)
    }, []);

    function likeMovie() {
        let index = currentUser.favMovies.indexOf(imdbID);
        if (index > -1) {
            currentUser.favMovies.splice(index, 1);
            setMovieLike(false);
            console.log(`Удалён`);
        } else {
            currentUser.favMovies.push(imdbID);
            setMovieLike(true);
            console.log(`Добавлен`);
        }
        console.log(`Избранные фильмы: ${currentUser.favMovies}`);
        // let index = props.favMovies.indexOf(imdbID);
        // if (index > -1) {
        //     props.favMovies.splice(index, 1);
        //     setMovieLike(false);
        //     console.log(`Удалён`);
        // } else {
        //     props.favMovies.push(imdbID);
        //     setMovieLike(true);
        //     console.log(`Добавлен`);
        // }
        // console.log(`Избранные фильмы: ${props.favMovies}`);
    }

    return (
        <aside className='slide'>
            <img className='slide__poster' alt='Постер фильма' src={poster} />
            <div className='slide__text-container'>
                {props.isTopSlide ?
                    <p className='slide__info'>IMD рейтинг: <span className='slide__rate-span'>
                        <img src={rateStar} className='slide__star-icon' alt='Звёздочка' />
                        {rate}</span></p>
                    :
                    <p className='slide__info'>Год выхода: <span className='slide__year-span'>{year}</span></p>
                }
                <h3 className='slide__title'>{title}</h3>
            </div>
            <button className={isLiked ? 'slide__button liked-button' : 'slide__button'} onClick={likeMovie}>
                <img className='slide__button-icon' alt='Сердечко' src={isLiked ? heart_clicked : heart_default} />
            </button>

        </aside>
    )
}

export default Slide;
