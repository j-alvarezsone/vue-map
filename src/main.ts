import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";

const app = createApp(App);

if (!navigator.geolocation) {
  alert("Your browser does not support GeoLocation");
  throw new Error("Your browser does not support GeoLocation");
}

app.use(router);
app.use(createPinia());
app.mount("#app");
