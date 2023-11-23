<script setup>
import { ref, onMounted } from 'vue'
import { getHotPlaces, getLikeCount } from '@/api/hotplace'
import { getFavoriteCount } from '@/api/favorite'
const photos = ref()
const showModal = ref(false)
const selectedImage = ref('')

const getHotPlaceList = async () => {
  await getHotPlaces(
    (response) => {
      photos.value = response.data.hotplace
    },
    (err) => {
      console.log(err)
    }
  )
}

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  console.log('hotplace 호출')
  getHotPlaceList()
})
</script>

<template>
  <div>
    <div class="flex flex-col flex-1 items-center">
      <div class="flex flex-col w-2/3">
        <div class="grid grid-cols-4 gap-4">
          <div v-for="photo in photos" :key="photo.contentId" class="rounded" @click="moveDetail">
            <h4>{{ photo.title }}</h4>
            <p>{{ photo.addr1 }}</p>
            <img :src="photo.firstImage" alt="galTitle" @click="openModal(photo.firstImage)" />
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
  </div>
</template>

<style scoped></style>
