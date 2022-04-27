const BASE_URL = 'http://127.0.0.1:8000/api';

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(console.log(`Произошла ошибка ${res.status}`));
};

const headers = {
  'Content-Type': 'application/json',
};

export const getAllSchools = () => {
  return fetch(`${BASE_URL}/schools`, {
    headers,
    method: 'GET',
  }).then(checkResponse);
};

export const getAllDistricts = () => {
  return fetch(`${BASE_URL}/districts`, {
    headers,
    method: 'GET',
  }).then(checkResponse);
};

export const getAllSports = () => {
  return fetch(`${BASE_URL}/sports`, {
    headers,
    method: 'GET',
  }).then(checkResponse);
};

export const getAllCoaches = () => {
  return fetch(`${BASE_URL}/coaches`, {
    headers,
    method: 'GET',
  }).then(checkResponse);
};
