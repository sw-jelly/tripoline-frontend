import { localAxios } from '@/utils/http-commons'
const local = localAxios()

function registPlan(params, success, fail) {
  local.post('planRest/plan', { params }).then(success).catch(fail)
}

function updatePlan(params, success, fail) {
  local.put('planRest/plan', { params }).then(success).catch(fail)
}

function deletePlan(planId, success, fail) {
  local.delete(`planRest/plan/${planId}`).then(success).catch(fail)
}

function registPlanDetail(params, success, fail) {
  local.post('planRest/planDetail', { params }).then(success).catch(fail)
}

function updatePlanDetail(params, success, fail) {
  local.put('planRest/planDetail', { params }).then(success).catch(fail)
}

function deletePlanDetail(planDetailId, success, fail) {
  local.delete(`planRest/planDetail/${planDetailId}`).then(success).catch(fail)
}

function getPlan(planId, success, fail) {
  local.get(`planRest/plan/${planId}`).then(success).catch(fail)
}

function getPlanDetail(planDetailId, success, fail) {
  local.get(`planRest/planDetail/${planDetailId}`).then(success).catch(fail)
}

function getPlanListByMemberId(memberId, success, fail) {
  local.get(`planRest/plan/member/${memberId}`).then(success).catch(fail)
}

function getPlanDetailsByPlanId(planId, success, fail) {
  local.get(`planRest/planDetail/plan/${planId}`).then(success).catch(fail)
}

export {
  registPlan,
  updatePlan,
  deletePlan,
  registPlanDetail,
  updatePlanDetail,
  deletePlanDetail,
  getPlanDetail,
  getPlan,
  getPlanListByMemberId,
  getPlanDetailsByPlanId
}
