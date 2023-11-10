<script setup>
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <TheHeadingNavbar />
    <RouterView />
    <Footer />
</template>



<style scoped></style>
