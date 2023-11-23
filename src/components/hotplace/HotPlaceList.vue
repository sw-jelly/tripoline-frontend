<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { getFavoriteListByMemberId, registFavorite, deleteFavorite } from '@/api/favorite'
import { getHotPlaces } from '@/api/attraction'
import { HeartOutlined } from '@ant-design/icons-vue'

const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
const favoriteList = ref([]) // 즐겨찾기 리스트

const hotplaces = ref([]) // 핫플레이스 리스트
const hotplace = ref({}) // 선택된 핫플레이스
const showModal = ref(false)

const liked = ref(false) // 즐겨찾기 여부
const params = ref({
  contentId: 0,
  memberId: 0
})

const getHotPlaceList = async () => {
  await getHotPlaces(
    (response) => {
      hotplaces.value = response.data.hotplace
    },
    (err) => {
      console.log(err)
    }
  )
}

const getFavoriteList = () => {
  getFavoriteListByMemberId(
    userInfo.value.memberId,
    ({ data }) => {
      favoriteList.value = data ? data : []
      console.log('즐겨찾기 리스트', favoriteList.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const openModal = (attraction) => {
  hotplace.value = attraction
  checkIfFavorite()
  showModal.value = true
}

const closeModal = () => {
  liked.value = false
  showModal.value = false
}

const checkIfFavorite = () => {
  const favoriteItem = favoriteList.value.find(
    (item) => item.contentId === hotplace.value.contentId
  )

  console.log('checkIfFavorite', favoriteItem != undefined)
  if (!!favoriteItem) liked.value = true
  return {
    liked: !!favoriteItem,
    favoriteId: favoriteItem ? favoriteItem.favoriteId : null
  }
}

const heartit = () => {
  const { liked, favoriteId } = checkIfFavorite(hotplace.value.contentId)

  if (!liked) {
    // 좋아요 추가
    params.value.contentId = hotplace.value.contentId
    params.value.memberId = userInfo.value.memberId
    registFavorite(
      params.value,
      ({ data }) => {
        console.log('성공적으로 즐겨찾기 등록 완료', data)
        getFavoriteList()
      },
      (error) => {
        console.log('즐겨찾기 등록 실패', error)
      }
    )
  } else {
    // 좋아요 삭제
    deleteFavorite(
      favoriteId,
      ({ data }) => {
        console.log('성공적으로 즐겨찾기 삭제 완료', data)
        getFavoriteList()
      },
      (error) => {
        console.log('즐겨찾기 삭제 실패', error)
      }
    )
  }
}

onMounted(() => {
  console.log('hotplace 호출')
  getHotPlaceList()
  getFavoriteList()
})
</script>

<template>
  <div>
    <div class="flex flex-col flex-1 items-center">
      <div class="flex flex-col w-2/3">
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="attraction in hotplaces"
            :key="attraction.contentId"
            class="rounded"
            @click="moveDetail"
          >
            <h4>{{ attraction.title }}</h4>
            <p>{{ attraction.addr1 }}</p>
            <img
              :src="attraction.firstImage"
              onerror="this.src='http://localhost:8080/tripoline/assets/img/noimage.jpg'"
              @click="openModal(attraction)"
            />
            <div><HeartOutlined />&nbsp;{{ attraction.likeCount }}</div>
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
        <img :src="hotplace.firstImage" alt="Modal Image" />
        <div class="like-area">
          <button :class="['heart-btn', { liked: liked }]" @click.stop="heartit">
            <svg class="heart heart-icon" viewBox="0 0 32 29.6">
              <path
                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
          </button>
          <div style="font-weight: lighter; font-size: 20px; z-index: 1">
            &nbsp;{{ hotplace.likeCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.like-area {
  display: flex;
  /* align-items: center;
  justify-items: center; */
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
  bottom: 10px;
  right: 10px;
}

:focus {
  outline: #08f auto 2px;
}

.heart {
  width: 15px;
  height: 15px;
  fill: gray;
  transition:
    fill 0.5s,
    transform 0.5s;
  pointer-events: none;
}

.heart-btn {
  position: relative;
  background: transparent;
  border-radius: 50%;
  background-color: white;
  padding: 10px 10px 8px 10px;
  box-shadow:
    0px 0px 10px 0px rgba(0, 0, 0, 0.25),
    0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border: 0;
}

.heart-btn.liked .heart {
  fill: #ee3529;
}

.heart-btn.liked .heart-icon {
  transform: scale(1.2);
}

.heart-btn.liked .heart-pop {
  animation-direction: normal;
}

.heart-btn:active {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.heart-pop {
  position: absolute;
  width: 10%;
  opacity: 0;
  left: 0;
  animation: pop 1s ease forwards reverse;
}

.heart-pop.one {
  left: 1%;
  transform: rotate(-10deg);
  animation-delay: 0.45s;
}

.heart-pop.two {
  left: 15%;
  transform: rotate(8deg);
  animation-delay: 0.25s;
}

.heart-pop.three {
  left: 30%;
  transform: rotate(-5deg);
  animation-delay: 0s;
}

.heart-pop.four {
  left: 50%;
  transform: rotate(-8deg);
  animation-delay: 0.3s;
}

.heart-pop.five {
  left: 60%;
  transform: rotate(-10deg);
  animation-delay: 0.9s;
}

.heart-pop.six {
  left: 70%;
  transform: rotate(-8deg);
  animation-delay: 0.2s;
}

.heart-pop.seven {
  left: 85%;
  transform: rotate(6deg);
  animation-delay: 0.35s;
}

.heart-pop.eight {
  left: 90%;
  transform: rotate(-4deg);
  animation-delay: 0.5s;
}

.heart-pop.nine {
  left: 95%;
  transform: rotate(8deg);
  animation-delay: 0.2s;
}

@keyframes pop {
  0% {
    left: calc(50% - 7px);
    top: 10px;
  }
  20% {
    opacity: 1;
  }
  80% {
    top: -20px;
  }
  100% {
    opacity: 0;
  }
}
</style>
