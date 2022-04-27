import { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './SchoolMap.css';

function SchoolMap({ coordinates }) {
  const [coord, setCoord] = useState([]);

  useEffect(() => {
    const coorArr = coordinates.split(', ');
    setCoord([Number(coorArr[0]), Number(coorArr[1])]);
  }, [coordinates]);

  const mapData = {
    center: [55.159901, 61.402547],
    zoom: 11,
  };

  return (
    <YMaps>
      <Map defaultState={mapData} width={500} height={500}>
        <Placemark geometry={coord ? coord : [55.159901, 61.402547]} />
      </Map>
    </YMaps>
  );
}

export default SchoolMap;
