<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import CoinHistoricalData from '../components/coins/CoinHistoricalData.vue'
import CoinInfo from '../components/coins/CoinInfo.vue'
import CoinInfoSkeleton from '../components/skeletons/CoinInfoSkeleton.vue'
import Breadcrumbs from '../components/navigation/Breadcrumbs.vue'
import BreadcrumbsSkeleton from '../components/skeletons/BreadcrumbsSkeleton.vue'

dayjs.extend(utc)

// HOOKS
const router = useRouter()
const route = useRoute()

// STATES
const historicalData = ref([])
const coinData = ref(null)
const loading = reactive({
    coinData: false,
    historicalData: false
})
const errors = reactive({
    coinData: false,
    historicalData: false
})

// CONSTANTS
const coinId = route.params.id

// METHODS
const getCoinData = async () => {
    loading.coinData = true
    const config = {
        method: 'GET',
        url: `https://api.coincap.io/v2/assets/${coinId}`
    }
    axios(config)
        .then(res => {
            coinData.value = res.data.data
        })
        .catch(err => {
            const { status } = err.response
            errors.coinData = true
            if(status === 404){
                router.push({ name: 'not-found' })
            }
            console.log(err)
        })
        .finally(() => loading.coinData = false)
}
const getDatesInRange = (startDate, endDate) => {
    const dates = []
    const date = new Date(startDate.getTime())

    while (date <= endDate) {
        dates.push(dayjs(date))
        date.setDate(date.getDate() + 1)
    }

    return dates.map(day => {
        const startOfDay = new Date(day).setUTCHours(0, 0, 0, 0)
        const endOfday = new Date(day).setUTCHours(23, 59, 59, 999)
        return {
            start: startOfDay,
            end: endOfday
        }
    })
}
const getHistoricalData = async () => {
    loading.historicalData = true
    const lastWeekStart = new Date(dayjs().add(-7, 'days').format('YYYY-MM-DD'))
    const yesterday = new Date(dayjs().add(-1, 'days').format('YYYY-MM-DD'))
    const daysRange = getDatesInRange(lastWeekStart, yesterday)
    const requests = daysRange.map(d => {
        return axios(`https://api.coincap.io/v2/assets/${coinId}/history?interval=m1&start=${d.start}&end=${d.end}`)
    })

    axios.all(requests)
        .then(res => {
            const parsedResponses = res.map(dayResponse => {
                const { data: dayData } = dayResponse.data
                const sortedData = [...dayData].sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd))

                const openPrice = dayData[0].priceUsd
                const closePrice = dayData[dayData.length - 1].priceUsd
                const highestPrice = sortedData[0].priceUsd
                const lowestPrice = sortedData[dayData.length - 1].priceUsd

                return {
                    date: dayjs(dayData[0].date).utc().format('YYYY-MM-DD'),
                    data: {
                        openPrice,
                        closePrice,
                        highestPrice,
                        lowestPrice
                    }
                }
            })
            historicalData.value = parsedResponses
        })
        .catch(err => {
            errors.historicalData = true
        })
        .finally(() => loading.historicalData = false)
}

// LIFECYCLE HOOKS
onMounted(async () => {
    await getCoinData()
    await getHistoricalData()
})

</script>
<template>
    <div class="container coin-page">
        <Breadcrumbs v-if="(!loading.coinData && coinData)" :current-coin="coinData.name" />
        <BreadcrumbsSkeleton v-else />
        <CoinInfo v-if="(!loading.coinData && coinData)" :coin-data="coinData" />
        <CoinInfoSkeleton v-else />
        <section class="container pt-md-5">
            <h2 class="fs-3 mb-3">Historical data <span class="fs-6 text-black-50">(Last 7 days)</span></h2>
            <CoinHistoricalData :data="historicalData" :loading="loading.historicalData" :error="errors.historicalData" />
        </section>
    </div>

</template>
<style lang="scss">
.coin-page{
    min-height: 90vh;
}
</style>
