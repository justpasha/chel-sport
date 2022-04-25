import coachPhoto from '../../images/coach-photo-example1.jpg';
import './CoachCard.css';

function CoachCard({ togglePopup }) {
  function handleClick() {
    togglePopup();
  }

  return (
    <article className="coach">
      <button onClick={handleClick} type="button" className="coach__button">
        <img src={coachPhoto} alt="фото" className="coach__image" />
        <h2 className="coach__name">Алексеев Максим Евгеньевич</h2>
      </button>
    </article>
  );
}

export default CoachCard;
