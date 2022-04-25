import { useEffect, useState } from 'react';
import { Link, Navigate, useMatch } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ districts, onFiltersChange }) {
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const isMain = useMatch('/');
  const isSchools = useMatch('/schools');

  useEffect(() => {
    setIsSubmit(false);
  }, []);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltersChange(school, district);
    setIsSubmit(true);
  };

  const handleAllSchoolClick = () => {
    onFiltersChange('', 'all');
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
          <select className="search-form__input search-form__input_select search-form__input_select_sport">
            <option>Вид спорта</option>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>
          <select
            className="search-form__input search-form__input_select"
            value={district}
            onChange={handleDistrictChange}
          >
            <option value="all">Все районы</option>
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
