<script lang="ts" setup>
import type { Feature } from "../../../interfaces/places";
import { ref, watch } from "vue";
import { useMapActions, useMapState } from "../../../store/map";
import { usePlacesState } from "../../../store/places";

const { isLoadingPlaces, places, userLocation } = usePlacesState();
const { map } = useMapState();
const { setPlaceMarkers, getRouteBetweenPoints } = useMapActions();

const activePlace = ref<string>("");
async function onPlaceClicked(place: Feature) {
  activePlace.value = place.id;

  const [lng, lat] = place.center;

  map.value?.flyTo({
    center: [lng, lat],
    zoom: 14,
  });
}

async function getRoutesDirections(place: Feature) {
  if (!userLocation.value)
    return;

  const [lng, lat] = place.center;

  const [startLng, startLat] = userLocation.value;

  const start: [number, number] = [startLng, startLat];
  const end: [number, number] = [lng, lat];

  await getRouteBetweenPoints({ start, end });
}

watch(
  () => places.value,
  (newPlaces) => {
    activePlace.value = "";
    setPlaceMarkers(newPlaces);
  },
);
</script>

<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Loading</h5>
    <span>Please wait</span>
  </div>
  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group-item list-group-item-action"
      :class="{ active: place.id === activePlace }"
      @click.prevent="onPlaceClicked(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button
          class="btn btn-outline-primary btn-sm"
          :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'"
          @click.self="getRoutesDirections(place)"
        >
          place
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}
h5 {
  font-size: 1.3rem;
}
p {
  font-size: 0.9rem;
}
</style>
