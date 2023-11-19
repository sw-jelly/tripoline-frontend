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
  <div id="app" class="flex flex-col flex-1">
    <TheHeadingNavbar v-if="isLogin" />
    <RouterView />
    <Footer v-if="isLogin" />
  </div>
</template>

<style scoped></style>
