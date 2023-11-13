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
  <div class="vh-100 text-white rounded">
    <carousel :items-to-show="1" :autoplay="10000" :wrap-around="true">
      <slide v-for="video in videoURL" :key="video.src" style="width: 100vw; height: 100vh">
        <video
          style="width: 100vw; height: 100%; object-fit: cover"
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
    <!-- <video
      style="width: 100%; height: 100%; object-fit: cover"
      autoplay
      muted
      loop
      data-aos="fade-in"
      src="@/assets/video/cherry.mp4"
      type="video/mp4"
    ></video> -->
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <h2 data-aos="fade-up" data-aos-delay="100">
            <span id="Mainelement"></span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">지금 찾아보세요</p>
        </div>
      </div>
    </div>
  </div>
</template>
