import React, { useEffect } from 'react';
import './CoachPopup.css';

function CoachPopup({ isOpen, onClose }) {
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
        <h2 className="popup__title">Алексеев Максим Евгеньевич</h2>
        <p className="popup__text">Стаж</p>
        <p className="popup__text">
          Челябинская региональная общественная спортивная организация
          «Челябинская областная федерация ушу» существует с 2000 года..
          Челябинская региональная общественная спортивная организация
          «Челябинская областная федерация ушу» существует с 2000 года..
          Челябинская региональная общественная спортивная организация
        </p>
        <button onClick={onClose} className="popup__button" type="button">
          Закрыть
        </button>
      </div>
    </section>
  );
}

export default CoachPopup;
