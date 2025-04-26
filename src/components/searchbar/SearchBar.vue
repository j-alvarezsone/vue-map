<script lang="ts" setup>
import { computed, ref } from "vue";
import { usePlacesActions } from "../../store/places";
import SearchResult from "../search-results/SearchResult.vue";

const debounceTimeout = ref();
const debouncedValue = ref<string>("");
const { searchPlacesByTerm } = usePlacesActions();
const searchTerm = computed({
  get() {
    return debouncedValue.value;
  },
  set(value: string) {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }

    debounceTimeout.value = setTimeout(() => {
      debouncedValue.value = value;
      searchPlacesByTerm(value);
    }, 500);
  },
});
</script>

<template>
  <div class="searchbar-container max-height: 100px">
    <input v-model="searchTerm" type="text" class="form-control" placeholder="Search places">
    <SearchResult />
  </div>
</template>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  border-radius: 10px;
  overflow-y: auto;
  padding: 5px;
  max-height: 48rem;
}

input {
  outline: none;
  border: none;
}
</style>
