<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="not-found-page d-flex flex-column justify-content-center align-items-center">
        <h1 class="fs-1">404</h1>
        <h2 class="fs-3">Not found</h2>
        <RouterLink to="/" class="btn btn-primary mt-3">Back to home</RouterLink>
    </div>
</template>
<style lang="scss" scoped>
.not-found-page{ 
    height: 90vh;
}
</style>