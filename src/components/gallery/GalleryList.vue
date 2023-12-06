<script setup>
import { ref, onMounted } from 'vue'
import { listGallery, keySearch } from '@/api/gallery'
import PageNavigation from '@/components/common/PageNavigation.vue'

const param = ref({
  numOfRows: 30,
  pageNo: 1,
  arrange: 'A',
  keyword: ''
})

const onPageChange = (val) => {
  if (currentPage.value !== val) {
    currentPage.value = val
    param.value.pageNo = val

    if (val >= 1 && val <= totalPage.value) {
      getGalleryList()
    }
  }
}

const currentPage = ref(0)
const totalPage = ref(0)

const photos = ref()
const showModal = ref(false)
const selectedImage = ref('')

const getSearchGallery = () => {
  param.value.numOfRows = 30
  param.value.pageNo = 1
  param.value.arrange = 'A'
  keySearch(
    param.value,
    (response) => {
      console.log(response)
      photos.value = response.data.response.body.items.item
      currentPage.value = response.data.response.body.pageNo
      totalPage.value = Math.ceil(
        response.data.response.body.totalCount / parseInt(param.value.numOfRows)
      )
    },
    (err) => {
      console.log(err)
    }
  )
}

const getGalleryList = () => {
  listGallery(
    param.value,
    (response) => {
      console.log(response.data.response.body.items.item)
      console.log(response.data.response.body.totalCount)
      console.log(response)
      photos.value = response.data.response.body.items.item
      currentPage.value = response.data.response.body.pageNo
      totalPage.value = Math.ceil(
        response.data.response.body.totalCount / parseInt(param.value.numOfRows)
      )
    },
    (err) => {
      console.log(err)
    }
  )
}

onMounted(() => {
  getGalleryList()
})

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div class="flex w-full justify-center">
      <PageNavigation
        :currentPage="currentPage"
        :total-page="totalPage"
        @page-change="onPageChange"
      ></PageNavigation>
      <input
        type="text"
        v-model="param.keyword"
        @keyup.enter="getSearchGallery"
        class="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="여기에 내용 입력"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
        @click="getSearchGallery"
      >
        <svg
          class="h-5 w-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-5.2-5.2"
          ></path>
          <circle cx="10" cy="10" r="8"></circle>
        </svg>
        검색
      </button>
    </div>
    <div class="flex flex-col w-2/3">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="photo in photos" :key="photo.galContentId" class="rounded">
          <h4>{{ photo.galTitle }}</h4>
          <p>{{ photo.galPhotographyLocation }}</p>
          <img
            :src="photo.galWebImageUrl"
            alt="galTitle"
            @click="openModal(photo.galWebImageUrl)"
          />
          <p>{{ photo.galSearchKeyword }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Component -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
    @click="closeModal"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <div class="absolute inset-0 bg-black opacity-75"></div>
    <div class="absolute bg-white p-4 z-60">
      <img :src="selectedImage" alt="Modal Image" />
    </div>
  </div>
</template>

<style scoped></style>
