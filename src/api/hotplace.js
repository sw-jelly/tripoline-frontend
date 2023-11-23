import { localAxios } from '@/utils/http-commons'

const local = localAxios()

function getHotPlaces(success, fail) {
  console.log('hotplace 호출')
  local.get('attractionRest/hotplace').then(success).catch(fail)
}

function getLikeCount(param, success, fail) {
  console.log('hotplace 호출')
  local.get(`attractionRest/hotplaceCount`).then(success).catch(fail)
}

export { getHotPlaces, getLikeCount }
