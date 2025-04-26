import React, { useRef } from 'react';
import './Slide.css';
import rateStar from '../../images/star-icon.svg';
import heart_clicked from '../../images/heart-icon__clicked.png';
import heart_default from '../../images/heart-icon__default.png';
import poster_none from '../../images/poster_none.png';
import loading_icon from '../../images/loading-icon_color-white.png';

function Slide(props) {
    const { Poster, Title, Ratings, Year, imdbID } = props.movie;
    const [isLiked, setMovieLike] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const isLogged = localStorage.isLoggedIn ? true : false;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const posterRef = useRef(null);
    let posterSrc = Poster === "N/A" ? poster_none : Poster;
    const rate = Ratings && Ratings.length > 0 ?
        Ratings.find((el) => { return el.Source === "Internet Movie Database" || "Rotten Tomatoes" }) :
        "N/A";

    React.useEffect(() => {
        if (user) {
            user.favMovies.includes(imdbID) ? setMovieLike(true) : setMovieLike(false);
        }
    }, []);

    function handleLikeMovie() {
        setLoading(true);
        if (isLogged) {
            props.likeMovie(imdbID)
                .then(() => {
                    setMovieLike(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            props.likeMovie(imdbID)
        }
    }

    function dislikeMovie() {
        setLoading(true);
        props.dislikeMovie(imdbID);
        setLoading(false);
        setMovieLike(false);
    }

    function navigateToMovie() {
        props.navigateToMovie(imdbID)
    }

    return (
        <aside className='slide'>
            <img className='slide__poster' alt='Постер фильма' src={posterSrc}
                onError={() => { posterRef.current.src = poster_none }} ref={posterRef} />
            <div className='slide__text-container'>
                {props.isTopSlide && rate !== "N/A" ?
                    <p className='slide__info'>{rate.Source === "Rotten Tomatoes" ? 'RT рейтинг:' : 'IMD рейтинг:'}
                        <span className='slide__rate-span'>
                            <img src={rateStar} className='slide__star-icon' alt='Звёздочка' />
                            {rate.Value}</span></p>
                    :
                    <p className='slide__info'>Год выхода: <span className='slide__year-span'>{Year}</span></p>
                }
                <h3 className='slide__title'>{Title}</h3>
            </div>
            <span className='slide__link' onClick={navigateToMovie} />
            <button className={isLiked ? 'slide__button liked-button' : 'slide__button'} onClick={isLiked ? dislikeMovie : handleLikeMovie}>
                {isLoading ? <img className='slide__loading-icon' src={loading_icon} alt='Загрузка' /> :
                    <img className='slide__button-icon' alt='Сердечко' src={isLiked ? heart_clicked : heart_default} />}
            </button>
        </aside>
    )
}

export default Slide;
