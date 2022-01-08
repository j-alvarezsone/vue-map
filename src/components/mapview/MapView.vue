<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlacesStore } from '../../composables';

const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();

const mapElement = ref<HTMLElement>();

onMounted(() => {
  console.log(mapElement.value);
});
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
  background-color: red;
}
</style>
