<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ info: Object, isPlan: Boolean })
const emit = defineEmits(['addPlanDetail'])

let planDetail = ref({
  contentId: 0,
  planDetailId: -1,
  visitOrder: 0,
  title: null,
  addr1: null,
  visitDate: null,
  memo: null
})
</script>

<template>
  <a-card style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
</template>

<style scoped></style>
