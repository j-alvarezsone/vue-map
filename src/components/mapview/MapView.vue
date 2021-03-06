<script setup lang="ts">
import Mapboxgl from 'mapbox-gl';
import { ref, onMounted, watch } from 'vue';
import { usePlacesStore } from '../../composables';
import { useMapStore } from '../../composables/useMapStore';

const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();
const { setMap } = useMapStore();

const mapElement = ref<HTMLElement>();

const initMap = async () => {
  if (!mapElement.value) throw new Error('Div element not exist');
  if (!userLocation.value) throw new Error('User location not exist');

  await Promise.resolve();

  const map = new Mapboxgl.Map({
    container: mapElement.value, // container ID
    style: 'mapbox://sprites/mapbox/bright-v8', // style URL
    center: userLocation.value, // starting position [lng, lat]
    zoom: 15, // starting zoom
  });
  const myLocationPopUp = new Mapboxgl.Popup()
    .setLngLat(userLocation.value)
    .setHTML(
      `
      <h4>I'm here</h4></p>
      <p>Currently in Roztoky</p>
      `,
    )
    .addTo(map);

  const myLocationMarker = new Mapboxgl.Marker().setLngLat(userLocation.value).setPopup(myLocationPopUp).addTo(map);

  setMap(map);
};

onMounted(() => {
  if (isUserLocationReady.value) {
    return initMap();
  }
});

watch(
  () => isUserLocationReady.value,
  (newValue) => {
    if (newValue) {
      return initMap();
    }
  },
);
</script>

<template>
  <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h3>Please wait</h3>
      <span>Locating...</span>
    </div>
  </div>

  <div v-show="isUserLocationReady" ref="mapElement" class="map-container" />
</template>

<style scoped>
.loading-map {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
  left: 0;
  position: fix;
  top: 0;
  width: 100vw;
  z-index: 9999;
}

.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
