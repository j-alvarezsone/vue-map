import { useMap, LngLat } from '../store/map';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Mapboxgl from 'mapbox-gl';
import { Feature } from '../interfaces/places';
export const useMapStore = () => {
  const mapStore = useMap();
  const { map, distance, durations, isMapReady } = storeToRefs(mapStore);
  const { setMap, setPlaceMarkers, getRouteBetweenPoints } = mapStore;

  return {
    map: computed(() => map?.value),
    distance: computed(() => distance?.value),
    durations: computed(() => durations?.value),
    isMapReady: computed<boolean>(() => isMapReady.value),
    setMap: (map: Mapboxgl.Map) => setMap(map),
    setPlaceMarkers: (places: Feature[]) => setPlaceMarkers(places),
    getRouteBetweenPoints: (start: LngLat, end: LngLat) => getRouteBetweenPoints({ start, end }),
  };
};
