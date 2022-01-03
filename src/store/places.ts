import { defineStore } from "pinia";

interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; // lng, lat
}

export const usePlacesStore = defineStore("places", {
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
    setLngLat(coords) {
      console.log({ coords });
      this.userLocation = coords;
      this.isLoading = false;
    },
    getInitialLocation() {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.setLngLat(coords);
        },
        (err) => {
          console.error(err);
          throw new Error("No geolocation");
        }
      );
    },
  },
});
