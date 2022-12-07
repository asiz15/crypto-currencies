<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        default: () => 1
    },
    totalRows: {
        type: Number,
        default: () => 153
    },
    rowsPerPage: {
        type: Number,
        default: () => 0
    },
    maxPagesVisible: {
        type: Number,
        default: () => 7
    }
})
const emit = defineEmits(['pageChange', 'prevPageChange', 'nextPageChange'])

const handlePageClick = (page) => {
    emit('pageChange', page);
}
const handlePrevPageClick = () => {
    emit('prevPageChange')
}
const handleNextPageClick = () => {
    emit('nextPageChange')
}
const generatePagesRange = (start, end) => {
    return Array.from(Array(end - start + 1), (_, index) => index + start)
}

const pages = computed(() => {

    const max = props.maxPagesVisible;
    const middle = Math.floor(props.maxPagesVisible / 2)
    const pageNum = Math.ceil(props.totalRows / props.rowsPerPage)

    if (pageNum < max) {
        return generatePagesRange(1, pageNum)
    }

    let start = props.currentPage - middle
    let end = props.currentPage + middle

    if (props.currentPage >= pageNum - middle) {
        start = pageNum - max + 1
        end = pageNum
    }

    return generatePagesRange(Math.max(1, start), Math.max(end, max))
})
</script>
<template>
    <nav>
        <ul class="pagination">
            <li class="page-item">
                <a :class="['page-link','prev-page', currentPage === 1 ? 'disabled' : '']" role="button" @click="handlePrevPageClick">Previous</a>
            </li>
            <template v-for="(page, index) in pages">
                <li v-if="(index < maxPagesVisible)" :key="('pagination-page-' + index)"
                    :class="{ 'page-item': 1, active: currentPage == page }">
                    <a class="page-link page-link-item" role="button" @click="handlePageClick(page)">{{ page }}</a>
                </li>
            </template>
            <li class="page-item">
                <a :class="['page-link', 'next-page', currentPage === Math.ceil(totalRows/rowsPerPage) ? 'disabled' : '']" role="button" @click="handleNextPageClick">Next</a>
            </li>
        </ul>
    </nav>
</template>