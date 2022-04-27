import { useEffect, useState } from 'react';
import { Link, Navigate, useMatch } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ districts, onFiltersChange, sports }) {
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [sport, setSport] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const isMain = useMatch('/');
  const isSchools = useMatch('/schools');

  useEffect(() => {
    setIsSubmit(false);
  }, []);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleSportChange = (e) => {
    setSport(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltersChange(school, district, sport);
    setIsSubmit(true);
  };

  const handleAllSchoolClick = () => {
    onFiltersChange('', '', '');
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  return (
    <section
      className={`search-form ${isSchools ? 'search-form_schools' : ''}`}
    >
      <form
        className={`search-form__form ${
          isMain ? 'search-form__form_main' : ''
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className="search-form__title">Найдите школу по своим запросам!</h2>
        <div className="search-form__input-container">
          <select
            onChange={handleSportChange}
            value={sport}
            className="search-form__input search-form__input_select search-form__input_select_sport"
          >
            <option value="">Все виды спорта</option>
            {sports.map((s) => (
              <option key={s.id} value={s.id.toString()}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            className="search-form__input search-form__input_select"
            value={district}
            onChange={handleDistrictChange}
          >
            <option value="">Все районы</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id.toString()}>
                {district.name}
              </option>
            ))}
          </select>
          <input
            className="search-form__input search-form__input_text"
            type="text"
            placeholder="Название или ключевое слово"
            value={school}
            onChange={handleSchoolChange}
          />
        </div>
        <div className="search-form__button-container">
          {isMain ? (
            <Link
              onClick={handleAllSchoolClick}
              to="/schools"
              className="search-form__button search-form__button_search"
            >
              Все школы
            </Link>
          ) : (
            ''
          )}

          <button className="search-form__button" type="submit">
            Найти
          </button>
          {isMain && isSubmit ? <Navigate replace to="/schools" /> : ''}
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
