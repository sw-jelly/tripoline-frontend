// API 통신 모아놓기
import { localAxios, publicAxios } from '@/utils/http-commons'
const { VITE_PUBLIC_API } = import.meta.env
const local = localAxios()
const publicAPI = publicAxios()

// 행사정보 조회
function searchAttraction(categoryId, success, fail) {
  publicAPI
    .get(
      `areaBasedList1?MobileOS=ETC&MobileApp=TRIPOLINE&_type=json&numOfRows=30&contentTypeId=${categoryId}&serviceKey=${VITE_PUBLIC_API}`
    )
    .then(success)
    .catch(fail)
}

//

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

export { searchByLocation, searchSido, searchGugun, searchByTitle, searchAttraction }
