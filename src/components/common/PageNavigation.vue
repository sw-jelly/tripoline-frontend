<script setup>
import { computed } from 'vue'

const props = defineProps({ currentPage: Number, totalPage: Number })
const emit = defineEmits(['pageChange'])

const navigationSize = parseInt(import.meta.env.VITE_ARTICLE_NAVIGATION_SIZE)

const startPage = computed(() => {
  return parseInt((props.currentPage - 1) / navigationSize) * navigationSize + 1
})

const endPage = computed(() => {
  let lastPage =
    parseInt((props.currentPage - 1) / navigationSize) * navigationSize + navigationSize
  return props.totalPage < lastPage ? props.totalPage : lastPage
})

const endRange = computed(() => {
  return parseInt((props.totalPage - 1) / navigationSize) * navigationSize < props.currentPage
})

function range(start, end) {
  const list = []
  for (let i = start; i <= end; i++) list.push(i)
  return list
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((val, i) => start + i);
}

function onPageChange(pg) {
  console.log(pg + '로 이동!!!')
  emit('pageChange', pg)
}
</script>

<template>
  <div class="text-center w-3/6">
    <ul class="inline-flex -space-x-px text-sm">
      <li class="float-left mr-[10px]">
        <a
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="onPageChange(1)"
          >처음 페이지</a
        >
      </li>
      <li class="float-left">
        <a
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="onPageChange(startPage == 1 ? 1 : startPage - 1)"
          >&lt;</a
        >
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="pg">
        <li :class="currentPage === pg ? 'text-blue-600' : ''">
          <a
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onPageChange(pg)"
            >{{ pg }}</a
          >
        </li>
      </template>
      <li class="float-left">
        <a
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="onPageChange(endRange ? totalPage : endPage + 1)"
          >&gt;</a
        >
      </li>
      <li class="float-left ml-[10px]">
        <a
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="onPageChange(totalPage)"
          >끝 페이지</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
