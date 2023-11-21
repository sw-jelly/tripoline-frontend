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
  <div
    class="bg-stone-200"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <div class="flex flex-col flex-1">
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
    <!-- display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0
  var(--site-padding-horizon); background: #fff; box-shadow: 0 10px 10px #45454533; -->
    <section class="flex justify-evenly items-center bg-white rounded-full mx-[40px]">
      <div>
        <h2>
          <span><span>여행이 있는 주말</span><strong>여행 프로그램</strong></span>
        </h2>
        <ul>
          <li>
            <a href="/travelweekend/travel/kto.do"><span>특별 할인혜택</span></a>
          </li>
          <li>
            <a href="/travelweekend/travel/discount.do"><span>지역여행할인</span></a>
          </li>
          <li>
            <a href="/travelweekend/travel/event.do"><span>이벤트</span></a>
          </li>
          <li>
            <a href="/travelweekend/theme.do"><span>추천 테마여행 상품</span></a>
          </li>
        </ul>
      </div>
    </section>
    <div class="flex flex-col h-screen">간지나는거 추가</div>
    <div class="flex flex-col h-screen">간지나는거 추가</div>
    <div class="flex flex-col h-screen">간지나는거 추가</div>
  </div>
</template>

<style></style>
