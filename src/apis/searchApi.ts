import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "en",
    access_token: "pk.eyJ1Ijoiai1hbHZhcmV6ODYiLCJhIjoiY2t5NXJtZnduMG94djJvcHF3MW42Z2UzdyJ9.QON5FS4FEvsDpF7pwifPyA",
  },
});

export default searchApi;
