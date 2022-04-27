import { useEffect, useState } from 'react';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import SearchForm from '../SearchForm/SearchForm';
import {
  filterByDistrict,
  filterByName,
  filterBySport,
} from '../../utils/schoolFilters';
import './Schools.css';
import NoResultsSection from '../NoResultsSection/NoResultsSection';

function Schools({
  schools,
  districts,
  sports,
  onFindDistrict,
  onFiltersChange,
  filterValues,
  onFindSports,
}) {
  const [schoolsData, setSchoolsData] = useState([]);

  useEffect(() => {
    if (schools.length < 1) {
      return;
    }
    let filteredArr = schools;

    if (filterValues.district !== '') {
      filteredArr = filterByDistrict(filteredArr, filterValues.district);
    }

    if (filterValues.title !== '') {
      filteredArr = filterByName(filteredArr, filterValues.title);
    }

    if (filterValues.sport !== '') {
      filteredArr = filterBySport(filteredArr, filterValues.sport);
    }
    setSchoolsData(filteredArr);
  }, [schools, filterValues]);

  return (
    <section className="schools">
      <SearchForm
        sports={sports}
        districts={districts}
        onFiltersChange={onFiltersChange}
      />
      <div className="schools__container">
        <h2 className="schools__title">Школы по вашему запросу</h2>
        <SchoolList>
          {schoolsData.length > 0 ? (
            schoolsData.map((school) => (
              <SchoolShortCard
                key={school.id}
                schoolData={school}
                onFindDistrict={onFindDistrict}
                districts={districts}
                sports={sports}
                onFindSports={onFindSports}
              />
            ))
          ) : (
            <NoResultsSection />
          )}
        </SchoolList>
      </div>
    </section>
  );
}

export default Schools;
