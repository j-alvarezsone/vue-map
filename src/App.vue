<script setup lang="ts">
import Home from "./views/Home.vue";
</script>

<template>
  <Home />
  <img class="logo" src="./assets/logo.png" alt="Logo" />
</template>

<style>
.logo {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 100px;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
