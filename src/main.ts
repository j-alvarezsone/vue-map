import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiai1hbHZhcmV6ODYiLCJhIjoiY2twMmh5bGc3MW4wMTJ5bWNmc2o2MzJpOCJ9.y1u2AcNkWPvRrTjTFQ26Vw';

const app = createApp(App);

if (!navigator.geolocation) {
  alert('Your browser does not support GeoLocation');
  throw new Error('Your browser does not support GeoLocation');
}

app.use(router);
app.use(createPinia());
app.mount('#app');
