import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './SchoolMap.css';

function SchoolMap({ coordinates }) {
  const mapData = {
    center: [55.159901, 61.402547],
    zoom: 11,
  };

  const coordinatesProcessing = (coordinatesData) => {
    const coorArr = coordinatesData.split(', ');
    return [Number(coorArr[0]), Number(coorArr[1])];
  };

  return (
    <YMaps>
      <Map defaultState={mapData} width={500} height={500}>
        <Placemark geometry={coordinatesProcessing(coordinates)} />
      </Map>
    </YMaps>
  );
}

export default SchoolMap;

// return (
//   <YMaps>
//     <div>
//       My awesome application with maps!
//       <Map defaultState={mapData} width={500} height={500}>
//         {coordinates.map((coordinate, i) => (
//           <Placemark key={i} geometry={coordinate} />
//         ))}
//       </Map>
//     </div>
//   </YMaps>
// );
// }
