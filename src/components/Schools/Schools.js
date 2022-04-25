import { useEffect, useState } from 'react';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import SearchForm from '../SearchForm/SearchForm';
import { filterByDistrict, filterByName } from '../../utils/schoolFilters';
import './Schools.css';

function Schools({
  onGetServerData,
  onFindDistrict,
  onFiltersChange,
  filterValues,
}) {
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const data = onGetServerData();
    let filteredArr = data.schoolsData.schools;
    setDistricts(data.districtsData.districts);

    if (filterValues.district !== 'all') {
      filteredArr = filterByDistrict(filteredArr, filterValues.district);
    }

    if (filterValues.title !== '') {
      filteredArr = filterByName(filteredArr, filterValues.title);
    }
    setSchools(filteredArr);
  }, [filterValues, onGetServerData]);

  return (
    <section className="schools">
      <SearchForm districts={districts} onFiltersChange={onFiltersChange} />
      <div className="schools__container">
        <h2 className="schools__title">Школы по вашему запросу</h2>
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

export default Schools;
