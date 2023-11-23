<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { registFavorite, deleteFavorite, getIsFavorite, getFavoriteCount } from '@/api/favorite.js'

// TODO : isPlan 필요없음 수정 요망 !!
const props = defineProps({ info: Object, isPlan: Boolean })
const emit = defineEmits(['addPlanDetail'])

const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

const params = ref({
  contentId: 0,
  memberId: 0
})

const favoriteId = ref(0)

watch(
  () => props.info,
  () => {
    countFavorites()
    checkIfFavorite()
  },
  { deep: true }
)

const checkIfFavorite = () => {
  getIsFavorite(
    props.info.contentId,
    userInfo.value.memberId,
    ({ data }) => {
      console.log('성공적으로 즐겨찾기 여부 얻어오기 완료', data)
      liked.value = data
    },
    (error) => {
      console.log('즐겨찾기 여부 얻어오기 실패', error)
    }
  )
}

const countFavorites = () => {
  getFavoriteCount(
    props.info.contentId,
    ({ data }) => {
      console.log('성공적으로 즐겨찾기 개수 얻어오기 완료', data)
      props.info.favoriteCount = data
    },
    (error) => {
      console.log('즐겨찾기 개수 얻어오기 실패', error)
    }
  )
}

const liked = ref(false)

const heartit = () => {
  if (!liked.value) {
    params.value.contentId = props.info.contentId
    params.value.memberId = userInfo.value.memberId
    // 좋아요
    registFavorite(
      params.value,
      ({ data }) => {
        console.log('성공적으로 즐겨찾기 등록 완료', data)
        favoriteId.value = data
        countFavorites()
      },
      (error) => {
        console.log('즐겨찾기 등록 실패', error)
      }
    )
  } else {
    // 좋아요 취소
    deleteFavorite(
      favoriteId.value,
      ({ data }) => {
        console.log('성공적으로 즐겨찾기 삭제 완료', data)
        countFavorites()
      },
      (error) => {
        console.log('즐겨찾기 삭제 실패', error)
      }
    )
  }
  liked.value = !liked.value
}
</script>

<template>
  <div class="modal fade" id="descriptionView">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="container">
          <div class="card">
            <img :src="props.info.firstImage" />
            <div class="card_details">
              <div class="name">
                {{ props.info.title }}&nbsp;
                <button :class="['heart-btn', { liked: liked }]" @click="heartit">
                  <svg class="heart heart-icon" viewBox="0 0 32 29.6">
                    <path
                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                    />
                  </svg>
                </button>
                <div style="font-weight: lighter; font-size: 20px">
                  &nbsp;{{ props.info.favoriteCount }}
                </div>
              </div>
              <p>{{ props.info.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

#descriptionModal .modal-dialog {
  width: fit-content;
  margin-top: 10%;
}

.card img {
  width: 100%;
  border-radius: 12px;
  /* height: 214px; */
  object-fit: cover;
}

.card {
  /* Change background color */
  background-color: white;
  /* Add border */
  border: 1px solid #bacdd8;
  /* Add space between the border and the content */
  padding: 8px;
  border-radius: 12px;
}

.tag {
  padding: 4px 8px;
  border: 1px solid #e5eaed;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #788697;
}

.name {
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
}

p {
  font-size: 14px;
  color: #7f8c9b;
  line-height: 150%;
}
</style>
