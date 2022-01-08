<script setup lang="ts">
import { usePlacesStore } from "../composables";
import MapView from "../components/mapview/MapView.vue";

usePlacesStore();
</script>

<template>
  <MapView />
</template>

<style scoped></style>
