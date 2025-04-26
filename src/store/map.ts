import type { DirectionsResponse } from "../interfaces/directions";
import type { Feature } from "../interfaces/places";
import mapboxgl from "mapbox-gl";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { directionsApi } from "../apis";

export type LngLat = [number, number];

export const useMapStore = defineStore("map", () => {
  const map = ref<mapboxgl.Map | undefined>();
  const markers = ref<mapboxgl.Marker[]>([]);
  const distance = ref<number | undefined>();
  const duration = ref<number | undefined>();

  const isMapReady = computed(() => !!map.value);

  function setMap(newMap: mapboxgl.Map) {
    map.value = newMap;
  }

  function setDistanceDuration({ distance: dist, duration: dur }: { distance: number, duration: number }) {
    let kms = dist / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    distance.value = kms;
    duration.value = Math.floor(dur / 60);
  }

  function setPlaceMarkers(places: Feature[]) {
    // Remove all markers
    markers.value.forEach((marker) => marker.remove());
    markers.value = [];

    if (!map.value)
      return;

    // Add new markers
    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;

      const popup = new mapboxgl.Popup().setLngLat([lng, lat]).setHTML(
        `
        <h4>${place.text}</h4></p>
        <p>${place.place_name}</p>
      `,
      );

      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map.value);

      // @ts-expect-error: Suppress deep type instantiation error from mapbox-gl
      markers.value.push(marker);
    }

    if (map.value?.getLayer("RouteString")) {
      map.value.removeLayer("RouteString");
      map.value.removeSource("RouteString");
      distance.value = undefined;
      duration.value = undefined;
    }
  }

  async function getRouteBetweenPoints({ start, end }: { start: LngLat, end: LngLat }) {
    const resp = await directionsApi.get<DirectionsResponse>(`${start.join(",")};${end.join(",")}`);
    setDistanceDuration({
      distance: resp.data.routes[0].distance,
      duration: resp.data.routes[0].duration,
    });
    setRoutePolyline(resp.data.routes[0].geometry.coordinates);
  }

  function setRoutePolyline(coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    // define bounds
    const bounds = new mapboxgl.LngLatBounds([start[0], start[1]], [end[0], end[1]]);
    // add each point to the bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    map.value?.fitBounds(bounds, { padding: 200 });

    // polyline
    const sourceData: mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (map.value?.getSource("RouteString")) {
      map.value?.removeLayer("RouteString");
      map.value?.removeSource("RouteString");
    }

    map.value?.addSource("RouteString", sourceData);

    map.value?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  }

  return {
    map,
    markers,
    distance,
    duration,
    isMapReady,
    setMap,
    setDistanceDuration,
    setPlaceMarkers,
    getRouteBetweenPoints,
    setRoutePolyline,
  };
});

export const useMapState = () => storeToRefs(useMapStore());
export const useMapActions = () => useMapStore();
