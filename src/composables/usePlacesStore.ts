import { usePlaces } from '../store/places';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

export const usePlacesStore = () => {
  const places = usePlaces();
  const { isUserLocationReady, isLoading, userLocation } = storeToRefs(places);
  const { getInitialLocation } = places;

  onMounted(() => {
    if (!isUserLocationReady.value) {
      getInitialLocation();
    }
  });

  return {
    isLoading: computed(() => isLoading.value),
    userLocation: computed(() => userLocation?.value),
    isUserLocationReady: computed<boolean>(() => isUserLocationReady.value),
  };
};
