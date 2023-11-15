// API 통신 모아놓기
import { localAxios } from '@/utils/http-commons'

const local = localAxios()

// 관광지 검색 ()
function searchByLocation(params, success, fail) {
  local.get('attractionRest/searchByLocation', { params }).then(success).catch(fail)
}

function searchSido(success, fail) {
  local.get('attractionRest').then(success).catch(fail)
}

function searchGugun(param, success, fail) {
  local.get(`attractionRest/findGugun`, { params: param }).then(success).catch(fail)
}

function searchByTitle(params, success, fail) {
  local.get('attractionRest/searchByTitle', { params }).then(success).catch(fail)
}
export { searchByLocation, searchSido, searchGugun, searchByTitle }
