import React, { useContext } from 'react';
import { AppDataContext } from '../context/AppData';
import {
  GoogleMap,
  LoadScript,
  Polygon,
  InfoWindow,
} from '@react-google-maps/api';
import { mapStyles } from './mapStyles';
import { SelectedAreaContext } from '../context/SelectedArea';
import { mapValues } from '../utils';
import { SelectedMetricContext } from '../context/SelectedMetric';

const containerStyle = {
  width: '65%',
  height: '82vh',
};

const center = {
  lat: 12.972442,
  lng: 77.620643,
};

const GoogleMapComponent = () => {
  const { areas } = useContext(AppDataContext);
  const { selectedArea, setSelectedArea } = useContext(SelectedAreaContext);
  const { selectedMetric } = useContext(SelectedMetricContext);
  const options = mapValues(areas, selectedMetric);

  return (
    <LoadScript googleMapsApiKey='AIzaSyCXLfaOFiFHnv7n6q5zEYiN_TDI1wWz0eE'>
      <GoogleMap
        mapContainerClassName='map'
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{
          disableDefaultUI: true,
          gestureHandling: 'none',
          keyboardShortcuts: false,
          styles: mapStyles,
        }}
      >
        {areas &&
          Object.keys(areas).map((id) => (
            <Polygon
              paths={areas[id].coordinates}
              key={id}
              options={options[id]}
              onMouseOver={() => {
                setSelectedArea(id);
              }}
              onMouseOut={() => {
                setSelectedArea(null);
              }}
            />
          ))}
        {areas && selectedArea && (
          <InfoWindow position={areas[selectedArea].center}>
            <>
              {' '}
              <div>
                {areas[selectedArea].name} :{' '}
                {areas[selectedArea][selectedMetric]}
              </div>
            </>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(GoogleMapComponent);
