import { usePlaces } from '../store/places';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

export const usePlacesStore = () => {
  const placesStore = usePlaces();
  const { isUserLocationReady, isLoading, userLocation } = storeToRefs(placesStore);
  const { getInitialLocation } = placesStore;

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
