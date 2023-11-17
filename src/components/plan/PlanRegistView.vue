<script setup>
import { ref, onMounted } from 'vue'
import { searchSido, searchGugun } from '@/api/attraction.js'
import VSelect from '@/components/common/VSelect.vue'

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])
const defaultTitle = ref('나의 여행')

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
  defaultTitle.value = `나의 ${val} 여행`
  console.log(sidoList.value)
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
</script>

<template>
  <div>
    <h1 class="text-center">어디로 여행을 떠나시겠어요?</h1>
    <div class="col-md-12 d-flex" style="flex-direction: column; align-items: center">
      <div class="col-md-8 d-flex mt-3">
        <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
        <VSelect :selectOption="gugunList" />
      </div>
    </div>
    <v-sheet max-width="300" class="mx-auto mt-3">
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="userName"
          :rules="rules"
          label="여행 이름 (선택)"
          :placeholder="defaultTitle"
        ></v-text-field>

        <v-btn :loading="loading" type="submit" block class="mt-2" text="Submit"></v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped></style>
