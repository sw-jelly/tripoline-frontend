<template>
  <div id="map">
    <div class="modal fade" id="descriptionModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <h1>여기에 내용</h1>
          <h3 @click="changeState">여기 다시누르면 꺼짐</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KakaoMap',
  components: {},
  data() {
    return {
      is_show: false
    }
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.onload = () => kakao.maps.load(this.initMap)
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=cfc1e7455936fe459743b8dfe3dae5fe&libraries=services,drawing'
      document.head.appendChild(script)
    }
  },

  methods: {
    initMap() {
      const container = document.getElementById('map')
      var options = {
        center: new kakao.maps.LatLng(37.50128520917558, 127.03955377219623),
        level: 7
      }

      var map = new kakao.maps.Map(container, options) ///zoom control

      this.kakaoMapEvent(map) //맵이벤트
    },

    kakaoMapEvent(map) {
      var markers = []

      let input = document.getElementById('search-area')
      let resultDiv = document.getElementById('search-area-subelement')

      input.addEventListener('change', () => {
        let sidoCode = input.value
        var url = `http://localhost:8080/tripoline/attraction/findGugun?sidoCode=` + sidoCode
        console.log('url = ' + url)

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            makeGugunOption(data)
          })
      })

      function makeGugunOption(data) {
        var gugun
        let areasList = `<option value="0" selected>시/군/구 선택</option>`
        for (gugun of data) {
          areasList += `<option value="${gugun.gugunCode}">${gugun.gugunName}</option>`
        }

        resultDiv.innerHTML = areasList
      }

      /*
       * 검색 버튼 click 이벤트
       */
      document.getElementById('btn-search').addEventListener('click', () => {
        var url = `http://localhost:8080/tripoline/attraction/search`

        let sidoCode = document.getElementById('search-area').value
        let contentTypeId = document.getElementById('search-content-id').value
        let gugunCode = document.getElementById('search-area-subelement').value
        if (sidoCode == 0) {
          alert('시/도는 필수 선택 사항입니다!')
          return
        }

        url += `?sidoCode=${sidoCode}`
        url += `&gugunCode=${gugunCode}`
        url += `&contentTypeId=${contentTypeId}`
        fetch(url)
          .then((response) => response.json())
          .then((data) => makeList(data))
      })

      /*
       * 받아온 데이터 지도에 표시하기
       */
      function makeList(data) {
        let trips = data

        // 데이터가 없으면 return;
        if (trips.length == 0) {
          alert('검색된 결과가 없습니다.')
          return
        }

        map.setCenter(new kakao.maps.LatLng(trips[0].latitude, trips[0].longitude))
        // 있던 마커 제거
        if (markers) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
        }

        // 마커 이미지 생성
        function createMarkerImage(src, size) {
          var markerImage = new kakao.maps.MarkerImage(src, size)
          return markerImage
        }

        markers = []
        var marker
        var markerPosition
        var img = createMarkerImage(
          `http://localhost:8080/tripoline/assets/img/pin.png`,
          new kakao.maps.Size(32, 32)
        )

        trips.forEach((area) => {
          markerPosition = new kakao.maps.LatLng(area.latitude, area.longitude)

          marker = new kakao.maps.Marker({
            title: `${area.contentId}`,
            position: markerPosition,
            image: img,
            clickable: true
          })

          marker.setMap(map)
          markers.push(marker)
          var m = document.querySelector(`[title="${marker.getTitle()}"]`)
          m.setAttribute('data-bs-toggle', 'modal')
          m.setAttribute('data-bs-target', '#descriptionModal')

          var content = `
		<div class="wrap">
			<div class="info">
				<div class="title">${area.title}</div>
				<div class="body">
                    <input type="hidden" id="overview" name="overview" value="${area.overview}">
					<div class="img">
						<img src="${area.firstImage}" class="image"
						onerror="this.src='http://localhost:8080/tripoline/assets/img/noimage.jpg';"
						width="73" height="70">
					</div>
					<div class="desc">
						<div class="ellipsis">${area.addr1}</div>
						<div class="jibun ellipsis">${area.tel}</div>
						<div class="link">마커 클릭 시 상세 정보</div>
					</div>
				</div>
			</div>
		</div>
    	`

          function handle_toggle() {}
          // 마커에 표시할 인포윈도우를 생성
          var infowindow = new kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content // 인포윈도우에 표시할 내용
          })

          ;(function (marker, infowindow) {
            // 마우스 오버 시 인포윈도우를 표시
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              infowindow.setMap(map)
            })

            // 마우스 아웃 시 인포윈도우를 닫기
            kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.setMap(null)
            })

            // 마우스 클릭 시 상세페이지
            kakao.maps.event.addListener(marker, 'click', function () {
              var parser = new DOMParser()
              var doc = parser.parseFromString(infowindow.getContent(), 'text/html')

              let img = doc.getElementsByClassName('image')[0].src
              let desc = doc.getElementById('overview').value
              console.log(desc)
              console.log(img)
              if (img.includes('attraction')) {
                img = `http://localhost:8080/tripoline/assets/img/noimage.jpg`
              }
              let title = doc.getElementsByClassName('title')[0].innerText

              let contents = `
			<div class="modal-dialog">
				<div class="modal-content">
					<div id="container">
						<input type="hidden" class= value="search" />
						<div class="card">
							<img src="${img}">
							<div class="card__details">
								<div class="name">${title}</div>
								<p>${desc}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
              document.getElementById('descriptionModal').innerHTML = contents
            })
          })(marker, infowindow)
        })
      }
    }
  }
}
</script>
<style scoped></style>
