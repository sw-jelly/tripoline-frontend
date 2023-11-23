<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun, searchByLocation, searchByTitle } from '@/api/attraction'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { registFavorite, deleteFavorite, getFavoriteListByMemberId } from '@/api/favorite.js'
import VSelect from '@/components/common/VSelect.vue'

const emit = defineEmits(['addPlanDetail'])
const props = defineProps({ selectedAttraction: Object })
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

const sidoSelect = '시/도를 선택하세요'
const gugunSelect = '구/군을 선택하세요'
const contentSelect = '관광지 유형'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])
const attractionList = ref([])
const favoriteList = ref([])
const selectedAttraction = props.selectedAttraction

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  keyword: ''
})

const params = ref({
  contentId: 0,
  memberId: 0
})

const planDetail = ref({
  contentId: 0,
  planDetailId: -1,
  visitOrder: 0,
  title: null,
  addr1: null,
  tel: null,
  visitDate: null,
  memo: null,
  latitude: null,
  longitude: null
})

onMounted(() => {
  getSidoList(), getContentList()
  getFavoriteList()
})

/**
 * 관광지 검색 관련
 */

const getSidoList = () => {
  searchSido(
    ({ data }) => {
      let options = []
      options.push({ text: '시/도 선택', value: 'all' })
      data.sidos.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode })
      })
      sidoList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const getContentList = () => {
  let options = [
    { text: '관광지 유형 선택', value: 'all' },
    { text: '전체', value: 0 },
    { text: '관광지', value: 12 },
    { text: '문화시설', value: 14 },
    { text: '축제공연행사', value: 15 },
    { text: '여행코스', value: 25 },
    { text: '레포츠', value: 28 },
    { text: '숙박', value: 32 },
    { text: '쇼핑', value: 38 },
    { text: '음식점', value: 39 }
  ]
  contentList.value = options
}

const onChangeSido = (val) => {
  param.value.sidoCode = val
  searchGugun(
    { sidoCode: val },
    ({ data }) => {
      let options = []
      options.push({ text: '구/군 선택', value: 'all' })
      data.guguns.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode })
      })
      gugunList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const onChangeGugun = (val) => {
  param.value.gugunCode = val
}

const onChangeContentType = (val) => {
  param.value.contentTypeId = val
}

const getAttrations = () => {
  console.log('선택된 친구들은...', param.value)
  if (param.value.sidoCode === 0) {
    alert('시/도는 필수 선택 사항입니다!')
    return
  }
  if (param.value.keyword === '') {
    searchByLocation(
      param.value,
      ({ data }) => {
        console.log('searchByLocation data', data.attractions)
        if (!data) {
          alert('검색 결과가 없습니다!')
          return
        }
        attractionList.value = data.attractions
      },
      (err) => {
        console.log(err)
      }
    )
  } else {
    searchByTitle(
      param.value,
      ({ data }) => {
        console.log('searchByTitle data', data.attractions)
        if (!data) {
          alert('검색 결과가 없습니다!')
          return
        }
        attractionList.value = data.attractions
      },
      (err) => {
        console.log(err)
      }
    )
  }
}

const viewAttraction = (attraction) => {
  selectedAttraction.value = attraction
}

const addPlanDetail = (attraction) => {
  selectedAttraction.value = attraction
  planDetail.value.contentId = selectedAttraction.value.contentId
  planDetail.value.title = selectedAttraction.value.title
  planDetail.value.addr1 = selectedAttraction.value.addr1
  planDetail.value.tel = selectedAttraction.value.tel
  planDetail.value.latitude = selectedAttraction.value.latitude
  planDetail.value.longitude = selectedAttraction.value.longitude
  emit('addPlanDetail', planDetail.value)
}

/**
 * 즐겨찾기 관련
 */
const getFavoriteList = () => {
  getFavoriteListByMemberId(
    userInfo.value.memberId,
    ({ data }) => {
      favoriteList.value = data
    },
    (error) => {
      console.log(error)
    }
  )
}

const isFavorite = (contentId) => {
  const favoriteItem = favoriteList.value.find((item) => item.contentId === contentId)

  return {
    liked: !!favoriteItem,
    favoriteId: favoriteItem ? favoriteItem.favoriteId : null
  }
}

const heartit = (attraction) => {
  const { liked, favoriteId } = isFavorite(attraction.contentId)

  if (!liked) {
    // 좋아요 추가
    params.value.contentId = attraction.contentId
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
</script>

<template>
  <div style="display: flex; align-items: center">
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Compass.png"
      alt="Compass"
      width="50"
      height="50"
    />
    <h4 style="color: black">관광지 탐색</h4>
  </div>
  <div class="flex flex-col">
    <VSelect :selectOption="sidoList" :description="sidoSelect" @onKeySelect="onChangeSido" />
    <VSelect :selectOption="gugunList" :description="gugunSelect" @onKeySelect="onChangeGugun" />
    <VSelect
      :selectOption="contentList"
      :description="contentSelect"
      @onKeySelect="onChangeContentType"
    />
    <div>
      <a-input-search
        v-model:value="param.keyword"
        placeholder="키워드도 함께 입력해보세요!"
        enter-button="찾기"
        size="large"
        @search="getAttrations"
      />
    </div>
  </div>
  <table class="table table-hover">
    <tbody>
      <tr
        class="text-center"
        v-for="attraction in attractionList"
        :key="attraction.contentid"
        @click="viewAttraction(attraction)"
      >
        <th>{{ attraction.title }}</th>
        <td>
          {{ attraction.addr1 }}
          <br />
          <a-button danger @click.stop="addPlanDetail(attraction)" style="margin-right: 5px"
            >계획에 추가</a-button
          >
          <button
            class="heart-btn"
            :class="{ liked: isFavorite(attraction.contentId).liked }"
            @click.stop="heartit(attraction)"
          >
            <svg class="heart heart-icon" viewBox="0 0 32 29.6">
              <path
                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.form-select {
  width: 100%;
  font-size: 16px;
}

:focus {
  outline: #08f auto 2px;
}

.heart {
  width: 12px;
  height: 12px;
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
