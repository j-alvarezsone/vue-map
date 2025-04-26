<script setup lang="ts">
import { onMounted } from "vue";
import MapView from "../features/map/components/MapView.vue";
import MyLocationBtn from "../features/shared/components/MyLocationBtn.vue";
import SearchBar from "../features/shared/components/SearchBar.vue";
import TripDetails from "../features/shared/components/TripDetails.vue";
import { usePlacesActions } from "../store/places";

const { getInitialLocation } = usePlacesActions();

onMounted(() => {
  getInitialLocation();
});
</script>

<template>
  <MapView />
  <SearchBar />
  <MyLocationBtn />
  <TripDetails />
</template>

<style scoped></style>
