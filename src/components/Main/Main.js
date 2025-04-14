import React from 'react';
import './Main.css';
//import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Slide from '../Slide/Slide';
import SearchTab from '../SearchTab/SearchTab';
import SlidesList from '../SlidesList/SlidesList';
import Footer from '../Footer/Footer';
import arrowIcon from '../../images/arrow-left.svg';
import { movie1, movie2, movie3, movie4, movie5, topMovies } from '../../utils/movies';

function Main(props) {

    const movies = [movie2, movie1, movie4, movie5, movie2, movie4, movie3, movie1, movie3, movie5];

    //для прокрутки карусельки можно сделать отрисовку первых пяти элементов массива, где будут объекты 
    // с информацией о слайдах и при нажатии на левую стрелку будет удаляться объект с конца и он же
    //добавляться в начало и то же самое с правой стрелкой - так получится бесконечная коруселька
    // таким же образом с помощью таймера можно будет сделать автоматическую прокрутку каждые 10 сек

    // Приходит по 10 фильмов, далее нужно отправлять такой же запрос с другой страницей

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='main'>
                <div className='main__slides'>
                    <h2 className='main__slide-title'>Топ-10 на IMDb на этой неделе:</h2>
                    <div className='main__slide-container'>
                        <button className='main__button-container main__left-button'>
                            <img className='main__slides-button' src={arrowIcon} alt='Налево' />
                        </button>
                        {topMovies.map((el) => (
                            <Slide movie={el} isTopSlide={true} />
                        ))}
                        <button className='main__button-container main__right-button'>
                            <img className='main__slides-button' src={arrowIcon} alt='Направо' />
                        </button>
                    </div>
                </div>
                <SearchTab />
                {movies.length > 0 ? (
                    <SlidesList anyMoreMovies={true}>
                        {movies.map((el) => (
                            <Slide movie={el} isTopSlide={false} />
                        ))}
                    </SlidesList>
                ) : (
                    <p className='main__result-text'>Ничего не найдено</p>
                )}
            </section>
            <Footer />
        </>
    )
}

export default Main;
