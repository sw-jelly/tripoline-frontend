// API 통신 모아놓기
import { localAxios } from '@/utils/http-commons'

const local = localAxios()

// 책 목록 조회
function regist(params, success, fail) {
  local.post('memberRest', { params }).then(success).catch(fail)
}

function login(memberId, memberPassword, success, fail) {
  local.post('memberRest', { memberId, memberPassword }).then(success).catch(fail)
}

function memberWithDrawal(memberId, success, fail) {
  local.delete(`memberRest/${memberId}`).then(success).catch(fail)
}

function memberLogOut(success, fail) {
  local.delete('memberRest/logout').then(success).catch(fail)
}

function updateMember(member, success, fail) {
  local.put(`memberRest`, JSON.stringify(member)).then(success).catch(fail)
}

export { regist, login, memberWithDrawal, updateMember, memberLogOut }
