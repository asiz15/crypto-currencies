<script setup>
import { computed, ref } from 'vue';
import { largeCurrencyParser, percentageParser, priceParser } from '../../utils/parsers'

const props = defineProps({
    coinData: {
        type: Object,
        required: true
    }
})

// STATES
const imageError = ref(false)

// METHODS
const handleImageError = () => {
    imageError.value = true
}

// COMPUTED PROPERTIES
const parsedChangePercent24Hr = computed(() => {
    return percentageParser(props.coinData?.changePercent24Hr)
})
const imageUrl = computed(() => {
    return imageError.value ?
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/3888px-Cryptocurrency_Logo.svg.png' :
        `https://assets.coincap.io/assets/icons/${props.coinData.symbol.toLowerCase()}@2x.png`
})

</script>
<template>
    <section class="row mb-5 px-4">
        <article class="col-md-3 d-flex flex-column align-items-center align-items-md-start">
            <div class="d-flex align-items-end justify-content-center justify-content-md-start w-100 pt-2">
                <img :src="imageUrl" width="50" height="50" class="me-3" @error="handleImageError" />
                <h1 class="m-0 fs-3 fw-bold">{{ props.coinData.name }}</h1>
                <span class="coin-symbol text-black-50 fs-7 bg-light p-1 ms-2 mb-1">{{ props.coinData.symbol }}</span>
            </div>
            <div class="d-flex mt-4">
                <span class="badge bg-secondary d-flex align-items-center fs-6 fw-ligth">Rank # {{
                        props.coinData.rank
                }}</span>
                <a class="explorer-link btn btn-secondary fs-7 ms-2" :href="props.coinData.explorer" target="_blank">
                    <font-awesome-icon icon="link" />
                    Explorer
                </a>
            </div>
        </article>
        <article class="col-md-5 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0">
            <div class="d-flex flex-column align-items-center">
                <p class="fs-7 mb-0 text-black-50">Current Price (USD)</p>
                <span class="coin-price fs-2 me-3 mb-0 fw-bold">$ {{ priceParser(props.coinData.priceUsd) }}</span>
                <span
                    :class="[parsedChangePercent24Hr > 0 ? 'text-bg-success' : 'text-bg-danger', 'badge', '', 'h-50', 'd-flex', 'justify-content-center', 'align-items-center']">
                    <font-awesome-icon v-if="(parsedChangePercent24Hr > 0)" icon="sort-up" class="me-2 mt-1" />
                    <font-awesome-icon v-else icon="sort-down" class="me-2 mb-1" />
                    {{ parsedChangePercent24Hr }} %
                </span>
            </div>
        </article>
        <article class="col-md-4 d-flex flex-column align-items-center align-items-md-end mt-4 mt-md-0">
            <div class="row w-100">
                <div class="col-6 d-flex flex-column p-2 align-items-center align-items-md-start">
                    <p class="m-0 text-black-50 fs-7">
                        Market Cap
                    </p>
                    <span class="fs-6 fw-bold">$ {{ largeCurrencyParser(props.coinData.marketCapUsd, true) }}</span>
                </div>
                <div class="col-6 d-flex flex-column p-2 align-items-center align-items-md-start">
                    <p class="m-0 text-black-50 fs-7">Volume (24hrs)</p>
                    <span class="fs-6 fw-bold">$ {{ largeCurrencyParser(props.coinData.volumeUsd24Hr, true) }}</span>
                </div>
                <div class="col-6 d-flex flex-column p-2 align-items-center align-items-md-start">
                    <p class="m-0 text-black-50 fs-7">VWAP (24 hrs)</p>
                    <span class="fs-6 fw-bold">$ {{ priceParser(props.coinData.vwap24Hr) }} USD</span>
                </div>
                <div class="col-6 d-flex flex-column p-2 align-items-center align-items-md-start">
                    <p class="m-0 text-black-50 fs-7">Supply</p>
                    <span class="fs-6 fw-bold">$ {{ largeCurrencyParser(props.coinData.supply, true) }}</span>
                </div>
            </div>
        </article>

    </section>
</template>