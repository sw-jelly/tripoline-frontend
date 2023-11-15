<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <TheHeadingNavbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
