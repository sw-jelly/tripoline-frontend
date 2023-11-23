<script setup>
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, reactive, onMounted, watch, computed } from 'vue'
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

const metaContents = ref([
  {
    src: new URL('@/assets/metaverse/onekill.jpg', import.meta.url).href,
    href: 'https://www.dgyangnyeongsi.com/main'
  },
  {
    src: new URL('@/assets/metaverse/light.jpg', import.meta.url).href,
    href: 'https://www.phff.kr/main'
  },
  {
    src: new URL('@/assets/metaverse/lee.jpg', import.meta.url).href,
    href: 'https://www.hansanfmeta.org/main'
  }
])

const options = ref({
  strings: ['여행이 함께 하는 곳', 'Tripoline'],
  typeSpeed: 100,
  delaySpeed: 150,
  loop: true,
  showCursor: false
})

//12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점
const festivalList = ref([])
const attractionList = ref([])
const cultureList = ref([])
const totalCount = ref(0)

const getAttractions = () => {
  const index = Math.random() * 94
  console.log(parseInt(index))
  searchAttraction(
    12,
    parseInt(index),
    (response) => {
      console.log(response.data)
      attractionList.value = response.data.response.body.items.item
      totalCount.value = response.data.response.body.totalCount
    },
    (error) => {
      console.log(error)
    }
  )
}

let typed // Declare typed variable

const filteredAttractionList = computed(() => {
  return attractionList.value.filter((attraction) => attraction.firstimage !== '')
})

