<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
  .app-container {
    min-height: 100vh;
  }
</style>
