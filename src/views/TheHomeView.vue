<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, reactive, onMounted } from 'vue'
import Typed from 'typed.js'

const videoURL = ref([
  {
    src: new URL('@/assets/video/cherry.mp4', import.meta.url).href
  },
  {
    src: new URL('@/assets/video/beach.mp4', import.meta.url).href
  },
  {
    src: new URL('@/assets/video/seoul.mp4', import.meta.url).href
  }
])

const options = ref({
  strings: ['여행이 함께 하는곳', 'Tripoline'],
  typeSpeed: 100,
  delaySpeed: 150,
  loop: true,
  showCursor: false
})

let typed // Declare typed variable

onMounted(() => {
  typed = new Typed('#typed-text', options.value)
})
</script>

<template>
  <div class="flex flex-col h-full w-full min-h-full">
    <carousel :items-to-show="1" :autoplay="10000" :wrap-around="true">
      <slide v-for="video in videoURL" :key="video.src" class="bg-stone-200">
        <video
          autoplay
          muted
          loop
          :src="video.src"
          type="video/mp4"
          class="h-screen w-screen object-fill mx-auto px-5 py-5 rounded-md"
        ></video>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
    <div class="absolute z-1 top-3/6 top-2/3 left-1/3">
      <h1 id="typed-text" class="text-white text-6xl"></h1>
    </div>
  </div>
</template>

<style></style>
