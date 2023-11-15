<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun, searchByLocation } from '@/api/attraction'

import KakaoMap from '@/components/attraction/KakaoMap.vue'
import VSelect from '@/components/common/VSelect.vue'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])
const attractionList = ref([])

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0
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

const getAttrations = () => {
  console.log('선택된 친구들은...', param.value)
  searchByLocation(
    param.value,
    ({ data }) => {
      console.log('data', data.attractions)
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
    <div class="col-md-8 d-flex mt-3">
      <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
      <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      <VSelect :selectOption="contentList" @onKeySelect="onChangeContentType" />
      <button class="btn btn-success" @click="getAttrations">검색</button>
    </div>
    <KakaoMap :attractions="attractionList" />
  </div>
</template>

<style></style>
