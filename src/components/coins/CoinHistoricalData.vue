<script setup>
import { priceParser } from '../../utils/parsers';
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    },
    error: {
        type: Boolean,
        required: true
    }
})   
</script>
<template>
    <div v-if="(!loading && !!data.length)" class="table-responsive">
        <table class="table table-bordered table-striped table-condensed w-100">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(day, index) in data" :key="index" class="day-row fs-7">
                    <td class="day-date">{{ day.date }}</td>
                    <td class="day-open-price">$ {{ priceParser(day.data.openPrice) }}</td>
                    <td class="day-highest-price">$ {{ priceParser(day.data.highestPrice) }}</td>
                    <td class="day-lowest-price">$ {{ priceParser(day.data.lowestPrice) }}</td>
                    <td class="day-close-price">$ {{ priceParser(day.data.closePrice) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="loading" class="loading w-100 d-flex justify-content-center align-items-center" style="height: 300px">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="(!loading && error)" class="not-data w-100 d-flex flex-column justify-content-center align-items-center bg-light" style="height: 300px">
            <font-awesome-icon icon="chart-line" class="fs-2 text-black-50" />
            <h2 class="fs-6 mt-3">
                There is not historical data for this coin.
            </h2>
        </div>
</template>
<style lang="scss" scoped>
.table th:first-child,
.table td:first-child {
    position: sticky;
    left: -3px;
    background: #fff;
}

.table td {
    white-space: nowrap;
}
</style>