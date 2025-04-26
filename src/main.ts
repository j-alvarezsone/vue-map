import mapboxgl from "mapbox-gl";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const app = createApp(App);

if (!navigator.geolocation) {
  throw new Error("Your browser does not support GeoLocation");
}

app.use(router);
app.use(createPinia());
app.mount("#app");
