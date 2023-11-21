<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun, searchByLocation, searchByTitle } from '@/api/attraction'
import SelectItem from './item/SelectItem.vue'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])

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
  <SelectItem :selectOption="sidoList" @onKeySelect="onChangeSido" />
  <SelectItem :selectOption="gugunList" @onKeySelect="onChangeGugun" />
  <SelectItem :selectOption="contentList" @onKeySelect="onChangeContentType" />
</template>

<style></style>
