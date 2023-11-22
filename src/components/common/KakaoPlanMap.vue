<script setup>
import { watch, onMounted } from 'vue'

var map
var infowindow = null
var polyline = null
var markers = []
var linePath = []

const props = defineProps({ selectedAttraction: Object, planDetails: Array, canDraw: Boolean })
const selectedAttraction = props.selectedAttraction

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
  () => selectedAttraction.value,
  () => {
    var lat = selectedAttraction.value.latitude
    var lng = selectedAttraction.value.longitude

    var moveLatLon = new kakao.maps.LatLng(lat, lng)

    map.panTo(moveLatLon)
    openInfoWindow(lat, lng)
  },
  { deep: true }
)

watch(
  () => props.planDetails,
  () => {
    if (!map) {
      return
    }
    console.log('planDetails =>>>', props.planDetails)
    drawLine()
  },
  { deep: true }
)

watch(
  () => props.canDraw,
  () => {
    console.log('canDraw =>>>', props.canDraw)
    drawLine()
    props.canDraw = false
  },
  { deep: true }
)

const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  }
  map = new kakao.maps.Map(container, options)
}

const closeInfoWindow = () => {
  infowindow.setMap(null)
}

const openInfoWindow = (lat, lng) => {
  if (infowindow) infowindow.setMap(null)

  var moveLatLon = new kakao.maps.LatLng(lat, lng)

  console.log('selectedAttraction', selectedAttraction.value)

  var content = `
    <div class="wrap">
      <div class="info">
        <div class="title">${selectedAttraction.value.title}
            <div class="close" title="닫기"></div>
        </div>
        <div class="body">
          <div class="img">
            <img
              src="${selectedAttraction.value.firstImage}"
            />
          </div>
          <div class="desc">
            <div class="ellipsis">${selectedAttraction.value.addr1}</div>
            <div class="jibun ellipsis">${selectedAttraction.value.tel}</div>
          </div>
        </div>
      </div>
    </div>
  `

  infowindow = new kakao.maps.CustomOverlay({
    position: moveLatLon,
    content: content
  })

  infowindow.setMap(map)

  var closeBtn = document.querySelector('.wrap .close')
  if (closeBtn) {
    closeBtn.addEventListener('click', closeInfoWindow)
  }
}

const drawLine = () => {
  deleteMarkers()
  if (polyline) deleteLine()

  var i = 1
  linePath = []
  props.planDetails.forEach((planDetail) => {
    console.log(planDetail.latitude)
    linePath.push(new kakao.maps.LatLng(planDetail.latitude, planDetail.longitude))
    let content = `<div style="position:relative;"><svg xmlns="http://www.w3.org/2000/svg" fill="#4c535b" width="50px" height="50px" viewBox="0 0 1920 1920">
    <path d="M956.952 0c-362.4 0-657 294.6-657 656.88 0 180.6 80.28 347.88 245.4 511.56 239.76 237.96 351.6 457.68 351.6 691.56v60h120v-60c0-232.8 110.28-446.16 357.6-691.44 165.12-163.8 245.4-331.08 245.4-511.68 0-362.28-294.6-656.88-663-656.88" fill-rule="evenodd"/>
    </svg><span style="position:absolute; top:10%; left:50%;font-family:'NanumSquareNeo-ExtraBold';color:white;
    transform: translate(-50%, 0);">${i++}</span></div>`
    let newMarker = new window.kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(planDetail.latitude, planDetail.longitude),
      content: content,
      yAnchor: 1
    })
    newMarker.setMap(map)
    markers.push(newMarker)
  })

  if (linePath.length === 0) return

  polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: '#ff4f61', // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다
    strokeStyle: 'solid' // 선의 스타일입니다
  })

  const bounds = props.planDetails.reduce((bounds, planDetail) => {
    return bounds.extend(new kakao.maps.LatLng(planDetail.latitude, planDetail.longitude))
  }, new kakao.maps.LatLngBounds())

  map.setBounds(bounds)
  polyline.setMap(map)
}

const deleteMarkers = () => {
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = []
}

const deleteLine = () => {
  polyline.setMap(null)
  polyline = null
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>

<style>
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
