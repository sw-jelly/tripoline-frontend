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
  <v-container>
    <h1 class="text-center">나의 여행 계획</h1>
    <v-col class="text-center" cols="12" @click="goToRegist">
      <v-btn size="x-large">새 여행 계획 추가하기</v-btn>
    </v-col>
    <v-row align="center" justify="start">
      <PlanListItem v-for="(plan, i) in plans" :key="i" :plan="plan" />
    </v-row>
  </v-container>
</template>

<style scoped></style>
