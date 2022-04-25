import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SchoolList from '../SchoolList/SchoolList';
import SchoolShortCard from '../SchoolShortCard/SchoolShortCard';
import './MainPage.css';

function MainPage({ onGetServerData, onFindDistrict, onFiltersChange }) {
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const data = onGetServerData();

    setSchools(data.schoolsData.schools);
    setDistricts(data.districtsData.districts);
  }, []);

  return (
    <section className="main-page">
      <SearchForm districts={districts} onFiltersChange={onFiltersChange} />
      <div className="main-page__container">
        <h2 className="main-page__title">Лучшие предложения</h2>
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

export default MainPage;
