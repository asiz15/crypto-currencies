<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    currentCoin: {
        type: String,
        required: true
    }
})
</script>
<template>
    <nav class="px-3 mt-3 mb-5">
        <ol class="breadcrumb">
            <li class="breadcrumb-item fs-7 text-black-50">
                <RouterLink to="/">Crypto currencies </RouterLink>
            </li>
            <li class="breadcrumb-item fs-7 text-black">{{ props.currentCoin }}</li>
        </ol>
    </nav>
</template>