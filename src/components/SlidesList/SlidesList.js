import React from 'react';
import './SlidesList.css';

function SlidesList(props) {
    return (
        <section className='slides-list'>
            <div className='slides-list__container'>
                {props.children}
            </div>
            {props.anyMoreMovies ? (<button className='slides-list__button'>
                <span className='slides-list__button-text'>Ещё</span>
            </button>) : (<></>)}
        </section>
    )
}

export default SlidesList;