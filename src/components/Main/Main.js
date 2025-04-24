import React, { useRef } from 'react';
import './Main.css';
//import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Slide from '../Slide/Slide';
import SearchTab from '../SearchTab/SearchTab';
import SlidesList from '../SlidesList/SlidesList';
import Footer from '../Footer/Footer';
import arrowIcon from '../../images/arrow-left.svg';
import { topMovies } from '../../utils/movies';

function Main(props) {
    const { totalResults, Response } = props.searchedMoviesInfo;
    let step = 574;
    const scrollRef = useRef(null);
    // const [movies, addMoreMovies] = React.useState(props.searchedMovies);
    // const [visibleMovies, addMoreVisibleMovies] = React.useState([]);

    // бавить блокировку кнопок в крайних положениях
    React.useEffect(() => {
        checkAndResize();
        window.addEventListener('resize', checkAndResize);
        return () => {
            window.removeEventListener('resize', checkAndResize);
        }
    }, []);

    function checkAndResize() {
        if (window.innerWidth >= 1527) {
            //console.log(10);
            //addMoreVisibleMovies(movies.slice(0, 10));
        }
        if (window.innerWidth < 1527 && window.innerWidth >= 1218) {
            //console.log(8);
            //addMoreVisibleMovies(movies.slice(0, 8));
        }
        if (window.innerWidth <= 1217 && window.innerWidth > 909) {
            //console.log(6);
            //addMoreVisibleMovies(movies.slice(0, 6));
        }
        if (window.innerWidth < 910) {
            //console.log(10);
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


    // Приходит по 10 фильмов, далее нужно отправлять такой же запрос с другой страницей
    // добавить каунтер с изначальным знач 1 и увеличивать его при нажатии ещё до момента пока не поменяется
    // инфо из SearchTab

    return (
        <>
            <Header getMovieById={props.getMovieById} navigateToMovie={props.navigateToMovie} />
            <section className='main'>
                <div className='main__slides'>
                    <h2 className='main__slide-title'>Топ-10 на IMDb на этой неделе:</h2>
                    <div className='main__slide-container'>
                        <button className='main__button-container main__left-button' onClick={leftScroll}>
                            <img className='main__slides-button' src={arrowIcon} alt='Налево' />
                        </button>
                        <div className='main__slides-scrolling' ref={scrollRef}>
                            {topMovies.map((el) => (
                                <Slide movie={el} isTopSlide={true} key={el.imdbID} likeMovie={props.likeMovie}
                                    dislikeMovie={props.dislikeMovie} navigateToMovie={props.navigateToMovie} />
                            ))}
                        </div>
                        <button className='main__button-container main__right-button'>
                            <img className='main__slides-button' src={arrowIcon} alt='Направо' onClick={rightScroll} />
                        </button>
                    </div>
                </div>
                <SearchTab getMovies={props.getMovies} reloadSearch={props.reloadSearch} />
                {Response === 'True' ? (
                    <SlidesList anyMoreMovies={props.moreMoviesStatus} addMoreMovies={props.addMoreMovies} getNextPage={props.getNextPage}>
                        {props.searchedMovies.map((el) => (
                            <Slide movie={el} isTopSlide={false} key={el.imdbID} likeMovie={props.likeMovie}
                                dislikeMovie={props.dislikeMovie} navigateToMovie={props.navigateToMovie} />
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



// const [rightButtonVisibility, changeRightButtonVisibility] = React.useState(true);
// const [leftButtonVisibility, changeLeftButtonVisibility] = React.useState(true);

// {rightButtonVisibility ?
//     <button className='main__button-container main__right-button'>
//         <img className='main__slides-button' src={arrowIcon} alt='Направо' onClick={rightScroll} />
//     </button> : ''
// }

// {leftButtonVisibility ?
//     <button className='main__button-container main__left-button' onClick={leftScroll}>
//         <img className='main__slides-button' src={arrowIcon} alt='Налево' />
//     </button> : ''
// }