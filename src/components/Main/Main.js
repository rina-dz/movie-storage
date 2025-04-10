import React from 'react';
import './Main.css';
//import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Slide from '../Slide/Slide';
import SearchTab from '../SearchTab/SearchTab';
import arrowIcon from '../../images/arrow-left.svg';
import poster4 from '../../images/temporarily/poster4.webp';
import poster5 from '../../images/temporarily/poster5.webp';
import poster3 from '../../images/temporarily/poster3.webp';
import poster1 from '../../images/temporarily/poster1.webp';

function Main(props) {

    const movie1 = {
        title: 'Марсианин',
        rate: 6.1,
        poster: poster1,
        year: 2003,
        imdbID: "tt18689424",
    };

    const movie2 = {
        title: 'PARKER',
        rate: 8.5,
        poster: poster3,
        year: 2003,
        imdbID: "tt18689427",
    };

    const movie3 = {
        title: 'Indiana Jhons',
        rate: 9.0,
        poster: poster4,
        year: 2003,
        imdbID: "tt18689426",
    };

    const movie4 = {
        title: 'TAKEN 2',
        rate: 3.8,
        poster: poster5,
        year: 2003,
        imdbID: "tt18689425",
    };

    const movie5 = {
        title: 'Batman v Superman: Dawn of Justice (Ultimate Edition)',
        rate: 7.9,
        poster: "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg",
        year: 2016,
        imdbID: "tt18689429",
    }

    const topIds = ['tt6208148', 'tt13406094', 'tt3566834', 'tt31806037',
        'tt31510819', 'tt11280740', 'tt18923754', 'tt8740614', 'tt18335752', 'tt31938062']
    //для прокрутки карусельки можно сделать отрисовку первых пяти элементов массива, где будут объекты 
    // с информацией о слайдах и при нажатии на левую стрелку будет удаляться объект с конца и он же
    //добавляться в начало и то же самое с правой стрелкой - так получится бесконечная коруселька
    // таким же образом с помощью таймера можно будет сделать автоматическую прокрутку каждые 10 сек

    // Приходит по 10 фильмов, далее нужно отправлять такой же запрос с другой страницей

    return (
        <>
            <Header />
            <section className='main'>
                <div className='main__slides'>
                    <h2 className='main__slide-title'>Топ-10 на IMDb на этой неделе:</h2>
                    <div className='main__slide-container'>
                        <button className='main__button-container main__left-button'>
                            <img className='main__slides-button' src={arrowIcon} alt='Налево' />
                        </button>
                        <Slide movie={movie1} isTopSlide={true} />
                        <Slide movie={movie2} isTopSlide={true} />
                        <Slide movie={movie3} isTopSlide={true} />
                        <Slide movie={movie4} isTopSlide={true} />
                        <Slide movie={movie1} isTopSlide={true} />
                        <Slide movie={movie2} isTopSlide={true} />
                        <Slide movie={movie3} isTopSlide={true} />
                        <button className='main__button-container main__right-button'>
                            <img className='main__slides-button' src={arrowIcon} alt='Направо' />
                        </button>
                    </div>
                </div>
                <SearchTab />
                <div className='movie-container'>
                    <Slide movie={movie2} isTopSlide={false} />
                    <Slide movie={movie5} isTopSlide={false} />
                    <Slide movie={movie2} isTopSlide={false} />
                    <Slide movie={movie3} isTopSlide={false} />
                    <Slide movie={movie4} isTopSlide={false} />
                    <Slide movie={movie4} isTopSlide={false} />
                    <Slide movie={movie1} isTopSlide={false} />
                    <Slide movie={movie4} isTopSlide={false} />
                </div>
            </section>
        </>
    )
}

export default Main;
