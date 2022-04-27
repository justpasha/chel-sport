import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filterByDistrict } from '../../utils/schoolFilters';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import './DistrictPage.css';

function DistrictPage({
  schools,
  districts,
  sports,
  onFindDistrict,
  onFindSports,
}) {
  const [schoolsData, setSchoolsData] = useState([]);
  const [district, setDistrict] = useState({});

  let { id } = useParams();

  useEffect(() => {
    if (schools.length < 1 || districts.length < 1) {
      return;
    }
    setSchoolsData(filterByDistrict(schools, id));
    setDistrict(onFindDistrict(districts, id));
  }, [schools, id, districts]);

  return (
    <section className="district-page">
      <div className="district-page__container">
        <h2 className="district-page__title">{district.name}</h2>
        <SchoolList>
          {schoolsData.map((school) => (
            <SchoolShortCard
              key={school.id}
              schoolData={school}
              onFindDistrict={onFindDistrict}
              districts={districts}
              sports={sports}
              onFindSports={onFindSports}
            />
          ))}
        </SchoolList>
      </div>
    </section>
  );
}

export default DistrictPage;
