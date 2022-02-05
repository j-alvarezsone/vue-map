import { defineStore } from 'pinia';
import { searchApi } from '../apis';
import { PlacesResponse, Feature } from '../interfaces/places';

interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // lng, lat
  isLoadingPlaces: boolean;
  places: Feature[];
}

export const usePlaces = defineStore('places', {
  state: (): PlacesState => ({
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
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
    setIsLoadingPlaces() {
      this.isLoadingPlaces = true;
    },
    setPlaces(places: Feature[]) {
      this.places = places;
      this.isLoadingPlaces = false;
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
    async searchPlacesByTerm(query: string): Promise<Feature[]> {
      if (query.length === 0) {
        this.setPlaces([]);
        return [];
      }

      if (!this.userLocation) {
        throw new Error('No user location');
      }

      this.setIsLoadingPlaces();

      const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      });
      this.setPlaces(resp.data.features);

      return resp.data.features;
    },
  },
});
