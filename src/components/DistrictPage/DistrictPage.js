import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filterByDistrict } from '../../utils/schoolFilters';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import './DistrictPage.css';

function DistrictPage({ onGetServerData, onFindDistrict }) {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({});
  const [schools, setSchools] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const data = onGetServerData();

    setSchools(filterByDistrict(data.schoolsData.schools, id));
    setDistricts(data.districtsData.districts);
    setDistrict(onFindDistrict(data.districtsData.districts, id));
  }, []);

  return (
    <section className="district-page">
      <div className="district-page__container">
        <h2 className="district-page__title">{district.name}</h2>
        <SchoolList>
          {schools.map((school) => (
            <SchoolShortCard
              key={school.id}
              schoolData={school}
              onFindDistrict={onFindDistrict}
              districts={districts}
            />
          ))}
        </SchoolList>
      </div>
    </section>
  );
}

export default DistrictPage;
