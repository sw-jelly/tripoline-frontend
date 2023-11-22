<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, getPlanDetailsByPlanId, deletePlan } from '@/api/plan.js'
import KakaoPlanMap from '@/components/common/KakaoPlanMap.vue'
import PlanDetailItem from '@/components/plan/item/PlanDetailItem.vue'

const route = useRoute()
const router = useRouter()
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

const planId = route.params.planId
const plan = ref({})
const planDetailList = ref([]) // 전체 계획 상세 리스트
const planDetailGroup = ref([]) // 날짜 별 계획 상세 리스트
const planDetails = ref([]) // 탭에 표시되는 (해당 날짜의) 계획 상세 리스트
const dateList = ref([])
const index = ref(-1) // 몇 번째 탭인지
const canDraw = ref(false)
const key = ref('tab1')
const noTitleKey = ref('app')

const getPlanInfo = async () => {
  await getPlan(
    planId,
    ({ data }) => {
      console.log('성공적으로 계획 얻어오기 완료', data)
      plan.value = data
      getPlanDetails()
    },
    (error) => {
      console.log('계획 얻어오기 실패', error)
    }
  )
}

const getPlanDetails = async () => {
  await getPlanDetailsByPlanId(
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

onMounted(async () => {
  await getPlanInfo()
})

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
    planDetails.value = []
  }
  console.log('planDetailGroup', planDetailGroup.value)
  console.log(dateList.value)

  // setting()
}

// watch(mapLoaded.value, (newVal) => {
//   console.log('mapLoaded', newVal)
//   if (newVal) {
//     setting()
//   }
// })

// const settingLoaded = () => {
//   mapLoaded.value = true
// }

// const setting = () => {
//   if (mapLoaded.value) onTabChange(dateList.value[0].key, 'key')
// }

const onTabChange = (value, type) => {
  console.log(value, type)

  if (type === 'key') {
    key.value = value
    index.value = dateList.value.findIndex((date) => date.key === value)
    planDetails.value = planDetailGroup.value[index.value]
    canDraw.value = true
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

const removePlan = () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    deletePlan(
      planId,
      () => {
        console.log('성공적으로 계획 삭제 완료')
        router.push({
          name: 'plan-list'
        })
      },
      (error) => {
        console.log('계획 삭제 실패', error)
      }
    )
  }
}

const goToTripReviewPage = () => {
  console.log('후기쓰러가자!')
  router.push({
    name: 'board-write'
  })
}
</script>

<template>
  <div style="height: 100%; overflow: hidden">
    <div class="demo-page-header" style="background-color: #f5f5f5; padding: 24px">
      <a-page-header
        :title="plan.planTitle"
        :sub-title="plan.sidoName + ' ' + plan.gugunName"
        @back="() => $router.push({ name: 'plan-list' })"
      >
        <template #extra>
          <div v-if="userInfo.memberId == plan.memberId">
            <a-button key="2" @click="goToRegistDetailPage">수정</a-button>
            <a-button danger @click="removePlan">삭제</a-button>
          </div>
        </template>
        <div
          v-if="userInfo.memberId == plan.memberId"
          style="display: flex; justify-content: space-between"
        >
          <p style="margin-bottom: 0%">{{ plan.startDate }} - {{ plan.endDate }}</p>
          <div
            v-if="new Date() > new Date(plan.endDate)"
            style="display: flex; align-items: center; justify-items: center"
          >
            <p style="margin: 0">종료된 여행이에요. &nbsp</p>
            <a-button @click="goToTripReviewPage">후기 쓰러 가기</a-button>
          </div>
          <div v-if="new Date() < new Date(plan.startDate)">
            <p style="margin: 0">
              D-{{ Math.ceil((new Date(plan.startDate) - new Date()) / (1000 * 60 * 60 * 24)) }}
            </p>
          </div>
          <div
            v-if="new Date() >= new Date(plan.startDate) && new Date() <= new Date(plan.endDate)"
          >
            <p style="margin: 0">즐거운 여행 되세요!</p>
          </div>
        </div>
      </a-page-header>
    </div>
    <div class="d-flex" style="width: 100%">
      <KakaoPlanMap
        :selected-attraction="{}"
        :plan="plan"
        :isEdit="false"
        :plan-details="planDetails"
        :can-draw="canDraw"
      />
      <a-card
        style="width: 30%; height: 84vh; overflow-y: scroll"
        title="일별 계획"
        :tab-list="dateList"
        :active-tab-key="key"
        @tabChange="(key) => onTabChange(key, 'key')"
      >
        <PlanDetailItem :plan-details="planDetails" :readonly="true" :index="index" />
      </a-card>
    </div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 84vh;
}

.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}

/* .ant-page-header-heading-sub-title {
  font-size: 50px;
} */
</style>
