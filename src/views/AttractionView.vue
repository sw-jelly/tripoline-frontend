<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun, searchByLocation, searchByTitle } from '@/api/attraction'

import KakaoMap from '@/components/common/KakaoMap.vue'
import VSelect from '@/components/common/VSelect.vue'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])
const attractionList = ref([])

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  keyword: ''
})

onMounted(() => {
  getSidoList(), getContentList()
})

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

const getAttrationsByLocation = () => {
  console.log('선택된 친구들은...', param.value)
  if (param.value.sidoCode === 0) {
    alert('시/도는 필수 선택 사항입니다!')
    return
  }
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
}

const getAttrationsByTitle = () => {
  console.log('선택된 친구들은...', param.value)
  if (param.value.keyword === '') {
    alert('검색어를 입력하세요!')
    return
  }
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
</script>

<template>
  <div class="col-md-12 d-flex" style="flex-direction: column; align-items: center">
    <div
      class="col-md-12 d-flex"
      style="flex-direction: column; align-items: center"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
    >
      <div class="d-flex items-center">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Compass.png"
          alt="Compass"
          width="50"
          height="50"
          class="mb-1"
        />
        <h1>&nbsp;관광지 검색</h1>
      </div>
      <div class="col-md-8 d-flex mt-3">
        <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
        <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
        <VSelect :selectOption="contentList" @onKeySelect="onChangeContentType" />
        <button class="btn btn-success" @click="getAttrationsByLocation">검색</button>
      </div>
      <div class="input-group d-flex justify-content-center mt-3">
        <div class="form-outline col-md-3">
          <input
            v-model="param.keyword"
            class="form-control"
            type="search"
            label="Select"
            variant="underlined"
            placeholder="검색어를 입력하세요"
          />
        </div>
        <button class="btn btn-success" @click="getAttrationsByTitle">검색</button>
      </div>
    </div>
    <KakaoMap :attractions="attractionList" :isPlan="false" />
  </div>
</template>

<style></style>
