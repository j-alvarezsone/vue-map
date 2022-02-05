import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1Ijoiai1hbHZhcmV6ODYiLCJhIjoiY2t5NXJtZnduMG94djJvcHF3MW42Z2UzdyJ9.QON5FS4FEvsDpF7pwifPyA',
  },
});

export default directionsApi;
