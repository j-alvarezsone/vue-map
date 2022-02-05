import { usePlaces } from '../store/places';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

export const usePlacesStore = () => {
  const placesStore = usePlaces();
  const { isUserLocationReady, isLoading, userLocation, places, isLoadingPlaces } = storeToRefs(placesStore);
  const { getInitialLocation, searchPlacesByTerm } = placesStore;

  onMounted(() => {
    if (!isUserLocationReady.value) {
      getInitialLocation();
    }
  });

  return {
    isLoading: computed(() => isLoading.value),
    userLocation: computed(() => userLocation?.value),
    isUserLocationReady: computed<boolean>(() => isUserLocationReady.value),
    places: computed(() => places.value),
    isLoadingPlaces: computed(() => isLoadingPlaces.value),
    searchPlacesByTerm: (query = '') => searchPlacesByTerm(query),
  };
};
