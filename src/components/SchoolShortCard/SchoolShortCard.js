import cardPhoto from '../../images/photo-card-example1.jpg';
import { Link } from 'react-router-dom';
import './SchoolShortCard.css';

function SchoolShortCard({ schoolData, onFindDistrict, districts }) {
  const { id, name, child_age, description, district_id } = schoolData;
  const district = onFindDistrict(districts, district_id);

  const schoolPath = `/schools/${id}`;

  return (
    <article className="school-card">
      <Link className="school-card__school-link" to={schoolPath}>
        <img className="school-card__photo" src={cardPhoto} alt="фото" />
      </Link>
      <div className="school-card__info-container">
        <Link
          className="school-card__school-link school-card__school-link_text"
          to={schoolPath}
        >
          <div className="school-card__text-container">
            <h2 className="school-card__title">{name}</h2>

            <p className="school-card__text school-card__text_description">
              {description}
            </p>
            <p className="school-card__text">{`Подходит для детей ${child_age} лет`}</p>
          </div>
          <button className="school-card__button">Посмотреть</button>
        </Link>
        <Link className="school-card__link" to={`/districts/${district.id}`}>
          {district.name}
        </Link>
      </div>
    </article>
  );
}

export default SchoolShortCard;
