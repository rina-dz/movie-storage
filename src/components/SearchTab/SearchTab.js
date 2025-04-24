import React from 'react';
import './SearchTab.css';
import search_icon from '../../images/search-icon.png';
import loading_icon from '../../images/loading-icon_color-white.png';

function SearchTab(props) {
    const [nameValue, setNameValue] = React.useState('');
    const [yearValue, setYearValue] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
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
        setLoading(true);
        let info;
        yearValue ? info = { name: nameValue, year: yearValue } : info = { name: nameValue };
        if (localStorage.searchInfo) {
            let ls = JSON.parse(localStorage.searchInfo);
            if (ls.name !== info.name) {
                console.log('Разные');
                props.reloadSearch();
            } else {
                if (ls.year !== info.year) {
                    console.log('Разные');
                    props.reloadSearch();
                }
            }
        }
        localStorage.setItem('searchInfo', JSON.stringify(info));
        props.getMovies(info)
            .finally(() => {
                setLoading(false);
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
                        className={nameValue.length > 2 ? 'search__line-button' : "search__disable-button search__line-button"}>
                        {isLoading ?
                            <img className='search__loading-icon' src={loading_icon} alt='Загрузка' /> :
                            <span>Найти</span>
                        }
                    </button>
                </div>
            </form>
        </section>
    )
}

export default SearchTab;