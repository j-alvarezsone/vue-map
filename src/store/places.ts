import { defineStore } from 'pinia';
import { searchApi } from '../apis';
import { PlacesResponse } from '../interfaces/places';

interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // lng, lat
}

export const usePlaces = defineStore('places', {
  state: (): PlacesState => ({
    isLoading: true,
    userLocation: undefined,
  }),
  getters: {
    isUserLocationReady: (state) => {
      return !!state.userLocation;
    },
  },
  actions: {
    setLngLat({ lng, lat }: { lng: number; lat: number }) {
      this.userLocation = [lng, lat];
      this.isLoading = false;
    },
    getInitialLocation() {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.setLngLat({ lng: coords.longitude, lat: coords.latitude });
        },
        (err) => {
          console.error(err);
          throw new Error('No geolocation');
        },
      );
    },
    async searchPlacesByTerm(query: string) {
      const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      });
      console.log(resp.data.features);
    },
  },
});
