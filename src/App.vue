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



<style scoped>

.main {
    position: absolute;
    padding : 0px;
    margin : 0px;
    width : 100vw;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
}
</style>
