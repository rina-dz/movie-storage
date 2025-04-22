import React from 'react';
import './SearchTab.css';
import search_icon from '../../images/search-icon.png';

function SearchTab() {
    const [nameValue, setNameValue] = React.useState('');
    const [yearValue, setYearValue] = React.useState('');

    function handleNameChange(e) {
        setNameValue(e.target.value);
    }

    function handleYearChange(e) {
        setYearValue(e.target.value);
    }

    function handleNameDelete() {
        setNameValue('');
    }

    // function handleFormSubmit(e) {
    //     e.preventDefault();
    //     props.movieSearch(nameValue, isCheckboxChecked); }
    // onSubmit={handleFormSubmit}

    // сделать поиск по imdbID!!!!

    return (
        <section className="search">
            <form className="search__form">
                <div className="search__line">
                    <img className="search__line-icon" src={search_icon} alt="Иконка поиска" />
                    <input className="search__line-input" minLength={3} placeholder="Название фильма" onChange={handleNameChange} value={nameValue || ""} />
                    {nameValue ? <button className='search__delete-button' onClick={handleNameDelete} /> : ''}
                        <input className='search__year-input' placeholder='Год' onChange={handleYearChange} value={yearValue || ''} />
                    <button className={nameValue.length > 2 ? 'search__line-button' : "search__disable-button search__line-button"}>Найти</button>
                </div>
            </form>
        </section>
    )
}

export default SearchTab;