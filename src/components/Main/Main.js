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
    const [slidesPosition, changePosition] = React.useState(0);
    const [rightButtonVisibility, changeRightButtonVisibility] = React.useState(true);
    const [leftButtonVisibility, changeLeftButtonVisibility] = React.useState(false);

    const movies = [movie2, movie1, movie4, movie5, movie2, movie4, movie3, movie1, movie3, movie5];

    // сохздать переменную с постоянной величиной прокрутки для корусельки вместо 559, которая будет меняться при событии
    // resize у экрана !!добавить eventListener 'resize' у окошка - нр от 900 px до 400px прокрутка будет равна 300px и тд

    function leftScroll() {
        if (slidesPosition < 0) {
            changeRightButtonVisibility(true);
            if (slidesPosition + 559 > 0) {
                changePosition(0);
                changeLeftButtonVisibility(false);
            } else {
                changePosition(slidesPosition + 559);
                slidesPosition + 559 === 0 ? changeLeftButtonVisibility(false) : changeLeftButtonVisibility(true);
            }
        }
    }


    function rightScroll() {
        if (slidesPosition > -2885) {
            changeLeftButtonVisibility(true);
            if (slidesPosition - 559 < -2885 + window.innerWidth) {
                changePosition(-2885 + window.innerWidth);
                changeRightButtonVisibility(false);
            } else {
                changePosition(slidesPosition - 559);
                slidesPosition - 570 < -2885 + window.innerWidth ? changeRightButtonVisibility(false) : changeRightButtonVisibility(true);
            }
        }
    }

    //для прокрутки карусельки можно сделать отрисовку первых пяти элементов массива, где будут объекты 
    // с информацией о слайдах и при нажатии на левую стрелку будет удаляться объект с конца и он же
    //добавляться в начало и то же самое с правой стрелкой - так получится бесконечная коруселька
    // таким же образом с помощью таймера можно будет сделать автоматическую прокрутку каждые 10 сек

    // другой вариант прокрутки: просто при нажатии менять переменную, которая будет определять св-во left у элемента карусельки
    // так же можно будет прятать кнопки прокрутки, если коруселько уже в максимально правом или максимально левом положении
    // мб нажатие будет только одно, чтобы разом прокрутить до конца

    // Приходит по 10 фильмов, далее нужно отправлять такой же запрос с другой страницей

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='main'>
                <div className='main__slides'>
                    <h2 className='main__slide-title'>Топ-10 на IMDb на этой неделе:</h2>
                    <div className='main__slide-container'>
                        {leftButtonVisibility ?
                            <button className='main__button-container main__left-button' onClick={leftScroll}>
                                <img className='main__slides-button' src={arrowIcon} alt='Налево' />
                            </button> : ''
                        }
                        <div className='main__slides-scrolling' id='target' style={{ left: `${slidesPosition}px`, }}>
                            {topMovies.map((el) => (
                                <Slide movie={el} isTopSlide={true} />
                            ))}
                        </div>
                        {rightButtonVisibility ?
                            <button className='main__button-container main__right-button'>
                                <img className='main__slides-button' src={arrowIcon} alt='Направо' onClick={rightScroll} />
                            </button> : ''
                        }
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
