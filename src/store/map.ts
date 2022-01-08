import Mapboxgl from 'mapbox-gl';
import { defineStore } from 'pinia';
interface MapState {
  map?: Mapboxgl.Map;
  markers: Mapboxgl.Marker[];
  distance?: number;
  durations?: number;
}

export const useMap = defineStore('map', {
  state: (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    durations: undefined,
  }),
  getters: {},
  actions: {},
});