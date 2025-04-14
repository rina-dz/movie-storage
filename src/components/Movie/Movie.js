import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Movie.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { idAnswer } from '../../utils/movies';
import rateStar from '../../images/star-icon.svg';
import heart_clicked from '../../images/heart-icon__clicked.png';
import heart_default from '../../images/heart-icon__default.png';

function Movie(props) {
    const [isLiked, setMovieLike] = React.useState(false);
    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        currentUser.favMovies.includes(idAnswer.imdbID) ? setMovieLike(true) : setMovieLike(false)
    }, []);

    function likeMovie() {
        let index = currentUser.favMovies.indexOf(idAnswer.imdbID);
        if (index > -1) {
            currentUser.favMovies.splice(index, 1);
            setMovieLike(false);
            console.log(`Удалён`);
        } else {
            currentUser.favMovies.push(idAnswer.imdbID);
            setMovieLike(true);
            console.log(`Добавлен`);
        }
        console.log(`Избранные фильмы: ${currentUser.favMovies}`);
    }

    // Дописать ждя других разрешений

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='movie'>
                <button className={isLiked ? 'movie__button liked-button' : 'movie__button'} onClick={likeMovie}>
                    <img className='movie__button-icon' alt='Сердечко' src={isLiked ? heart_clicked : heart_default} />
                </button>
                <img className='movie__poster' alt='Постер' src={idAnswer.Poster} />
                <dl className='movie__info-container'>
                    <h3 className='movie__title'>{idAnswer.Title}</h3>
                    <dt className='movie__dt'>Год выхода</dt>
                    <dd className='movie__dd'>{idAnswer.Year}</dd>
                    <dt className='movie__dt'>Рейтинг</dt>
                    <dd className='movie__dd'>{idAnswer.Rated}</dd>
                    <dt className='movie__dt'>Релиз</dt>
                    <dd className='movie__dd'>{idAnswer.Released}</dd>
                    <dt className='movie__dt'>Длительность</dt>
                    <dd className='movie__dd'>{idAnswer.Runtime}</dd>
                    <dt className='movie__dt'>Язык</dt>
                    <dd className='movie__dd'>{idAnswer.Language}</dd>
                    <dt className='movie__dt'>Страна</dt>
                    <dd className='movie__dd'>{idAnswer.Country}</dd>
                    <dt className='movie__dt'>Жанры</dt>
                    <dd className='movie__dd'>{idAnswer.Genre}</dd>
                    <dt className='movie__dt'>Режиссёр</dt>
                    <dd className='movie__dd'>{idAnswer.Director}</dd>
                </dl>
                <div className='movie__ratings'>
                    {idAnswer.Ratings.length > 0 ? (
                        idAnswer.Ratings.map((el) => {
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
                <p className='movie__plot'>{idAnswer.Plot}</p>
            </section>
            <Footer />
        </>
    )
}

export default Movie;