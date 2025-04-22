import React from 'react';
import './Slide.css';
import rateStar from '../../images/star-icon.svg';
import heart_clicked from '../../images/heart-icon__clicked.png';
import heart_default from '../../images/heart-icon__default.png';
//import { Link } from 'react-router-dom';

function Slide(props) {
    const { Poster, Title, rate, Year, imdbID } = props.movie;
    const [isLiked, setMovieLike] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    React.useEffect(() => {
        if (user) {
            user.favMovies.includes(imdbID) ? setMovieLike(true) : setMovieLike(false);
        }
    }, []);

    function handleLikeMovie() {
        props.likeMovie(imdbID);
        setMovieLike(true);
    }

    function dislikeMovie() {
        props.dislikeMovie(imdbID);
        setMovieLike(false);
    }

    return (
        <aside className='slide'>
            <img className='slide__poster' alt='Постер фильма' src={Poster} />
            <div className='slide__text-container'>
                {props.isTopSlide ?
                    <p className='slide__info'>IMD рейтинг: <span className='slide__rate-span'>
                        <img src={rateStar} className='slide__star-icon' alt='Звёздочка' />
                        {rate}</span></p>
                    :
                    <p className='slide__info'>Год выхода: <span className='slide__year-span'>{Year}</span></p>
                }
                <h3 className='slide__title'>{Title}</h3>
            </div>
            <button className={isLiked ? 'slide__button liked-button' : 'slide__button'} onClick={isLiked ? dislikeMovie : handleLikeMovie}>
                <img className='slide__button-icon' alt='Сердечко' src={isLiked ? heart_clicked : heart_default} />
            </button>

        </aside>
    )
}

export default Slide;
