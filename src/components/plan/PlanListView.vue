<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { getPlanListByMemberId } from '@/api/plan.js'
import { useMemberStore } from '@/stores/member'

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
</script>

<template>
  <h1>잘 오셨습니다</h1>
</template>

<style scoped></style>
