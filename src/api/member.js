// API 통신 모아놓기
import { localAxios } from '@/utils/http-commons'

const local = localAxios()

async function userConfirm(param, success, fail) {
  console.log('param', param)
  await local.post('/memberRest/login', param).then(success).catch(fail)
  console.log('userConfirm ok')
}

async function findById(userid, success, fail) {
  local.defaults.headers['Authorization'] = sessionStorage.getItem('accessToken')
  await local.get(`/memberRest/info/${userid}`).then(success).catch(fail)
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers['refreshToken'] = sessionStorage.getItem('refreshToken') //axios header에 refresh-token 셋팅
  await local.post(`/memberRest/refresh`, user).then(success).catch(fail)
}

async function logout(userid, success, fail) {
  await local.get(`/memberRest/logout/${userid}`).then(success).catch(fail)
}

export { userConfirm, findById, tokenRegeneration, logout }

// function regist(params, success, fail) {
//   local.post('memberRest', { params }).then(success).catch(fail)
// }

// function login(memberId, memberPassword, success, fail) {
//   local.post('memberRest', { memberId, memberPassword }).then(success).catch(fail)
// }

// function memberWithDrawal(memberId, success, fail) {
//   local.delete(memberRest/${memberId}).then(success).catch(fail)
// }

// function memberLogOut(success, fail) {
//   local.delete('memberRest/logout').then(success).catch(fail)
// }

// function updateMember(member, success, fail) {
//   local.put(memberRest, JSON.stringify(member)).then(success).catch(fail)
// }

// export { regist, login, memberWithDrawal, updateMember, memberLogOut }
