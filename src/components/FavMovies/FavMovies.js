import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './FavMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Slide from '../Slide/Slide';
import SlidesList from '../SlidesList/SlidesList';
import { movie1, movie2, movie3, movie4, movie5 } from '../../utils/movies';


function FavMovies(props) {
    const currentUser = useContext(CurrentUserContext);
    const ids = currentUser.favMovies;
    let movies = [movie1, movie2, movie3, movie4, movie5, movie1];

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='fav-movies'>
                <h2 className='fav-movies__title'>Избранные фильмы</h2>
                <SlidesList anyMoreMovies={false}>
                    {movies.map((el) => (
                        <Slide movie={el} isTopSlide={false} />
                    ))}
                </SlidesList>
            </section>
            <Footer />
        </>
    )
}

export default FavMovies;