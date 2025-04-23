import React from 'react';
import './SearchTab.css';
import search_icon from '../../images/search-icon.png';

function SearchTab(props) {
    const [nameValue, setNameValue] = React.useState('');
    const [yearValue, setYearValue] = React.useState('');
    const [tipVisibility, setTipVisibility] = React.useState(false);

    function handleNameChange(e) {
        setTipVisibility(true);
        setNameValue(e.target.value);
    }

    function handleYearChange(e) {
        setYearValue(e.target.value);
    }

    function handleNameDelete() {
        setTipVisibility(false);
        setNameValue('');
    }

    function searchMovie(event) {
        event.preventDefault();
        // кнопка найти меняется на значок загрузки
        let info;
        yearValue ? info = { name: nameValue, year: yearValue } : info = { name: nameValue };
        console.log(info);
        props.getMovies(info)
            .finally(() => {
                // значок загрузки исчезает
            })
    }

    // добавить обработку ответа если фильмы не найдены и нажатие на ещё с запросом к newOMDbApi, но уже со следующей страницы

    return (
        <section className="search">
            <form className="search__form">
                <div className="search__line">
                    {tipVisibility ?
                        <p className='search__form-tip'>Введите по крайней мере 3 символа</p> : ''
                    }
                    <img className="search__line-icon" src={search_icon} alt="Иконка поиска" />
                    <input className="search__line-input" minLength={3} placeholder="Название фильма" onChange={handleNameChange} value={nameValue || ""} />
                    {nameValue ? <button className='search__delete-button' onClick={handleNameDelete} /> : ''}
                    <input className='search__year-input' placeholder='Год' type='number'
                        onChange={handleYearChange} value={yearValue || ''} />
                    <button onClick={searchMovie} disabled={nameValue.length < 3 ? true : false}
                        className={nameValue.length > 2 ? 'search__line-button' : "search__disable-button search__line-button"}>Найти</button>
                </div>
            </form>
        </section>
    )
}

export default SearchTab;