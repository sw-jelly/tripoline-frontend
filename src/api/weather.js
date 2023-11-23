import { weatherAxios } from '@/utils/http-commons.js'

const { VITE_PUBLIC_API, VITE_PUBLIC_API_DECODED } = import.meta.env
const weather = weatherAxios()

function listweather(param, success, fail) {
  console.log('선택조건은', param)
  weather
    .get(
      `getVilageFcst?ServiceKey=${VITE_PUBLIC_API}&numOfRows=${param.numOfRows}&pageNo=${param.pageNo}&dataType=JSON&base_date=${param.base_date}&base_time=${param.base_time}&nx=${param.nx}&ny=${param.ny}`
    )
    .then(success)
    .catch(fail)
}

export { listweather }
