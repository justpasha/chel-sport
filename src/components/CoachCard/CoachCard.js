import './CoachCard.css';

function CoachCard({ togglePopup, coachData, onPopupOpen }) {
  const { name, photo, description } = coachData;

  function handleClick() {
    onPopupOpen(name, photo, description);
    togglePopup();
  }

  return (
    <article className="coach">
      <button onClick={handleClick} type="button" className="coach__button">
        <img src={photo} alt="фото" className="coach__image" />
        <h2 className="coach__name">{name}</h2>
      </button>
    </article>
  );
}

export default CoachCard;
