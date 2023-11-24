<template>
  <main>
    <NavBar></NavBar>
    <div id="dest"></div>
    <RouterView></RouterView>
    
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>