import './SearchPopup.css';
import Poster5 from '../../images/temporarily/poster5.webp';
import arrowIcon from '../../images/arrow-left.svg';

function SearchPopup(props) {

    // для перехода на /movie использовать id из инпута
    // className={`search-popup ${props.isOpen ? 'visibly' : ''}`}

    return (
        <aside className='search-popup'>
            <img className='search-popup__poster' src={Poster5} alt='Постер фильма' />
            <div className='search-popup__info-container'>
                <h3 className='search-popup__title'>Batman v Superman: Dawn of Justice (Ultimate Edition)</h3>
                <p className='search-popup__year'><span className='search-popup__span'>Год: </span>2003</p>
                <p className='search-popup__genre'><span className='search-popup__span'>Жанры: </span>Comedy, Drama</p>
            </div>
            <button className='search-popup__button'>
                <img className='search-popup__button-img' src={arrowIcon} alt='К фильму' />
            </button>
        </aside>
    )
}

export default SearchPopup;