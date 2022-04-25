import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CoachCard from '../CoachCard/CoachCard';
import CoachPopup from '../CoachPopup/CoachPopup';
import SchoolMap from '../SchoolMap/SchoolMap';
import './SchoolPage.css';

function SchoolPage({ onGetServerData, onFindDistrict }) {
  const [isCoachPopupOpen, setIsCoachPopupOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({});
  const [districtInfo, setDistrictInfo] = useState({});
  const [coaches, setCoaches] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const data = onGetServerData();
    const school = data.schoolsData.schools.find(
      (s) => s.id.toString() === id.toString()
    );

    setDistrictInfo(
      onFindDistrict(data.districtsData.districts, school.district_id)
    );
    setSchoolData(school);
  }, []);

  function togglePopup() {
    setIsCoachPopupOpen(!isCoachPopupOpen);
  }

  function openPopup() {
    togglePopup();
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
          // className={`school__coach-container ${
          //   coaches.length > 0 ? 'school__coach-container_hidden' : ''
          // }`}
          >
            <h3 className="school__coach-title">Некоторые тренеры</h3>
            {/* {coaches.map((coach) => (
              <CoachCard key={coach.id} />
            ))} */}
            <CoachCard togglePopup={togglePopup} />
          </div>
        </div>
        <section className="school__map-container">
          <h3 className="school__map-title">Местонахождение на карте</h3>
          <div className="school__map">
            <SchoolMap coordinates={'55.155489, 61.388414'} />
          </div>
        </section>
      </div>
      <CoachPopup isOpen={isCoachPopupOpen} onClose={togglePopup} />
    </section>
  );
}

export default SchoolPage;
