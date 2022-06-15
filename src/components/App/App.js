import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import DistrictPage from '../DistrictPage/DistrictPage';
import Layout from '../Layuot/Layout';
import MainPage from '../MainPage/MainPage';
import Promo from '../Promo/Promo';
import SchoolPage from '../SchoolPage/SchoolPage';
import Schools from '../Schools/Schools';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './App.css';

import schoolJsonArr from '../../utils/schools.json';
import districtJsonArr from '../../utils/districts.json';
import sportJsonArr from '../../utils/sports.json';
import coachJsonArr from '../../utils/coaches.json';

function App() {
  const [schools, setSchools] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sports, setSports] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [filterValues, setFilterValues] = useState({
    title: '',
    district: '',
    sport: '',
  });

  useEffect(() => {
    mainApi
      .getAllSchools()
      .then((schoolsData) => {
        setSchools(schoolsData.data);
      })
      .catch((err) => {
        const schoolData = JSON.parse(JSON.stringify(schoolJsonArr));
        setSchools(schoolData.data);
        console.log(err);
      });

    mainApi
      .getAllCoaches()
      .then((coachesData) => {
        setCoaches(coachesData.data);
      })
      .catch((err) => {
        const coachData = JSON.parse(JSON.stringify(coachJsonArr));
        setCoaches(coachData.data);
        console.log(err);
      });

    if (!localStorage.getItem('districtsData')) {
      mainApi
        .getAllDistricts()
        .then((districtsData) => {
          setDistricts(districtsData);
          localStorage.setItem(
            'districtsData',
            JSON.stringify({ districts: districtsData })
          );
        })
        .catch((err) => {
          setDistricts(JSON.parse(JSON.stringify(districtJsonArr)));
          console.log(err);
        });
    } else {
      const districtData = JSON.parse(localStorage.getItem('districtsData'));
      setDistricts(districtData.districts);
    }

    if (!localStorage.getItem('sportsData')) {
      mainApi
        .getAllSports()
        .then((sportsData) => {
          setSports(sportsData);
          localStorage.setItem(
            'sportsData',
            JSON.stringify({ sports: sportsData })
          );
        })
        .catch((err) => {
          setSports(JSON.parse(JSON.stringify(sportJsonArr)));
          console.log(err);
        });
    } else {
      const sportstData = JSON.parse(localStorage.getItem('sportsData'));
      setSports(sportstData.sports);
    }
  }, []);

  function findCoach(coachesArr, schoolId) {
    return coachesArr.filter(
      (coach) => coach.job_place.toString() === schoolId.toString()
    );
  }

  function findDistrict(districts, schoolId) {
    return districts.find((d) => d.id.toString() === schoolId.toString());
  }

  function findSports(sports, schoolSportId) {
    const idArr = schoolSportId.split(',');
    let sportList = '';
    let i = 0;

    while (i < idArr.length) {
      const sport = sports.find((s) => s.id.toString() === idArr[i]);
      sportList = sportList + sport.name + ' ';
      i++;
    }

    return sportList;
  }

  function handleFiltersChange(title, district, sport) {
    setFilterValues({ title, district, sport });
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <MainPage
                schools={schools}
                districts={districts}
                sports={sports}
                onFindDistrict={findDistrict}
                onFiltersChange={handleFiltersChange}
                onFindSports={findSports}
              />
            }
          />
          <Route
            path="schools"
            element={
              <Schools
                schools={schools}
                districts={districts}
                sports={sports}
                onFindDistrict={findDistrict}
                onFiltersChange={handleFiltersChange}
                filterValues={filterValues}
                onFindSports={findSports}
              />
            }
          />
          <Route
            path="schools/:id"
            element={
              schools.length > 0 ? (
                <SchoolPage
                  onFindCoach={findCoach}
                  onFindDistrict={findDistrict}
                  schools={schools}
                  districts={districts}
                  coaches={coaches}
                />
              ) : (
                ''
              )
            }
          />
          <Route
            path="districts/:id"
            element={
              <DistrictPage
                schools={schools}
                districts={districts}
                sports={sports}
                onFindDistrict={findDistrict}
                onFindSports={findSports}
              />
            }
          />
          <Route path="about" element={<Promo />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
