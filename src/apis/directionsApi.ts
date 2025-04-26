import axios from "axios";
import { env } from "../lib/utils/env";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    access_token: env.VITE_MAPBOX_API_KEY,
  },
});

export default directionsApi;
