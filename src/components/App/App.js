import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import DistrictPage from '../DistrictPage/DistrictPage';
import Layout from '../Layuot/Layout';
import MainPage from '../MainPage/MainPage';
import Promo from '../Promo/Promo';
import SchoolPage from '../SchoolPage/SchoolPage';
import Schools from '../Schools/Schools';
import './App.css';

function App() {
  const [filterValues, setFilterValues] = useState({
    title: '',
    district: 'all',
  });

  function findDistrict(districts, schoolId) {
    return districts.find((d) => d.id.toString() === schoolId.toString());
  }

  function checkServerData() {
    if (!localStorage.getItem('schoolsData')) {
      mainApi
        .getAllSchools()
        .then((schoolsData) => {
          localStorage.setItem(
            'schoolsData',
            JSON.stringify({ schools: schoolsData.data })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!localStorage.getItem('districtsData')) {
      mainApi
        .getAllDistricts()
        .then((districtsData) => {
          localStorage.setItem(
            'districtsData',
            JSON.stringify({ districts: districtsData })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      schoolsData: JSON.parse(localStorage.getItem('schoolsData')),
      districtsData: JSON.parse(localStorage.getItem('districtsData')),
    };
  }

  function handleFiltersChange(title, district) {
    setFilterValues({ title, district });
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <MainPage
                onGetServerData={checkServerData}
                onFindDistrict={findDistrict}
                onFiltersChange={handleFiltersChange}
              />
            }
          />
          <Route
            path="schools"
            element={
              <Schools
                onGetServerData={checkServerData}
                onFindDistrict={findDistrict}
                onFiltersChange={handleFiltersChange}
                filterValues={filterValues}
              />
            }
          />
          <Route
            path="schools/:id"
            element={
              <SchoolPage
                onFindDistrict={findDistrict}
                onGetServerData={checkServerData}
              />
            }
          />
          <Route
            path="districts/:id"
            element={
              <DistrictPage
                onFindDistrict={findDistrict}
                onGetServerData={checkServerData}
              />
            }
          />
          <Route path="about" element={<Promo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
