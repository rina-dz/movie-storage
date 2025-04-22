import React from 'react';
import './Movie.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import rateStar from '../../images/star-icon.svg';
import heart_clicked from '../../images/heart-icon__clicked.png';
import heart_default from '../../images/heart-icon__default.png';

function Movie(props) {
    const movie = props.movie;
    const [isLiked, setMovieLike] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    React.useEffect(() => {
        if (user) {
            user.favMovies.includes(movie.imdbID) ? setMovieLike(true) : setMovieLike(false);
        }
    }, []);

    function handleLikeMovie() {
        props.likeMovie(movie.imdbID);
        setMovieLike(true);
    }

    function dislikeMovie() {
        props.dislikeMovie(movie.imdbID);
        setMovieLike(false);
    }

    return (
        <>
            <Header />
            <section className='movie'>
                <img className='movie__poster' alt='Постер' src={movie.Poster} />
                <dl className='movie__info-container'>
                    <div className='movie__title-container'>
                        <h3 className='movie__title'>{movie.Title}</h3>
                        <button className={isLiked ? 'movie__button liked-button' : 'movie__button'} onClick={isLiked ? dislikeMovie : handleLikeMovie}>
                            <img className='movie__button-icon' alt='Сердечко' src={isLiked ? heart_clicked : heart_default} />
                        </button>
                    </div>
                    <dt className='movie__dt'>Год выхода</dt>
                    <dd className='movie__dd'>{movie.Year}</dd>
                    <dt className='movie__dt'>Рейтинг</dt>
                    <dd className='movie__dd'>{movie.Rated}</dd>
                    <dt className='movie__dt'>Релиз</dt>
                    <dd className='movie__dd'>{movie.Released}</dd>
                    <dt className='movie__dt'>Длительность</dt>
                    <dd className='movie__dd'>{movie.Runtime}</dd>
                    <dt className='movie__dt'>Язык</dt>
                    <dd className='movie__dd'>{movie.Language}</dd>
                    <dt className='movie__dt'>Страна</dt>
                    <dd className='movie__dd'>{movie.Country}</dd>
                    <dt className='movie__dt'>Жанры</dt>
                    <dd className='movie__dd'>{movie.Genre}</dd>
                    <dt className='movie__dt'>Режиссёр</dt>
                    <dd className='movie__dd'>{movie.Director}</dd>
                </dl>
                <div className='movie__ratings'>
                    {movie.Ratings.length > 0 ? (
                        movie.Ratings.map((el) => {
                            return (<div className='movie__rating-container' key={el.Source}>
                                <img src={rateStar} className='movie__rating-icon' alt='Звёздочка' />
                                <p className='movie__rating'>{el.Source}:
                                    <span className='movie__rating-span'>
                                        {el.Value}
                                    </span></p>
                            </div>)
                        })
                    ) : ('')}
                </div>
                <p className='movie__plot'>{movie.Plot}</p>
            </section>
            <Footer />
        </>
    )
}

export default Movie;