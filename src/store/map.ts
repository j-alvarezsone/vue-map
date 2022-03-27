import Mapboxgl from 'mapbox-gl';
import { defineStore } from 'pinia';
import { directionsApi } from '../apis';
import { Feature } from '../interfaces/places';
import { DirectionsResponse } from '../interfaces/directions';

interface MapState {
  map?: Mapboxgl.Map;
  markers: Mapboxgl.Marker[];
  distance?: number;
  duration?: number;
}

export type LngLat = [number, number];

export const useMap = defineStore('map', {
  state: (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
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
    setDistanceDuration({ distance, duration }: { distance: number; duration: number }) {
      let kms = distance / 1000;
      kms = Math.round(kms * 100);
      kms /= 100;

      this.distance = kms;
      this.duration = Math.floor(duration / 60);
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
      // Clear polyline
      if (this.map?.getLayer('RouteString')) {
        this.map.removeLayer('RouteString');
        this.map.removeSource('RouteString');
        this.distance = undefined;
        this.duration = undefined;
      }
    },
    async getRouteBetweenPoints({ start, end }: { start: LngLat; end: LngLat }) {
      const resp = await directionsApi.get<DirectionsResponse>(`${start.join(',')};${end.join(',')}`);
      this.setDistanceDuration({
        distance: resp.data.routes[0].distance,
        duration: resp.data.routes[0].duration,
      });
      this.setRoutePolyline(resp.data.routes[0].geometry.coordinates);
    },
    setRoutePolyline(coords: number[][]) {
      const start = coords[0];
      const end = coords[coords.length - 1];

      // define bounds
      const bounds = new Mapboxgl.LngLatBounds([start[0], start[1]], [end[0], end[1]]);
      // add each point to the bounds
      for (const coord of coords) {
        const newCoord: [number, number] = [coord[0], coord[1]];
        bounds.extend(newCoord);
      }

      this.map?.fitBounds(bounds, { padding: 200 });

      // polyline
      const sourceData: Mapboxgl.AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords,
              },
            },
          ],
        },
      };

      if (this.map?.getSource('RouteString')) {
        this.map?.removeLayer('RouteString');
        this.map?.removeSource('RouteString');
      }

      this.map?.addSource('RouteString', sourceData);

      this.map?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': 'black',
          'line-width': 3,
        },
      });
    },
  },
});
