import { galleryAxios } from '@/utils/http-commons'
const { VITE_PUBLIC_API, VITE_PUBLIC_API_DECODED } = import.meta.env
const gallery = galleryAxios()

function listGallery(param, success, fail) {
  console.log('선택조건은', param)
  gallery
    .get(
      `galleryList1?serviceKey=${VITE_PUBLIC_API}&numOfRows=${param.numOfRows}&pageNo=${param.pageNo}&MobileOS=ETC&MobileApp=AppTest&arrange=${param.arrange}&_type=json`
    )
    .then(success)
    .catch(fail)
}

function keySearch(param, success, fail) {
  console.log('선택조건은', param)
  gallery
    .get(
      `gallerySearchList1?serviceKey=${VITE_PUBLIC_API}&keyword=${param.keyword}&numOfRows=${param.numOfRows}&pageNo=${param.pageNo}&MobileOS=ETC&MobileApp=AppTest&arrange=${param.arrange}&_type=json`
    )
    .then(success)
    .catch(fail)
}

export { listGallery, keySearch }
