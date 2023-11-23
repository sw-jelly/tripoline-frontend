<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router/index.js'
import { searchSido, searchGugun } from '@/api/attraction.js'
import { useMemberStore } from '@/stores/member'
import { registPlan } from '@/api/plan.js'
import VSelect from '@/components/common/VSelect.vue'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

const getCurrentStyle = (current) => {
  const style = {}
  if (current.date() === 1) {
    style.border = '1px solid #1890ff'
    style.borderRadius = '50%'
  }
  return style
}

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const defaultTitle = ref('나의 여행')
const loading = ref(false)
const dateInfo = ref(null)
const params = ref({
  sidoCode: 0,
  gugunCode: 0,
  planTitle: '',
  startDate: '',
  endDate: '',
  memberId: ''
})
const planId = ref(0)

onMounted(() => {
  getSidoList()
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

const onChangeSido = (val) => {
  const city = sidoList.value.find((sido) => sido.value === val)
  defaultTitle.value = `나의 ${city.text} 여행`
  params.value.sidoCode = val
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
  params.value.gugunCode = val
}

const goToRegistDetail = () => {
  if (params.value.sidoCode === 0) {
    alert('시/도는 필수 선택사항입니다!')
    return
  }
  if (!dateInfo.value) {
    alert('날짜는 필수 선택사항입니다!')
  }
  loading.value = true
  if (params.value.planTitle === '') {
    params.value.planTitle = defaultTitle.value
  }
  params.value.memberId = userInfo.value.memberId
  params.value.startDate = dateInfo.value[0].$d
  params.value.endDate = dateInfo.value[1].$d
  console.log('선택된 친구들은...', params.value)

  setTimeout(() => {
    loading.value = false
    registPlan(
      params.value,
      ({ data }) => {
        console.log('registPlan data', data)
        planId.value = data

        router.push({
          name: 'plan-regist-detail',
          params: { planId: planId.value }
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }, 1000)
}
</script>

<template>
  <div
    style="display: flex; flex-direction: column; align-items: center"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
      alt="Rocket"
      width="130"
      height="130"
    />
    <h1 class="text-center">어디로 여행을 떠나시겠어요?</h1>
    <div class="col-md-12 d-flex" style="flex-direction: column; align-items: center">
      <div class="col-md-4 d-flex mt-3" style="height: 60px">
        <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
        <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      </div>
    </div>

    <h4 class="text-center m-3">날짜 선택</h4>
    <div class="flex justify-center">
      <a-space direction="vertical" :size="12">
        <a-range-picker v-model:value="dateInfo">
          <template #dateRender="{ current }">
            <div class="ant-picker-cell-inner" :style="getCurrentStyle(current)">
              {{ current.date() }}
            </div>
          </template>
        </a-range-picker>
      </a-space>
    </div>

    <v-sheet max-width="500" min-width="300" class="mx-auto mt-3">
      <v-form validate-on="submit lazy" @submit.prevent="true">
        <input @keyup.enter="goToRegistDetail" />
        <v-text-field
          v-model="params.planTitle"
          size="large"
          label="여행 이름 (선택)"
          :placeholder="defaultTitle"
        ></v-text-field>

        <v-btn
          :loading="loading"
          size="large"
          type="submit"
          block
          class="mt-2"
          text="여행 계획 짜기"
          @click="goToRegistDetail"
        ></v-btn>
      </v-form>
    </v-sheet>
    <a class="my-a-tag" @click="() => $router.go(-1)">목록으로 돌아가기</a>
  </div>
</template>

<style scoped>
.my-a-tag {
  color: #1890ff;
  align-self: center;
  cursor: pointer;
  margin-top: 10px;
}

.form-select {
  font-size: 20px;
}

.v-input__control {
  height: 60px;
}

a-space .ant-picker {
  height: 50px;
}

a-space .ant-picker .ant-picker-input {
  font-size: 30px;
}
</style>