onMounted(() => {
  typed = new Typed('#typed-text', options.value)
  getAttractions()
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
      <div class="absolute z-10">
        <h1 id="typed-text" class="text-white mt-[450px] ml-[150px] text-6xl"></h1>
      </div>
    </div>

    <!-- display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0
  var(--site-padding-horizon); background: #fff; box-shadow: 0 10px 10px #45454533; -->

    <div class="flex flex-col justify-center h-[150px] mt-[20px]">
      <section class="flex flex-1 bg-green-200 rounded-full">
        <div class="flex flex-col justify-center flex-1">
          <div class="flex flex-1 justify-center mt-[10px]">
            <h2>
              <span><span>여행을 떠나기 전이라면 </span><strong>CheckList!</strong></span>
            </h2>
          </div>
          <div class="flex flex-1">
            <ul class="flex flex-1 items-center text-center justify-around">
              <li>
                <RouterLink class="no-underline text-black" :to="{ name: 'weather' }">
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20with%20Face.png"
                    alt="Sun with Face"
                    width="75"
                    height="75"
                  />
                  <span class="text-black">날씨 확인</span></RouterLink
                >
              </li>
              <li>
                <RouterLink class="no-underline text-black" :to="{ name: 'estations' }">
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Voltage.png"
                    alt="High Voltage"
                    width="75"
                    height="75"
                  />

                  <span>전기차 충전소</span></RouterLink
                >
              </li>
              <li>
                <RouterLink class="no-underline text-black" :to="{ name: 'gallery' }">
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png"
                    alt="Camera with Flash"
                    width="75"
                    height="75"
                  />
                  <span>갤러리 구경</span></RouterLink
                >
              </li>
              <li>
                <RouterLink class="no-underline text-black" :to="{ name: 'hotplace' }">
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png"
                    alt="Star"
                    width="75"
                    height="75"
                  />
                  <span>핫플 구경가기</span></RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="flex flex-col justify-center mt-[20px]">
      <h2 class="text-center">전국 방방곡곡의 유명한 관광지를 보여드릴게요</h2>
      <div class="flex flex-col justify-center items-center text-center" v-if="totalCount">
        Tripoline에는 {{ totalCount }}개의 관광지 정보가 있어요 <br />더 새로운 장소를 보고 싶다면?

        <div class="flex gap-[10px]">
          <img
            class="align-self"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Right%20Light%20Skin%20Tone.png"
            alt="Backhand Index Pointing Right Light Skin Tone"
            width="45"
            height="35"
          />
          <button class="btn btn-primary" @click="getAttractions">새로운장소 추천받기</button>
        </div>
      </div>
      <div class="flex justify-center" v-else>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <Carousel :itemsToShow="3.9" :autoplay="1000" :wrapAround="true" :transition="500">
        <Slide
          v-for="attraction in filteredAttractionList"
          :key="attraction.contentid"
          class="w-[400px] h-[600px] mx-[10px]"
        >
          <div class="card m-[10px]">
            <div class="top">
              <div class="userDetails">
                <b class="ml-[10px]">{{ attraction.title }}</b>
              </div>
              <div>
                <!-- Settings Dot -->
                <div class="settings"></div>
              </div>
            </div>
            <div class="imgBox">
              <!-- Main Image -->
              <img :src="attraction.firstimage" class="cover" />
            </div>
            <!-- Buttons -->
            <div class="buttons gap-[10px] mx-[10px]">
              <!-- Like Button -->
              <img class="icon" src="https://zupimages.net/up/22/29/d1bd.png" />

              <!-- Comment Button -->
              <img class="icon" src="https://zupimages.net/up/22/29/h5ft.png" />

              <!-- Share Button -->
              <img class="icon" src="https://zupimages.net/up/22/29/9y56.png" />
            </div>

            <!-- Description -->
            <h4 class="message">{{ attraction.addr1 }}</h4>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>
    <!-- <a :href="meta.href"> </a> -->
    <div class="flex flex-col justify-center mt-[20px]">
      <div class="flex justify-center items-center bg-white">
        <h1 class="text-center">
          홈캉스라고 들어봤나? <span class="text-red">메타버스</span>로 떠나는 트리폴린!
        </h1>
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Fairy%20Medium-Light%20Skin%20Tone.png"
          alt="Woman Fairy Medium-Light Skin Tone"
          width="100"
          height="100"
        />
      </div>

      <carousel :items-to-show="3" :wrap-around="true">
        <Slide v-for="meta in metaContents" :key="meta.href">
          <div class="flex items-center h-[300px]">
            <a :href="meta.href" class="cursor-pointer">
              <img :src="meta.src" class="fill" alt="사진어디감?"
            /></a>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </carousel>
    </div>
    <!-- <div class="flex flex-col justify-center mt-[20px]">
      <h1 class="text-center">메타버스 여행</h1>
      <Carousel :itemsToShow="3.95" :autoplay="1000" :wrapAround="true" :transition="500">
        <Slide
          v-for="attraction in filteredAttractionList"
          :key="attraction.contentid"
          class="w-[400px] h-[600px] mx-[10px]"
        >
          <div class="card m-[10px]">
            <div class="top">
              <div class="userDetails">
                <b>{{ attraction.title }}</b>
              </div>
              <div>
                <div class="settings"></div>
              </div>
            </div>
            <div class="imgBox">
              <img :src="attraction.firstimage" class="cover" />
            </div>
            <div class="buttons gap-[10px]">
              <img class="icon" src="https://zupimages.net/up/22/29/d1bd.png" />

              <img class="icon" src="https://zupimages.net/up/22/29/h5ft.png" />

              <img class="icon" src="https://zupimages.net/up/22/29/9y56.png" />
            </div>

            <h4 class="message">주소 : {{ attraction.addr1 }}</h4>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div> -->
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
.card {
  margin: 10px;
}
.card .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card .top .userDetails {
  display: flex;
  align-items: center;
}

.card .top .userDetails .profile_img {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .top .userDetails h3 {
  font-size: 16px;
  color: #4d4d4d;
  font-weight: 500;
  line-height: 1em;
}

.card .top .userDetails h3 span {
  font-size: 0.7em;
}

.imgBox {
  position: relative;
  width: 100%;
  height: 320px;
  margin: 10px 0 15px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 230px;
}

.buttons img {
  max-width: 24px;
  max-height: 24px;
  cursor: pointer;
}

.buttons .left img {
  margin-right: 8px;
}

.likes {
  font-weight: 500;
  margin-top: 5px;
  font-size: 16px;
  color: #4d4d4d;
}

.message {
  font-weight: 500;
  margin-top: 10px;
  font-size: 16px;
  color: #4d4d4d;
}

.message b {
  color: #262626;
}

.settings:after {
  content: '\2807';
  font-size: 25px;
  color: #4d4d4d;
  cursor: pointer;
}

.icon:hover {
  opacity: 0.7;
}
</style>
