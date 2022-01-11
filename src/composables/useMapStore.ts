import { useMap } from '../store/map';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Mapboxgl from 'mapbox-gl';
export const useMapStore = () => {
  const mapStore = useMap();
  const { map, distance, durations, isMapReady } = storeToRefs(mapStore);
  const { setMap } = mapStore;

  return {
    map: computed(() => map?.value),
    distance: computed(() => distance?.value),
    durations: computed(() => durations?.value),
    isMapReady: computed<boolean>(() => isMapReady.value),
    setMap: (map: Mapboxgl.Map) => {
      setMap(map);
    },
  };
};
