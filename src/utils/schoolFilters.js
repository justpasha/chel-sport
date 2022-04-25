export const filterByName = (schoolArr, filterWord) => {
  return schoolArr.filter((school) =>
    school.name.toLowerCase().includes(filterWord.toLowerCase())
  );
};

export const filterByDistrict = (schoolArr, districtId) => {
  return schoolArr.filter(
    (school) => school.district_id.toString() === districtId.toString()
  );
};

export const filterByHighRating = (schoolArr, rating) => {
  return schoolArr.filter((school) => school.rating >= rating);
};
