import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CoachCard from '../CoachCard/CoachCard';
import CoachPopup from '../CoachPopup/CoachPopup';
import SchoolMap from '../SchoolMap/SchoolMap';
import './SchoolPage.css';

function SchoolPage({
  onFindDistrict,
  schools,
  districts,
  coaches,
  onFindCoach,
}) {
  const [isCoachPopupOpen, setIsCoachPopupOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({});
  const [districtInfo, setDistrictInfo] = useState({});
  const [coachesData, setCoachesData] = useState([]);
  const [popupContent, setPopupContent] = useState({
    name: '',
    photo: '',
    description: '',
  });

  let { id } = useParams();

  useEffect(() => {
    if (districts.length < 1) {
      return;
    }
    const school = schools.find((s) => s.id.toString() === id.toString());

    getCoaches();
    setDistrictInfo(onFindDistrict(districts, school.district_id));
    setSchoolData(school);
  }, [districts, coaches]);

  function togglePopup() {
    setIsCoachPopupOpen(!isCoachPopupOpen);
  }

  function handleOpenPopup(name, photo, description) {
    setPopupContent({ name, photo, description });
  }

  function getCoaches() {
    if (coaches.length < 1) return;
    setCoachesData(onFindCoach(coaches, id));
  }

  return (
    <section className="school">
      <div className="school__container">
        <div className="school__info-container">
          <div className="school__text-container">
            <h2 className="school__title">{schoolData.name}</h2>
            <p className="school__text">{schoolData.description}</p>
            <p className="school__text">{`Подходит для детей ${schoolData.child_age} лет.`}</p>
            <p className="school__text school__text_address">{`Адрес: ${schoolData.address}`}</p>
            <Link
              className="school__text school__text_link"
              to={`/districts/${districtInfo.id}`}
            >
              {districtInfo.name}
            </Link>
            <p className="school__text">{schoolData.tel}</p>
          </div>
          <div
            className={`school__coach-container ${
              coachesData.length > 0 ? 'school__coach-container_hidden' : ''
            }`}
          >
            <h3 className="school__coach-title">Некоторые тренеры</h3>
            {coachesData.map((coach) => (
              <CoachCard
                key={coach.id}
                coachData={coach}
                onPopupOpen={handleOpenPopup}
                togglePopup={togglePopup}
              />
            ))}
          </div>
        </div>
        <section className="school__map-container">
          <h3 className="school__map-title">Местонахождение на карте</h3>
          <div className="school__map">
            {schoolData.coordinates ? (
              <SchoolMap coordinates={schoolData.coordinates} />
            ) : (
              ''
            )}
          </div>
        </section>
      </div>
      <CoachPopup
        popupContent={popupContent}
        isOpen={isCoachPopupOpen}
        onClose={togglePopup}
      />
    </section>
  );
}

export default SchoolPage;
