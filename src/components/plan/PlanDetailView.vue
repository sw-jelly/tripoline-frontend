<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, getPlanDetailsByPlanId } from '@/api/plan.js'
import KakaoMap from '@/components/common/KakaoMap.vue'
import PlanDetailItem from '@/components/plan/item/PlanDetailItem.vue'

const ghost = ref(false)

const route = useRoute()
const router = useRouter()

const planId = route.params.planId
const plan = ref({})
const planDetailList = ref([]) // 전체 계획 상세 리스트
const planDetailGroup = ref([]) // 날짜 별 계획 상세 리스트
const planDetails = ref([]) // 탭에 표시되는 (해당 날짜의) 계획 상세 리스트
const dateList = ref([])
const index = ref(-1) // 몇 번째 탭인지

onMounted(() => {
  getPlanInfo(), getPlanDetails()
})

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
      planDetailList.value = data ? data : []
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
    planDetails.value = planDetailGroup.value[index.value] ? planDetailGroup.value[index.value] : []
  } else {
    index.value = 0
    planDetails.value = planDetailGroup.value[0] ? planDetailGroup.value[0] : []
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

const goToRegistDetailPage = () => {
  router.push({
    name: 'plan-regist-detail',
    params: {
      planId: planId
    }
  })
}
</script>

<template>
  <div class="demo-page-header" style="background-color: #f5f5f5; padding: 24px">
    <a-page-header
      :ghost="ghost"
      :title="plan.planTitle"
      :sub-title="plan.startDate + ' ~ ' + plan.endDate"
      @back="() => $router.go(-1)"
    >
      <template #extra>
        <a-button key="2" @click="goToRegistDetailPage">수정</a-button>
        <a-button danger>삭제</a-button>
      </template>
    </a-page-header>
  </div>
  <div class="d-flex" style="width: 100%">
    <KakaoMap :attractions="[]" :isPlan="false"/>
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
        :readonly="true"
      />
    </a-card>
  </div>
</template>

<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>
