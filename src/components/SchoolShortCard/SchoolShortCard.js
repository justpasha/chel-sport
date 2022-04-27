import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SchoolShortCard.css';

function SchoolShortCard({
  schoolData,
  onFindDistrict,
  districts,
  sports,
  onFindSports,
}) {
  const [sportsString, setSportsString] = useState('');
  const [district, setDistrict] = useState({});
  const [ratingColor, setRatingColor] = useState('');

  const {
    id,
    name,
    child_age,
    description,
    district_id,
    raiting,
    sport_id,
    img,
  } = schoolData;
  const schoolPath = `/schools/${id}`;

  useEffect(() => {
    if (sports.length < 1 || districts.length < 1) {
      return;
    }

    checkRaiting(raiting);
    setSportsString(onFindSports(sports, sport_id));
    setDistrict(onFindDistrict(districts, district_id));
  }, [sports, districts]);

  const checkRaiting = (raitingInfo) => {
    if (Number(raitingInfo) <= 3.4) {
      setRatingColor('school-card__raiting_low');
    }
    if (Number(raitingInfo) >= 4.2) {
      setRatingColor('school-card__raiting_high');
    }
  };

  return (
    <article className="school-card">
      <Link className="school-card__school-link" to={schoolPath}>
        <img className="school-card__photo" src={img} alt="фото" />
      </Link>
      <div className="school-card__info-container">
        <Link
          className="school-card__school-link school-card__school-link_text"
          to={schoolPath}
        >
          <div className="school-card__text-container">
            <div className="school-card__title-container">
              <h2 className="school-card__title">{name}</h2>
              <p className={`school-card__raiting ${ratingColor}`}>{raiting}</p>
            </div>
            <p className="school-card__text school-card__text_description">
              {description}
            </p>
            <p className="school-card__text">{`Подходит для детей ${child_age} лет`}</p>
            <p className="school-card__sports">{sportsString}</p>
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
