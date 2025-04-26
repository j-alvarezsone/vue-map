<script lang="ts" setup>
import { computed } from "vue";
import { useMapState } from "../../store/map";
import { usePlacesState } from "../../store/places";

const { userLocation, isUserLocationReady } = usePlacesState();
const { map, isMapReady } = useMapState();

const isBtnReady = computed(() => isUserLocationReady.value && isMapReady);

function onMyLocationClick() {
  map.value?.flyTo({
    center: userLocation.value,
    zoom: 14,
  });
}
</script>

<template>
  <button v-if="isBtnReady" class="btn btn-primary" @click.prevent="onMyLocationClick">
    Go to my location
  </button>
</template>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
