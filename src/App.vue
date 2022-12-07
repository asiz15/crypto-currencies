<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/navigation/NavBar.vue'
import AppFooter from './components/navigation/Footer.vue'
</script>

<template>
  <main class="min-vh-100">
    <NavBar />
    <RouterView />
    <AppFooter />
  </main>
</template>

