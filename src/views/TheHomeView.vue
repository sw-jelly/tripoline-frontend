<script setup>
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, reactive, onMounted } from 'vue'
import Typed from 'typed.js'
import { searchAttraction } from '@/api/attraction'

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

//12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점
const festivalList = ref([])
const attractionList = ref([])
const cultureList = ref([])

let typed // Declare typed variable

onMounted(async () => {
  typed = new Typed('#typed-text', options.value)
  console.log(
    await searchAttraction(
      12,
      (response) => {
        // response.data.response.body.items 중 사진이 있는것만 포함시킨다
        attractionList.value = response.data.response.body.items.item
        console.log(attractionList.value)
      },
      () => {
        console.log('fail')
      }
    )
  )
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

    <div class="flex h-screen flex-col bg-yellow-300">
      <section class="flex bg-white rounded-full">
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
      <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
        <h1>인기 관광지</h1>
        <Slide v-for="attraction in attractionList" :key="attraction.contentid" class="bg-white">
          <div class="carousel__item h-[500px] w-500px">
            <img :src="attraction.firstimage" />
            <h1>관광지명 : {{ attraction.title }}</h1>
            <h1>주소 : {{ attraction.addr1 }}</h1>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div class="flex flex-col h-screen">간지나는거 추가</div>
    <div class="flex flex-col h-screen">간지나는거 추가</div>
  </div>
</template>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
