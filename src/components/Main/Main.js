import React, { useRef } from 'react';
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
    let step;
    const movies = [movie2, movie1, movie4, movie5, movie3];
    const [rightButtonVisibility, changeRightButtonVisibility] = React.useState(true);
    const [leftButtonVisibility, changeLeftButtonVisibility] = React.useState(true);
    const scrollRef = useRef(null);

    // бавить блокировку кнопок в крайних положениях
    // убрать стрелки на мобильном разрешении и оставить только прокрутку сенсором + полосочка положениия внизу контейнера

    React.useEffect(() => {
        checkAndResize();
        window.addEventListener('resize', checkAndResize);
        return () => {
            window.removeEventListener('resize', checkAndResize);
        }
    }, []);

    function checkAndResize() {
        if (window.innerWidth >= 1150) {
            step = 574;
        }
        if (window.innerWidth < 1150) {
            step = 287;
        }
    };

    function leftScroll() {
        scrollRef.current.scrollBy({
            left: -(step),
            behavior: 'smooth'
        })
    }

    function rightScroll() {
        scrollRef.current.scrollBy({
            left: step,
            behavior: 'smooth'
        })
    }

    // 2890px 578

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
                        <div className='main__slides-scrolling' ref={scrollRef}>
                            {topMovies.map((el) => (
                                <Slide movie={el} isTopSlide={true} key={el.imdbID} />
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
                            <Slide movie={el} isTopSlide={false} key={el.imdbID} />
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
