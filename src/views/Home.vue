<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import CoinsList from '../components/coins/CoinsList.vue'
import Pagination from '../components/navigation/Pagination.vue'

// HOOKS
const router = useRouter()
const route = useRoute()

// STATES
const coins = reactive({
  data: [],
  loading: false
})
const currentPage = ref(1)
const itemsPerPage = 15

// METHODS
const getCoins = () => {
  coins.loading = true
  const config = {
    method: 'GET',
    url: 'https://api.coincap.io/v2/assets',
    params: {
      limit: itemsPerPage,
      offset: (currentPage.value - 1) * itemsPerPage
    }
  }
  axios(config)
    .then(res => {
      coins.data = res.data.data
    })
    .catch(err => console.log(err))
    .finally(() => coins.loading = false)
}
const handlePageChange = (page) => {
  currentPage.value = page
}
const handlePrevPage = () => {
  currentPage.value = currentPage.value - 1
}
const handleNextPage = () => {
  currentPage.value = currentPage.value + 1
}

// COMPUTED PROPERTIES
const pageQuery = computed(() => {
  return route.query.page || 1
})

// WATCHERS
watch(currentPage, (newVal) => {
  router.push({ query: { page: newVal } })
})
watch(pageQuery, () => {
  getCoins()
})

// LIFECYCLE HOOKS
onMounted(() => {
  if (route.query.page) {
    currentPage.value = +route.query.page
  }
  getCoins()
})

</script>

<template>
  <section class="py-3">
    <CoinsList :coins="coins.data" :loading="coins.loading" />
    <div class="d-flex justify-content-center mb-3 mt-5">
      <Pagination 
        :total-rows="2295" 
        :max-pages-visible="5" 
        :rows-per-page="itemsPerPage" 
        :current-page="currentPage"
        @page-change="handlePageChange" 
        @prev-page-change="handlePrevPage"
        @next-page-change="handleNextPage"
        />
    </div>
  </section>
</template>
