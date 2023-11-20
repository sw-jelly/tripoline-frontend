<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, getPlanDetailsByPlanId, savePlanDetail } from '@/api/plan.js'
import { searchSido, searchGugun, searchByLocation, searchByTitle } from '@/api/attraction'
import KakaoMap from '@/components/common/KakaoMap.vue'
import VSelect from '@/components/common/VSelect.vue'
import PlanDetailItem from './item/PlanDetailItem.vue'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const contentList = ref([])

const route = useRoute()
const router = useRouter()

const planId = route.params.planId
const plan = ref({})
const planDetailList = ref([]) // 전체 계획 상세 리스트
const planDetailGroup = ref([]) // 날짜 별 계획 상세 리스트
const planDetails = ref([]) // 탭에 표시되는 (해당 날짜의) 계획 상세 리스트
const index = ref(-1) // 몇 번째 탭인지
const dateList = ref([])
const attractionList = ref([])
const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  keyword: ''
})

onMounted(() => {
  getPlanInfo(), getPlanDetails()
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
        options.push({
          text: sido.sidoName,
          value: sido.sidoCode
        })
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
        options.push({
          text: gugun.gugunName,
          value: gugun.gugunCode
        })
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
    (error) => {
      console.log(error)
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
    (error) => {
      console.log(error)
    }
  )
}

const getPlanInfo = () => {
  getPlan(
    planId,
    ({ data }) => {
      console.log('성공적으로 계획 얻어오기 완료', data)
      plan.value = data
    },
    (error) => {
      console.log('계획 얻어오기 실패', error)
    }
  )
}

const getPlanDetails = () => {
  getPlanDetailsByPlanId(
    planId,
    ({ data }) => {
      console.log('성공적으로 계획 상세 얻어오기 완료', data)
      planDetailList.value = data
      generateDateList(plan.value.startDate, plan.value.endDate)
    },
    (error) => {
      console.log('계획 상세 얻어오기 실패', error)
    }
  )
}

const generateDateList = (startDate, endDate) => {
  let currentDate = new Date(startDate)

  planDetailGroup.value = []
  dateList.value = []
  while (currentDate <= new Date(endDate)) {
    let date = currentDate.toISOString().split('T')[0]
    let month = currentDate.getMonth() + 1 // 월은 0부터 시작하므로 +1
    let day = currentDate.getDate()
    let dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]
    let plansForDate =
      planDetailList.value.length > 0
        ? planDetailList.value.filter((planDetail) => planDetail.visitDate == date)
        : []
    planDetailGroup.value.push(plansForDate)
    dateList.value.push({
      key: date,
      tab: `${month}.${day}(${dayOfWeek})`
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (index.value != -1) {
    planDetails.value = planDetailGroup.value[index.value]
  } else {
    index.value = 0
    planDetails.value = planDetailGroup.value[0]
  }
  console.log('planDetailGroup', planDetailGroup.value)
  console.log(dateList.value)
}

const key = ref('tab1')
const noTitleKey = ref('app')
const onTabChange = (value, type) => {
  console.log(value, type)

  if (type === 'key') {
    key.value = value
    index.value = dateList.value.findIndex((date) => date.key === value)
    planDetails.value = planDetailGroup.value[index.value]
  } else if (type === 'noTitleKey') {
    noTitleKey.value = value
  }
}

const updatePlanDetails = (newPlanDetails) => {
  planDetailGroup.value[index.value] = newPlanDetails
  planDetailGroup.value[index.value].forEach((planDetail) => {
    savePlanDetail(
      planDetail,
      () => {
        console.log('성공적으로 계획 상세 등록 완료', planDetail)
      },
      (error) => {
        console.log('계획 상세 등록 실패', error)
        return
      }
    )
  })
}

const addPlanDetail = (planDetail) => {
  planDetail.planId = plan.value.planId
  planDetail.visitDate = dateList.value[index.value].key
  planDetail.visitOrder = planDetailGroup.value[index.value].length + 1

  console.log('addPlanDetail', planDetail)
  savePlanDetail(
    planDetail,
    () => {
      console.log('성공적으로 계획 상세 등록 완료', planDetail)
      getPlanDetails()
    },
    (error) => {
      console.log('계획 상세 등록 실패', error)
    }
  )
}

const exitEditMode = () => {
  savePlan()
  router.push({ name: 'plan-list' })
}

const savePlan = () => {
  planDetailList.value.forEach((planDetail) => {
    savePlanDetail(
      planDetail,
      () => {
        console.log('성공적으로 계획 상세 등록 완료', planDetail)
      },
      (error) => {
        console.log('계획 상세 등록 실패', error)
        return
      }
    )
  })
}
</script>

<template>
  <div class="col-md-12 d-flex" style="flex-direction: column; align-items: center">
    <div class="col-md-8 d-flex mt-3">
      <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
      <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      <VSelect :selectOption="contentList" @onKeySelect="onChangeContentType" />
      <button class="btn btn-success" @click="getAttrationsByLocation">검색</button>
      <button class="btn btn-outline-primary" style="margin-left: auto" @click="exitEditMode">
        저장
      </button>
    </div>
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
    <div class="d-flex" style="width: 100%">
      <KakaoMap :attractions="attractionList" :isPlan="true" @addPlanDetail="addPlanDetail" />
      <a-card
        style="width: 30%; height: 100vh; overflow-y: scroll"
        title="일별 계획"
        :tab-list="dateList"
        :active-tab-key="key"
        @tabChange="(key) => onTabChange(key, 'key')"
      >
        <template #customTab="item">
          <span v-if="item.key === 'tab1'">{{ item.key }}</span>
        </template>
        <PlanDetailItem
          :plan-details="planDetails"
          @updatePlanDetails="updatePlanDetails"
          :readonly="false"
        />
      </a-card>
    </div>
  </div>
</template>

<style scoped></style>
