<script lang="ts" setup>
import { useMapStore } from '../../composables';
import { usePlacesStore } from '../../composables';
import { computed } from 'vue';

const { userLocation, isUserLocationReady } = usePlacesStore();
const { map, isMapReady } = useMapStore();

const isBtnReady = computed(() => isUserLocationReady.value && isMapReady);

const onMyLocationClick = () => {
  map.value?.flyTo({
    center: userLocation.value,
    zoom: 14,
  });
};
</script>

<template>
  <button v-if="isBtnReady" class="btn btn-primary" @click.prevent="onMyLocationClick">Go to my location</button>
</template>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
