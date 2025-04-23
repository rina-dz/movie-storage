import React, { useRef } from 'react';
import './SearchPopup.css';
import poster_none from '../../images/poster_none.png';
import arrowIcon from '../../images/arrow-left.svg';

function SearchPopup(props) {
    const { Response, Poster, Title, Year, imdbID, Genre } = props.searchedMovie;
    const posterRef = useRef(null);
    let posterSrc = Poster === "N/A" ? poster_none : Poster;

    function navigateToMovie() {
        props.navigateToMovie(imdbID);
    }

    return (
        <aside className={`search-popup ${props.isOpen ? 'visibly' : ''}`}>
            {Response ?
                <>
                    <img className='search-popup__poster' src={posterSrc} alt='Постер фильма'
                        onError={() => { posterRef.current.src = poster_none }} ref={posterRef} />
                    <div className='search-popup__info-container'>
                        <h3 className='search-popup__title'>{Title}</h3>
                        <p className='search-popup__year'><span className='search-popup__span'>Год: </span>{Year}</p>
                        <p className='search-popup__genre'><span className='search-popup__span'>Жанры: </span>{Genre}</p>
                    </div>
                    <div className='search-popup__button' onClick={navigateToMovie}>
                        <img className='search-popup__button-img' src={arrowIcon} alt='К фильму' />
                    </div>
                </> :
                <p className='search-popup__error'>{props.searchedMovie.error}</p>
            }
        </aside>
    )
}

export default SearchPopup;