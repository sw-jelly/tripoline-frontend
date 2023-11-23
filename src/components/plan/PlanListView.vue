<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { getPlanListByMemberId } from '@/api/plan.js'
import { useMemberStore } from '@/stores/member'
import PlanListItem from '@/components/plan/item/PlanListItem.vue'

const memberStore = useMemberStore()
const router = useRouter()
const { userInfo } = storeToRefs(memberStore)
console.log(userInfo.value)

const plans = ref([])
onMounted(() => {
  getPlanList()
  console.log(plans.value)
})

const getPlanList = () => {
  getPlanListByMemberId(
    userInfo.value.memberId,
    ({ data }) => {
      console.log(data)
      plans.value = data
    },
    (err) => {
      console.log(err)
    }
  )
}

const goToRegist = () => {
  router.push({
    name: 'plan-regist'
  })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center">
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Spiral%20Calendar.png"
      alt="Spiral Calendar"
      width="120"
      height="120"
    />
    <h1 class="text-center mb-3">나의 여행 계획</h1>
    <v-col class="text-center" cols="12" @click="goToRegist">
      <v-btn class="mb-3" size="x-large">새 여행 계획 추가하기</v-btn>
    </v-col>
    <v-row class="d-flex flex-wrap ga-3" justify="start">
      <PlanListItem v-for="(plan, i) in plans" :key="i" :plan="plan" />
    </v-row>
  </v-container>
</template>

<style scoped></style>
