<script lang="ts" setup>
import SearchResult from '../search-results/SearchResult.vue';
import { ref, computed } from 'vue';
import { usePlacesStore } from '../../composables';

const debounceTimeout = ref();
const debouncedValue = ref<string>('');
const { searchPlacesByTerm } = usePlacesStore();
const searchTerm = computed({
  get() {
    return debouncedValue.value;
  },
  set(value: string) {
    // Cada vez que la persona escriba algo va limpiar el timeout
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    // Cuando deja de escribir se ejecuta este código
    debounceTimeout.value = setTimeout(() => {
      debouncedValue.value = value;
      searchPlacesByTerm(value);
    }, 500);
  },
});
</script>

<template>
  <div class="searchbar-container">
    <input v-model="searchTerm" type="text" class="form-control" placeholder="Search places" />
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
  overflow: hidden;
  padding: 5px;
}

input {
  outline: none;
  border: none;
}
</style>
