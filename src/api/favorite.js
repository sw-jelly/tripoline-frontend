/*
POST
​/tripoline​/favoriteRest
즐겨찾기 등록하기

GET
​/tripoline​/favoriteRest​/{favoriteId}
favoriteId로 즐겨찾기 가져오기

DELETE
​/tripoline​/favoriteRest​/{favoriteId}
계획 삭제하기

GET
​/tripoline​/favoriteRest​/isFavorite​/{memberId}​/{contentId}
특정 회원이 특정 관광지를 즐겨찾기 했는지 여부 확인

GET
​/tripoline​/favoriteRest​/count​/{contentId}
특정 관광지의 즐겨찾기 개수 조회

GET
​/tripoline​/favoriteRest​/member​/{memberId}
회원에 대한 모든 여행 계획 보기
*/

import { localAxios } from '@/utils/http-commons'
const local = localAxios()

function registFavorite(favorite, success, fail) {
  local.post('favoriteRest', favorite).then(success).catch(fail)
}

function getFavorite(favoriteId, success, fail) {
  local.get(`favoriteRest/${favoriteId}`).then(success).catch(fail)
}

function deleteFavorite(favoriteId, success, fail) {
  local.delete(`favoriteRest/${favoriteId}`).then(success).catch(fail)
}

function getFavoriteCount(contentId, success, fail) {
  local.get(`favoriteRest/count/${contentId}`).then(success).catch(fail)
}

function getFavoriteListByMemberId(memberId, success, fail) {
  local.get(`favoriteRest/member/${memberId}`).then(success).catch(fail)
}

function getIsFavorite(memberId, contentId, success, fail) {
  local.get(`favoriteRest/isFavorite/${contentId}/${memberId}`).then(success).catch(fail)
}

export {
  registFavorite,
  getFavorite,
  deleteFavorite,
  getFavoriteCount,
  getFavoriteListByMemberId,
  getIsFavorite
}
