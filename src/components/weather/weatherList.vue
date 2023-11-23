<script setup>
import { ref, onMounted, computed } from 'vue'
import { listweather } from '@/api/weather.js'
import { WeatherEnum } from '@/Enums/Enum.js'

const param = ref({
  pageNo: 1,
  numOfRows: 300,
  base_date: '20231123',
  base_time: '1100',
  nx: 60,
  ny: 127
})

const weatherList = ref([])
const keys = ref()
const groupedData = ref({})
const dates = ref()
const times = ref()
const categories = ref()
const index = ref(0)

//weatherlist에 담긴 데이터를 분할하기 3차원 배열 사용 예정
// 1차원엔 base_date, 2차원엔 base_time, 3차원엔 각각의 카테고리
const grouping = () => {
  const result = {}
  // weatherList를 base_date별로 묶고
  // 그안에서 base_time별로 묶고
  // 그안에서 각각의 카테고리별로 묶어서 3차원 배열로 만들어준다.
  weatherList.value.forEach((weather) => {
    if (!result[weather.fcstDate]) {
      result[weather.fcstDate] = {}
    }
    if (!result[weather.fcstDate][weather.fcstTime]) {
      result[weather.fcstDate][weather.fcstTime] = {}
    }

    result[weather.fcstDate][weather.fcstTime] = weather
  })

  keys.value = Object.keys(result) // 날짜 정보
  dates.value = Object.keys(result[keys.value[0]]) // 시간 정보
  console.log('카테고리값은', categories.value)
  groupedData.value = result
}

const getColspan = (key) => {
  return Object.keys(groupedData.value[key]).length
}
onMounted(() => {
  listweather(
    param.value,
    ({ data }) => {
      weatherList.value = data.response.body.items.item
      console.log(weatherList.value)
      grouping()
    },
    (err) => {
      console.log(err)
    }
  )

  //   console.log(new Date())
  //   년월일 형식으로 불러오기
  //     const today = new Date()
  //     const year = today.getFullYear()
  //     const month = today.getMonth() + 1
  //     const date = today.getDate()
  //     const hour = today.getHours() - 1
  //     param.value.base_date = year + '' + month + '' + date
  //     param.value.base_time = hour.toString().padStart(2, '0') + '00'
  //   현재시간 불러오기
})
</script>

<template>
  <div class="flex flex-1 justify-center">
    <div class="flex flex-col">
      <caption class="text-2xl">
        지금 최신 날씨를 확인해보세요
      </caption>
      <div class="overflow-x-auto">
        <table class="table table-fixed overflow-scroll">
          <thead>
            <tr>
              <th>날짜</th>
              <th v-for="key in keys" :key="key" :colspan="getColspan(key)">
                {{ key }}
              </th>
            </tr>
            <tr>
              <th>시간</th>
              <template v-for="key in keys" :key="key">
                <th v-for="time in Object.keys(groupedData[key])" :key="`${key}${time}`">
                  {{ time }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <th>기온</th>
              <template v-for="key in keys" :key="key">
                <template v-for="time in Object.keys(groupedData[key])" :key="`${key}${time}`">
                  {{ groupedData[key][time] }}
                  <td v-if="groupedData[key][time].category === 'TMP'">
                    {{ groupedData[key][time].fcstValue }}
                  </td>
                </template>
              </template>
            </tr>
          </tbody>
        </table>
        <!-- <table class="table table-fixed">
          <thead>
            <tr>
              <th>날짜</th>
              <th v-for="key in keys" :key="key">
                {{ key }}
              </th>
            </tr>
            <tr>
              <th>시간</th>
              <th v-for="key in keys" :key="key">
                <span v-for="time in Object.keys(groupedData[key])" :key="time">
                  {{ time }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>데이터</td>
            </tr>
            <tr>
              <td>데이터</td>
            </tr>
            <tr>
              <td>데이터</td>
            </tr>
            <tr>
              <td>데이터</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
