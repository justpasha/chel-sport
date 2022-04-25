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
export const getTestData = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    headers,
    method: 'GET',
  }).then(checkResponse);
};

const BASE_URL2 = 'https://api.nomoreparties.co/beatfilm-movies';

export const getAllMovies = () => {
  return fetch(`${BASE_URL2}`, {
    headers,
    method: 'GET',
  }).then((res) => res.json());
};
