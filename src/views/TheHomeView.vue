<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, reactive } from 'vue'

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
</script>

<template>
  <div>
    <carousel :items-to-show="1" :autoplay="10000" :wrap-around="true">
      <slide v-for="video in videoURL" :key="video.src">
        <video
          style="width: 100%; height: 100%; object-fit: cover"
          autoplay
          muted
          loop
          data-aos="fade-in"
          :src="video.src"
          type="video/mp4"
        ></video>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>
