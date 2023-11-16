<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)

// 사용자 로그인 정보 있는지 여부 확인
const user = ref(true)
</script>

<template>
  <div id="app">
    <TheHeadingNavbar v-if="isLogin" />
    <RouterView />
    <Footer v-if="isLogin" />
  </div>
</template>

<style scoped></style>
