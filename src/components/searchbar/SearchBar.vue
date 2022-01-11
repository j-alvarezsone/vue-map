<script lang="ts" setup>
import SearchResult from '../search-results/SearchResult.vue';
</script>

<template>
  <div class="searchbar-container">
    <input type="text" class="form-control" placeholder="Search places" />

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
