<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun, searchByLocation, searchByTitle } from '@/api/attraction'
import SelectItem from '@/components/common/SelectItem.vue'
const props = defineProps({ selectedAttraction: Object })
const emit = defineEmits(['addPlanDetail'])

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])
const attractionList = ref([])
const selectedAttraction = props.selectedAttraction

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  keyword: ''
})

onMounted(() => {
  getSidoList(), getContentList()
})

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

const viewAttraction = (attraction) => {
  selectedAttraction.value = attraction
}

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

const addPlanDetail = () => {
  planDetail.value.contentId = selectedAttraction.value.contentId
  planDetail.value.title = selectedAttraction.value.title
  planDetail.value.addr1 = selectedAttraction.value.addr1
  planDetail.value.tel = selectedAttraction.value.tel
  planDetail.value.latitude = selectedAttraction.value.latitude
  planDetail.value.longitude = selectedAttraction.value.longitude
  emit('addPlanDetail', planDetail.value)
}
</script>

<template>
  <SelectItem :selectOption="sidoList" @onKeySelect="onChangeSido" />
  <SelectItem :selectOption="gugunList" @onKeySelect="onChangeGugun" />
  <SelectItem :selectOption="contentList" @onKeySelect="onChangeContentType" />
  <button class="btn btn-success" @click="getAttrationsByLocation">검색</button>
  <div class="input-group d-flex justify-content-center mt-3">
    <div class="form-outline col-md-3">
      <input
        v-model="param.keyword"
        type="search"
        label="Select"
        variant="underlined"
        placeholder="검색어를 입력하세요"
      />
    </div>
    <button class="btn btn-success" @click="getAttrationsByTitle">검색</button>
  </div>
  <table class="table table-hover">
    <thead>
      <tr class="text-center">
        <th scope="col">이름</th>
        <th scope="col">주소</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-center"
        v-for="attraction in attractionList"
        :key="attraction.contentid"
        @click="viewAttraction(attraction)"
      >
        <th>{{ attraction.title }}</th>
        <td>
          {{ attraction.addr1 }}<br /><a-button danger @click="addPlanDetail">계획에 추가</a-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
