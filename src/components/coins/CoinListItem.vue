<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { priceParser, percentageParser, largeCurrencyParser } from '../../utils/parsers'

const props = defineProps({
    coin: {
        type: Object,
        required: true
    }
})
const router = useRouter()

const imageError = ref(false)

const parsedPrice = computed(() => {
    return priceParser(props.coin.priceUsd)
})
const parsedChangePercent24Hr = computed(() => {
    return percentageParser(props.coin.changePercent24Hr)
})

const handleCoinClick = () => {
    router.push(`/coin/${props.coin.id}`)
}

const handleImageError = () => {
    imageError.value = true
}

const imageUrl = computed(() => {
    return imageError.value ? 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/3888px-Cryptocurrency_Logo.svg.png' :
        `https://assets.coincap.io/assets/icons/${props.coin.symbol.toLowerCase()}@2x.png`
})

</script>
<template>
    <article class="coin-item row p-2 m-0 border-bottom d-flex align-items-center" role="button" @click="handleCoinClick">
        <div class="col col-2 d-none d-md-block col-md-1 text-center p-0 fs-7"># {{ coin.rank }}</div>
        <div class="col col-5 col-md-3 text-start d-flex align-items-center">
            <img :src="imageUrl" width="27" height="27" class="me-3" @error="handleImageError" />
            <div class="d-flex flex-column">
                <h6 class="coin-name mb-0 fs-6">{{ coin.name }}</h6>
                <span class="coin-symbol fs-7 text-black-50">{{ coin.symbol }}</span>
            </div>
        </div>
        <div class="col col-5 col-md-2 text-center fs-7">
            ${{ parsedPrice }}
        </div>
        <div class="col col-3 col-md-2 d-none d-md-block text-center fs-7">
         $ {{ largeCurrencyParser(coin.marketCapUsd) }}
        </div>
        <div class="col col-2 col-md-1 d-none d-md-block text-center fs-7">$ {{ priceParser(coin.vwap24Hr) }}</div>
        <div class="col col-1 col-md-1 d-none d-md-block text-center p-0 fs-7">
            $ {{ largeCurrencyParser(coin.supply) }}
        </div>
        <div class="col col-1 col-md-1 d-none d-md-block text-center fs-7">
            $ {{ largeCurrencyParser(coin.volumeUsd24Hr) }}
        </div>
        <div class="col col-2 col-md-1 text-center p-0 fs-7">
            <span :class="[parsedChangePercent24Hr >= 0 ? 'text-success' : 'text-danger']">{{ parsedChangePercent24Hr }} %</span>
        </div>
    </article>
</template>