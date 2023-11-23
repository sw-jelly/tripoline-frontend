<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
const { VITE_CHATBOT_PLUGIN_KEY } = import.meta.env

const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)

;(function () {
  var w = window
  if (w.ChannelIO) {
    return w.console.error('ChannelIO script included twice.')
  }
  var ch = function () {
    ch.c(arguments)
  }
  ch.q = []
  ch.c = function (args) {
    ch.q.push(args)
  }
  w.ChannelIO = ch
  function l() {
    if (w.ChannelIOInitialized) {
      return
    }
    w.ChannelIOInitialized = true
    var s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'
    var x = document.getElementsByTagName('script')[0]
    if (x.parentNode) {
      x.parentNode.insertBefore(s, x)
    }
  }
  if (document.readyState === 'complete') {
    l()
  } else {
    w.addEventListener('DOMContentLoaded', l)
    w.addEventListener('load', l)
  }
})()

ChannelIO('boot', {
  pluginKey: VITE_CHATBOT_PLUGIN_KEY
})

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
