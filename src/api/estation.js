import { stationAxios } from '@/utils/http-commons'

const station = stationAxios()

function listStations(param, success, fail) {
  console.log('선택조건은', param)
  station.get('', { params: param }).then(success).catch(fail)
}

export { listStations }
