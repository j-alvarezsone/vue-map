import Mapboxgl from 'mapbox-gl';
import { defineStore } from 'pinia';
import { directionsApi } from '../apis';
import { Feature } from '../interfaces/places';
import { DirectionsResponse } from '../interfaces/directions';

interface MapState {
  map?: Mapboxgl.Map;
  markers: Mapboxgl.Marker[];
  distance?: number;
  durations?: number;
}

export type LngLat = [number, number];

export const useMap = defineStore('map', {
  state: (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    durations: undefined,
  }),
  getters: {
    isMapReady: (state): boolean => {
      return !!state.map;
    },
  },
  actions: {
    setMap(map: Mapboxgl.Map) {
      this.map = map;
    },
    setPlaceMarkers(places: Feature[]) {
      // Remove all markers
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];

      if (!this.map) return;

      // Add new markers
      for (const place of places) {
        const [lng, lat] = place.geometry.coordinates;

        const popup = new Mapboxgl.Popup().setLngLat([lng, lat]).setHTML(
          `
        <h4>${place.text}</h4></p>
        <p>${place.place_name}</p>
      `,
        );

        const marker = new Mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.map);

        this.markers.push(marker);
      }
    },
    async getRouteBetweenPoints({ start, end }: { start: LngLat; end: LngLat }) {
      const resp = await directionsApi.get<DirectionsResponse>(`${start.join(',')};${end.join(',')}`);
      console.log(resp.data.routes[0].geometry.coordinates);
    },
  },
});
