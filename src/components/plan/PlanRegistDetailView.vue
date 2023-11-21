<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, getPlanDetailsByPlanId, savePlanDetail } from '@/api/plan.js'
import KakaoPlanMap from '@/components/common/KakaoPlanMap.vue'
import PlanDetailItem from '@/components/plan/item/PlanDetailItem.vue'
import PlanAttractionView from './PlanAttractionView.vue'
import { Slide } from 'vue3-burger-menu'

const route = useRoute()
const router = useRouter()

const planId = route.params.planId
const plan = ref({})
const planDetailList = ref([]) // 전체 계획 상세 리스트
const planDetailGroup = ref([]) // 날짜 별 계획 상세 리스트
const planDetails = ref([]) // 탭에 표시되는 (해당 날짜의) 계획 상세 리스트
const index = ref(-1) // 몇 번째 탭인지
const dateList = ref([])
const canDraw = ref(false)

onMounted(() => {
  getPlanInfo()
})

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
}

const key = ref('tab1')
const noTitleKey = ref('app')
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

const updatePlanDetails = (newPlanDetails) => {
  console.log('newPlanDetails', newPlanDetails)
  planDetailGroup.value[index.value] = [...newPlanDetails]
  planDetails.value = planDetailGroup.value[index.value]
}

const addPlanDetail = (planDetail) => {
  const newPlanDetail = {
    ...planDetail,
    planId: plan.value.planId,
    visitDate: dateList.value[index.value].key,
    visitOrder: planDetailGroup.value[index.value].length + 1
  }

  planDetailGroup.value[index.value].push(newPlanDetail)
  planDetailList.value.push(newPlanDetail)
  planDetails.value = planDetailGroup.value[index.value]
}

const exitEditMode = () => {
  savePlan()
  router.push({ name: 'plan-list' })
}

const savePlan = () => {
  console.log('planDetailList', planDetailList.value) // 로그 추가
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

const isOpenleft = ref(false)
const isOpenRight = ref(false)
const openleftSide = () => {
  isOpenleft.value = !isOpenleft.value
}
const openRightSide = () => {
  isOpenRight.value = !isOpenRight.value
}

const selectedAttraction = ref({})
watch(
  selectedAttraction,
  (newVal) => {
    console.log('selectedAttraction', newVal)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-primary" @click="exitEditMode">저장</button>
    </div>
    <div class="d-flex" style="width: 100%">
      <a-button danger @click="openleftSide">관광지 찾기</a-button>
      <Slide
        class="sidebar"
        :burgerIcon="false"
        width="400"
        noOverlay
        disableOutsideClick
        :isOpen="isOpenleft"
        @closeMenu="isOpenleft = false"
      >
        <PlanAttractionView
          :selectedAttraction="selectedAttraction"
          @add-plan-detail="addPlanDetail"
        />
      </Slide>
      <KakaoPlanMap
        :selected-attraction="selectedAttraction"
        :plan-details="planDetails"
        :can-draw="canDraw"
      />
      <Slide
        class="sidebar"
        right
        :burgerIcon="false"
        width="400"
        noOverlay
        disableOutsideClick
        :isOpen="isOpenRight"
        @closeMenu="isOpenRight = false"
      >
        <a-card
          style="width: fit-content; height:auto overflow-y: scroll"
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
            :index="index"
          />
        </a-card>
      </Slide>
      <a-button danger @click="openRightSide">일정 보기</a-button>
    </div>
  </div>
</template>

<style>
.sidebar .bm-menu {
  background-color: aliceblue;
}

.sidebar .bm-item-list > * {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  /* padding: 0.7em; */
}
</style>
