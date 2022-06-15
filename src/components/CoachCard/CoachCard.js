import './CoachCard.css';
import coachPhotoExample from '../../images/coach-id-1.png';

function CoachCard({ togglePopup, coachData, onPopupOpen }) {
  const { name, photo, description } = coachData;

  function handleClick() {
    onPopupOpen(name, coachPhotoExample, description);
    togglePopup();
  }

  return (
    <article className="coach">
      <button onClick={handleClick} type="button" className="coach__button">
        <img src={coachPhotoExample} alt="фото" className="coach__image" />
        <h2 className="coach__name">{name}</h2>
      </button>
    </article>
  );
}

export default CoachCard;
