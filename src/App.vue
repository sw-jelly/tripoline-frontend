<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'

const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)
onMounted(() => {
  console.log('App.vue에서 로그인 여부 : ' + isLogin.value)
})
</script>

<template>
  <TheHeadingNavbar v-if="isLogin" />
  <RouterView />
  <Footer v-if="isLogin" />
</template>

<style>
@font-face {
  font-family: 'pretendard';
  font-weight: bold;
  src: url('@/fonts/pretendard/Pretendard-Regular.otf') format('otf');
}

.v-application {
  font-family: 'pretendard', sans-serif !important;
}
</style>
