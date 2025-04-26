import axios from "axios";
import { env } from "../lib/utils/env";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "en",
    access_token: env.VITE_MAPBOX_API_KEY,
  },
});

export default searchApi;
