import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './SchoolMap.css';

function SchoolMap() {
  const mapData = {
    center: [55.159901, 61.402547],
    zoom: 9,
  };

  const coordinates = [
    [55.155489, 61.388414],
    [55.168079, 61.371804],
  ];

  return (
    <YMaps>
      <div>
        <Map defaultState={mapData} width={500} height={500}>
          {coordinates.map((coordinate, i) => (
            <Placemark key={i} geometry={coordinate} />
          ))}
        </Map>
      </div>
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
