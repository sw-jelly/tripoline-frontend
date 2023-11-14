<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

// 사용자 로그인 정보 있는지 여부 확인
const user = ref(true)
</script>

<template>
  <TheHeadingNavbar v-if="false" />
  <RouterView />
  <Footer v-if="false" />
</template>

<style scoped></style>
