<script setup>
import CoinListItem from './CoinListItem.vue'
import CoinItemSkeleton from '../skeletons/CoinItemSkeleton.vue'

defineProps({
    coins: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})
</script>
<template>
    <section>
        <div class="w-100 row p-2 bg-light d-flex align-items-center fw-bold my-md-3 mx-0 list-header">
            <div class="col col-2 col-md-1 d-none d-md-block text-center p-0">Rank</div>
            <div class="col col-5 col-md-3 text-start">Coin</div>
            <div class="col col-5 col-md-2 text-center">Price</div>
            <div class="col col-3 col-md-2 d-none d-md-block text-center">Market Cap</div>
            <div class="col col-2 col-md-1 d-none d-md-block text-center">VWAP (24hr)</div>
            <div class="col col-1 col-md-1 d-none d-md-block text-center">Supply</div>
            <div class="col col-1 col-md-1 d-none d-md-block text-center">Volume (24hr)</div>
            <div class="col col-2 col-md-1 text-center">
                <span class="d-none d-md-block">Change (24hr)</span>
                <span class="d-md-none">24hr</span>
            </div>
        </div>  
        <template v-if="(!loading && !!coins.length)">
            <CoinListItem v-for="coin in coins" :key="coin.id" :coin="coin" />
        </template>
        <template v-if="loading">
            <CoinItemSkeleton v-for="index in 15" />
        </template>
    </section>
</template>
<style lang="scss" scoped>
.list-header {
    position: sticky;
    top: 0;
    font-size: .8em;
    z-index: 999;
}
</style>