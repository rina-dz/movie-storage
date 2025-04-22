import React from 'react';
import './FavMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Slide from '../Slide/Slide';
import SlidesList from '../SlidesList/SlidesList';

function FavMovies(props) {

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='fav-movies'>
                <h2 className='fav-movies__title'>Избранные фильмы</h2>
                {props.movies.length > 0 ? 
                <SlidesList anyMoreMovies={false}>
                    {props.movies.map((el) => (
                        <Slide movie={el} isTopSlide={false} key={el.imdbID} likeMovie={props.likeMovie} 
                        dislikeMovie={props.dislikeMovie} navigateToMovie={props.navigateToMovie} />
                    ))}
                </SlidesList> : 
                <div className='fav-movies__text-container'>
                    <p className='fav-movies__text'>У вас пока нет сохранённых фильмов :c</p>
                </div>
                }
            </section>
            <Footer />
        </>
    )
}

export default FavMovies;