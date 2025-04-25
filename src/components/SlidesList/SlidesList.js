import React from 'react';
import './SlidesList.css';
import loading_icon from '../../images/loading-icon_color-white.png';

function SlidesList(props) {
    const [isLoading, setLoading] = React.useState(false);

    function getNextPage(event) {
        event.preventDefault();
        // const info = JSON.parse(localStorage.getItem('searchInfo'));
        setLoading(true);
        props.getNextPage()
        .finally(() => {
            setLoading(false);
        })

        // event.preventDefault();
        // const info = JSON.parse(localStorage.getItem('searchInfo'));
        // setLoading(true);
        // props.getNextPage(info)
        // .finally(() => {
        //     setLoading(false);
        // })
    }

    return (
        <section className='slides-list'>
            <div className='slides-list__container'>
                {props.children}
            </div>
            {props.anyMoreMovies ? (<button className='slides-list__button' onClick={getNextPage}>
                {isLoading ?
                    <img className='slides-list__loading-icon' src={loading_icon} alt='Загрузка' /> :
                    <span className='slides-list__button-text'>Ещё</span>
                }
            </button>) : (<></>)}
        </section>
    )
}

export default SlidesList;