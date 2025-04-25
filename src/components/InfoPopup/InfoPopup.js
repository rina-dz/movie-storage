import './InfoPopup.css';

function InfoPopup(props) {

    return (
        <aside className={`info-popup ${props.isInfoPopupOpen ? 'visibly' : ''}`}>
            <p className='info-popup__text'>Ошибка! {props.errorMessage}</p>
        </aside>
    )
}

export default InfoPopup;