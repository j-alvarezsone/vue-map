import { usePlaces } from "../store/places";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

export const usePlacesStore = () => {
  const places = usePlaces();
  const { isUserLocationReady } = storeToRefs(places);
  const { getInitialLocation } = places;

  onMounted(() => {
    if (!isUserLocationReady.value) {
      getInitialLocation();
    }
  });

  return {};
};
