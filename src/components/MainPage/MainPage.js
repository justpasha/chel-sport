import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import './MainPage.css';
import { filterByHighRating } from '../../utils/schoolFilters';

function MainPage({
  schools,
  districts,
  sports,
  onFindDistrict,
  onFiltersChange,
  onFindSports,
}) {
  const [schoolsData, setSchoolsData] = useState([]);

  useEffect(() => {
    if (schools.length < 1) {
      return;
    }
    setSchoolsData(filterByHighRating(schools, 4.2));
  }, [schools]);

  return (
    <section className="main-page">
      <SearchForm
        sports={sports}
        districts={districts}
        onFiltersChange={onFiltersChange}
      />
      <div className="main-page__container">
        <h2 className="main-page__title">Лучшие предложения</h2>
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

export default MainPage;
