import coachPhoto from '../../images/coach-photo-example1.jpg';
import './CoachCard.css';

function CoachCard() {
  return (
    <article className="coach">
      <img src={coachPhoto} alt="фото" className="coach__image" />
      <h2 className="coach__name">Алексеев Максим Евгеньевич</h2>
    </article>
  );
}

export default CoachCard;
