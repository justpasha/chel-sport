import React, { useEffect } from 'react';
import './CoachPopup.css';

function CoachPopup({ isOpen, onClose, popupContent }) {
  const { name, photo, description } = popupContent;

  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <section
      onMouseDown={handleOverlayClose}
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <div className="popup__info-container">
          <h2 className="popup__title">{name}</h2>
          <img src={photo} alt="фото тренера" className="popup__image" />
        </div>
        <p className="popup__text">{description}</p>
        <button onClick={onClose} className="popup__button" type="button">
          Закрыть
        </button>
      </div>
    </section>
  );
}

export default CoachPopup;
