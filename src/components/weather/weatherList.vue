<script setup>
import { ref, onMounted } from 'vue'
import { listweather } from '@/api/weather.js'
import { WeatherEnum } from '@/Enums/Enum.js'

const param = ref({
  pageNo: 1,
  numOfRows: 100,
  base_date: '1123',
  base_time: '2300',
  nx: 60,
  ny: 127
})

const weatherList = ref([])
const groupedData = ref({})
const dates = ref()

/* weatherlist에 담긴 데이터를 분할하기 3차원 배열 사용 예정
 result = {
   '20231123' : { 0900 : {데이터1, 데이터2, 데이터3}, 1000 : {데이터1, 데이터2, 데이터3} }
   '20231124' : {},
   '20231125' : {} ,
}
*/
// 1차원엔 base_date, 2차원엔 base_time, 3차원엔 각각의 카테고리
const grouping = () => {
  const result = {}

  weatherList.value.forEach((weather) => {
    if (!result[weather.fcstDate]) {
      result[weather.fcstDate] = {}
    }
    if (!result[weather.fcstDate][weather.fcstTime]) {
      result[weather.fcstDate][weather.fcstTime] = []
    }
    console.log(weather)
    categories.value.add(weather.category)
    result[weather.fcstDate][weather.fcstTime].push(weather)
  })
  console.log(categories.value)
  dates.value = Object.keys(result) // 날짜 정보
  groupedData.value = result
}

const visited = ref(false)

const categories = ref(new Set())

const generateUniqueKey = (item) => {
  return item + '_' + Math.random().toString(36).substr(2, 9)
}

const getColspan = (key) => {
  return Object.keys(groupedData.value[key]).length
}
onMounted(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  let date = today.getDate()
  let hour = today.getHours() - 1
  if (hour < 0) {
    hour = 24 + hour
    date = date - 1
  }
  param.value.base_date = year + '' + month + '' + date
  param.value.base_time = hour.toString().padStart(2, '0') + '00'

  listweather(
    param.value,
    ({ data }) => {
      console.log(data)
      weatherList.value = data.response.body.items.item
      grouping()
    },
    (err) => {
      console.log(err)
    }
  )
})

const onSelect = (e) => {
  // area.value를 선택한 text로 변경
  area.value = selectOption.value[e.target.value - 1].text
  param.value.nx = selectOption.value[e.target.value - 1].x
  param.value.ny = selectOption.value[e.target.value - 1].y

  listweather(
    param.value,
    ({ data }) => {
      weatherList.value = data.response.body.items.item
      grouping()
    },
    (err) => {
      console.log(err)
    }
  )
}

const area = ref('서울')

const selectOption = ref([
  {
    text: '서울',
    value: 1,
    x: 60,
    y: 127
  },
  {
    text: '부산',
    value: 2,
    x: 98,
    y: 76
  },
  {
    text: '대구',
    value: 3,
    x: 89,
    y: 90
  },
  {
    text: '인천',
    value: 4,
    x: 55,
    y: 124
  },
  {
    text: '광주',
    value: 5,
    x: 58,
    y: 74
  },
  {
    text: '대전',
    value: 6,
    x: 67,
    y: 100
  },
  {
    text: '울산',
    value: 7,
    x: 102,
    y: 84
  },
  {
    text: '세종시',
    value: 8,
    x: 66,
    y: 103
  },
  {
    text: '경기도',
    value: 9,
    x: 60,
    y: 120
  },
  {
    text: '충청북도',
    value: 10,
    x: 69,
    y: 107
  },
  {
    text: '충청남도',
    value: 11,
    x: 68,
    y: 100
  },
  {
    text: '전라북도',
    value: 12,
    x: 63,
    y: 89
  },
  {
    text: '전라남도',
    value: 13,
    x: 51,
    y: 67
  },
  {
    text: '경상북도',
    value: 14,
    x: 89,
    y: 91
  },
  {
    text: '경상남도',
    value: 15,
    x: 91,
    y: 77
  },
  {
    text: '제주도',
    value: 16,
    x: 52,
    y: 38
  },
  {
    text: '이어도',
    value: 17,
    x: 28,
    y: 8
  },
  {
    text: '강원도',
    value: 18,
    x: 73,
    y: 134
  }
])
</script>

<template>
  <div class="flex flex-1 justify-center">
    <div class="flex flex-col">
      <div class="flex w-full justify-around text-center">
        <h1 class="text-2xl">지금 {{ area }} 지역의 최신 날씨를 확인해보세요</h1>
        <div>
          <h1 class="text-2xl">더 많은 지역이 궁금하다면?</h1>
          <div class="flex">
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Right.png"
              alt="Backhand Index Pointing Right"
              width="50"
              height="50"
            />
            <select
              class="select-box w-[150px] border border-solid border-black rounded text-center"
              @change="onSelect"
            >
              <option v-for="option in selectOption" :key="option.text" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-fixed overflow-scroll text-center">
          <thead>
            <tr>
              <th rowspan="100">날씨</th>
              <th>날짜</th>
              <th v-for="date in dates" :key="date" :colspan="getColspan(date)">
                {{ date }}
              </th>
            </tr>
            <tr>
              <th>시간</th>
              <template v-for="date in dates" :key="date">
                <th
                  v-for="time in Object.keys(groupedData[date]).sort()"
                  :key="generateUniqueKey(time)"
                >
                  {{ time }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <td></td>
            <td>
              <template v-for="(category, index) in categories" :key="category">
                <div v-if="!visited">
                  {{ WeatherEnum[category] }}
                </div>
              </template>
            </td>
            <template v-for="date in dates" :key="date">
              <template
                v-for="time in Object.keys(groupedData[date]).sort()"
                :key="generateUniqueKey(time)"
              >
                <td>
                  <div
                    v-for="weatherData in groupedData[date][time]"
                    :key="generateUniqueKey(weatherData)"
                  >
                    {{ weatherData.fcstValue }}
                  </div>
                </td>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table tbody tr {
  height: 50px; /* Set your desired row height here */
}

/* You can adjust padding or other styles as needed */
.table tbody td {
  padding: 10px;
}
</style>
