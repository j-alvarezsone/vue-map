<script setup lang="ts">
import { usePlacesStore } from '../composables';
import MapView from '../components/mapview/MapView.vue';
import MyLocationBtn from '../components/my-location-btn/MyLocationBtn.vue';
import SearchBar from '../components/searchbar/SearchBar.vue';

usePlacesStore();
</script>

<template>
  <MapView />
  <SearchBar />
  <MyLocationBtn />
</template>

<style scoped></style>
