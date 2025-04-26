import type { Feature, PlacesResponse } from "../interfaces/places";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { searchApi } from "../apis";

export type UserLocation = [number, number]; // [lng, lat]

export const usePlacesStore = defineStore("places", () => {
  const isLoading = ref<boolean>(true);
  const userLocation = ref<UserLocation | undefined>(undefined);
  const isLoadingPlaces = ref<boolean>(false);
  const places = ref<Feature[]>([]);

  const isUserLocationReady = computed(() => !!userLocation.value);

  function setLngLat({ lng, lat }: { lng: number, lat: number }) {
    userLocation.value = [lng, lat];
    isLoading.value = false;
  }

  function setIsLoadingPlaces() {
    isLoadingPlaces.value = true;
  }

  function setPlaces(newPlaces: Feature[]) {
    places.value = newPlaces;
    isLoadingPlaces.value = false;
  }

  function getInitialLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLngLat({ lng: coords.longitude, lat: coords.latitude });
      },
      (err) => {
        console.error(err);
        throw new Error("No geolocation");
      },
    );
  }

  async function searchPlacesByTerm(query: string): Promise<Feature[]> {
    if (query.length === 0) {
      setPlaces([]);
      return [];
    }
    if (!userLocation.value) {
      throw new Error("No user location");
    }
    setIsLoadingPlaces();
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: userLocation.value.join(","),
      },
    });
    setPlaces(resp.data.features);
    return resp.data.features;
  }

  return {
    isLoading,
    userLocation,
    isLoadingPlaces,
    places,
    isUserLocationReady,
    setLngLat,
    setIsLoadingPlaces,
    setPlaces,
    getInitialLocation,
    searchPlacesByTerm,
  };
});

export const usePlacesState = () => storeToRefs(usePlacesStore());
export function usePlacesActions() {
  const placesStore = usePlacesStore();
  return {
    $dispose: placesStore.$dispose,
    $id: placesStore.$id,
    $onAction: placesStore.$onAction,
    $patch: placesStore.$patch,
    $reset: placesStore.$reset,
    $state: placesStore.$state,
    $subscribe: placesStore.$subscribe,
    _customProperties: placesStore._customProperties,
    setLngLat: placesStore.setLngLat,
    setIsLoadingPlaces: placesStore.setIsLoadingPlaces,
    setPlaces: placesStore.setPlaces,
    getInitialLocation: placesStore.getInitialLocation,
    searchPlacesByTerm: placesStore.searchPlacesByTerm,
  };
}
