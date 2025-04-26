import React, { useRef } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Slide from '../Slide/Slide';
import SearchTab from '../SearchTab/SearchTab';
import SlidesList from '../SlidesList/SlidesList';
import Footer from '../Footer/Footer';
import arrowIcon from '../../images/arrow-left.svg';
import { topMovies } from '../../utils/movies';

function Main(props) {
    const [numberOfVisibleMovies, changeNumberOfVisibleMovies] = React.useState(10);
    let step = 574;
    const scrollRef = useRef(null);
    let moviesStep = getMoviesStep();

    React.useEffect(() => {
        checkAndResize();
        window.addEventListener('resize', checkAndResize);
        return () => {
            window.removeEventListener('resize', checkAndResize);
        }
    }, []);

    function getMoviesStep() {
        if (window.innerWidth >= 1527) { return 10 }
        if (window.innerWidth < 1527 && window.innerWidth >= 1218) { return 8 }
        if (window.innerWidth <= 1217 && window.innerWidth > 909) { return 9 }
        if (window.innerWidth < 910) { return 10 }
    }

    function checkAndResize() {
        if (window.innerWidth >= 1527) { changeNumberOfVisibleMovies(10) }
        if (window.innerWidth < 1527 && window.innerWidth >= 1218) { changeNumberOfVisibleMovies(8) }
        if (window.innerWidth <= 1217 && window.innerWidth > 909) { changeNumberOfVisibleMovies(9) }
        if (window.innerWidth < 910) { changeNumberOfVisibleMovies(10) }
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
        console.log(props.topMovies.length);
    }

    function getNextPage() {
        const info = JSON.parse(localStorage.getItem('searchInfo'));
        return props.getNextPage(info)
            .finally(() => {
                changeNumberOfVisibleMovies(numberOfVisibleMovies + moviesStep);
            })
    }

    function reloadVisibleMovies() {
        changeNumberOfVisibleMovies(moviesStep);
    }

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
                <SearchTab getMovies={props.getMovies} reloadSearch={props.reloadSearch} reloadVisibleMovies={reloadVisibleMovies} />
                {props.searchedMoviesInfo.Response === 'True' ? (
                    <SlidesList anyMoreMovies={props.moreMoviesStatus} getNextPage={getNextPage} >
                        {props.searchedMovies.slice(0, numberOfVisibleMovies).map((el) => (
                            <Slide movie={el} isTopSlide={false} key={el.imdbID} likeMovie={props.likeMovie}
                                dislikeMovie={props.dislikeMovie} navigateToMovie={props.navigateToMovie} />
                        ))}
                    </SlidesList>
                ) : (
                    <p className={`main__result-text ${props.searchedMoviesInfo.Response === 'False' ? 'visibly' : ''}`}>Ничего не найдено</p>
                )}
                <p className={`main__default-text ${props.searchedMoviesInfo.Response ? '' : 'visibly'}`}>Начните искать фильмы прямо сейчас</p>
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