<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const handleRouteChange = () => {
    router.push({path: '/', query: { page: 1}})
}
</script>
<template>
    <header class="w-100">
        <nav class="navbar navbar-dark bg-dark mt-0 ms-0 w-100">
            <div class="container">
                <div class="d-flex mx-auto" @click="handleRouteChange">
                    <img src="@/assets/logo.png" width="50" class="me-2" />
                    <span class="navbar-brand mb-0 fs-6 fw-bold" role="button" >Crypto Currencies</span>
                </div>
            </div>
        </nav>
    </header>
</template>