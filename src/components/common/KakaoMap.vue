<script setup>
import { ref, watch, onMounted } from 'vue'
import DescriptionItem from '@/components/attraction/item/DescriptionItem.vue'

const props = defineProps({ attractions: Array })

var map
const spots = ref([])
const markers = ref([])

const infoWindow = ref(null)
const info = ref({
  title: '',
  addr1: '',
  tel: '',
  overview: '',
  firstImage: ''
})
const pos = ref(null)

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`
    script.onload = () => kakao.maps.load(() => initMap())
    document.head.appendChild(script)
  }
})

watch(
  () => props.attractions.value,
  () => {
    spots.value = []

    props.attractions.forEach((attraction) => {
      let obj = {}
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude)
      obj.contentId = attraction.contentId
      obj.title = attraction.title
      obj.addr1 = attraction.addr1
      obj.tel = attraction.tel
      obj.overview = attraction.overview
      obj.firstImage = attraction.firstImage
      // TO-DO : pin 이미지 장소 유형에 맞게 변경
      obj.img = createMarkerImage(
        `http://localhost:8080/tripoline/assets/img/pin.png`,
        new kakao.maps.Size(32, 32)
      )
      spots.value.push(obj)
    })

    loadMarkers()
  },
  { deep: true }
)

const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(37.50128520917558, 127.03955377219623),
    level: 3
  }
  map = new kakao.maps.Map(container, options)
  infoWindow.value = new kakao.maps.CustomOverlay({
    position: null,
    content: null
  })
}

const createMarkerImage = (src, size) => {
  const markerImage = new kakao.maps.MarkerImage(src, size)
  return markerImage
}

const loadMarkers = () => {
  deleteMarkers()

  spots.value.forEach((spot) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: spot.latlng,
      title: spot.contentId,
      image: spot.img,
      clickable: true
    })
    markers.value.push(marker)

    var m = document.querySelector(`[title="${marker.getTitle()}"]`)
    m.setAttribute('data-bs-toggle', 'modal')
    m.setAttribute('data-bs-target', '#descriptionView')

    kakao.maps.event.addListener(marker, 'mouseover', function () {
      pos.value = spot.latlng
      info.value = {
        title: spot.title,
        addr1: spot.addr1,
        tel: spot.tel,
        overview: spot.overview,
        firstImage: spot.firstImage
      }
      if (!info.value.firstImage.includes('tong')) {
        info.value.firstImage = 'http://localhost:8080/tripoline/assets/img/noimage.jpg'
      }
      setInfoWindow()
      infoWindow.value.setMap(map)
    })

    kakao.maps.event.addListener(marker, 'mouseout', function () {
      infoWindow.value.setMap(null)
    })
  })

  const bounds = spots.value.reduce((bounds, spot) => {
    return bounds.extend(spot.latlng)
  }, new kakao.maps.LatLngBounds())

  map.setBounds(bounds)
}

const setInfoWindow = () => {
  infoWindow.value.setPosition(pos.value)
  infoWindow.value.setContent(`
    <div class="wrap">
      <div class="info">
        <div class="title">${info.value.title}</div>
        <div class="body">
          <div class="img">
            <img
              src="${info.value.firstImage}"
            />
          </div>
          <div class="desc">
            <div class="ellipsis">${info.value.addr1}</div>
            <div class="jibun ellipsis">${info.value.tel}</div>
            <div class="link">마커 클릭 시 상세 정보</div>
          </div>
        </div>
      </div>
    </div>
  `)
}

const deleteMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null)
  })
  markers.value = []
}
</script>

<template>
  <DescriptionItem :info="info" />
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 67%;
  height: 40rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

<style>
/* 지도 스타일 */
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  line-height: 1.5;
}

.wrap * {
  padding: 0;
  margin: 0;
}

.wrap .body {
  z-index: 2;
}

.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  color: #333;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}

.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info .img img {
  width: 100%;
  height: 100%;
}

.info .link {
  color: #5085bb;
}
</style>
