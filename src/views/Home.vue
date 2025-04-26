<script setup lang="ts">
import { onMounted } from "vue";
import MapView from "../components/mapview/MapView.vue";
import MyLocationBtn from "../components/my-location-btn/MyLocationBtn.vue";
import SearchBar from "../components/searchbar/SearchBar.vue";
import TripDetails from "../components/trip-details/TripDetails.vue";
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
