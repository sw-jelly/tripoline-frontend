<script>
import KakaoMap from '@/components/attraction/KakaoMap.vue'

export default {
  name: 'App',
  components: {
    KakaoMap
  }
}
</script>

<template>
  <section class="m-3">
    <div class="col-md-12 d-flex" style="flex-direction: column; align-items: center">
      <!-- 관광지 검색 start -->
      <form
        class="col-md-8 d-flex mt-3"
        role="search"
        method="post"
        action="attraction"
        id="searchForm"
      >
        <input type="hidden" name="action" value="search" />

        <!-- 시 도 선택 -->
        <!-- <select
          id="search-area"
          class="form-select"
          aria-label="Default select example"
          name="sido"
        >
          <option value="0" selected>시/도 선택</option>
          <c:forEach items="${sidos}" var="sido">
            <option value="${sido.sidoCode}">${sido.sidoName}</option>
          </c:forEach>
        </select> -->
        <select
          id="search-area"
          class="form-select"
          name="sido"
        >
          <option value="0" selected>시/도 전체</option>
          <option value="1">서울</option>
          <option value="2">인천</option>
          <option value="3">대전</option>
          <option value="4">대구</option>
          <option value="5">광주</option>
          <option value="6">부산</option>
          <option value="7">울산</option>
          <option value="8">세종특별자치시</option>
          <option value="31">경기도</option>
          <option value="32">강원도</option>
          <option value="33">충청북도</option>
          <option value="34">충청남도</option>
          <option value="35">경상북도</option>
          <option value="36">경상남도</option>
          <option value="37">전라북도</option>
          <option value="38">전라남도</option>
          <option value="39">제주도</option>
        </select>

        <!-- 시 군 구 선택 -->
        <select
          id="search-area-subelement"
          class="form-select"
          name="gungu"
        >
          <option value="0" selected>시/군/구 선택</option>
        </select>

        <!-- 관광지 유형 선택 -->
        <select
          id="search-content-id"
          class="form-select"
          aria-label="Default select example"
          name="type"
        >
          <option value="0" selected>관광지 유형 전체</option>
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
        <button id="btn-search" class="btn btn-outline-success" type="button">검색</button>
      </form>

      <!-- 지도 영역 start -->
      <div id="map" style="width: 67%; height: 40rem !important; margin-top: 1rem">
        <KakaoMap />
      </div>
      <!-- 지도 영역 end -->
    </div>
  </section>
</template>

<style>
/* 모달 스타일 */

#descriptionModal .modal-dialog {
  width: fit-content;
  margin-top: 10%;
}

.card img {
  width: 100%;
  border-radius: 12px;
  height: 214px;
  object-fit: cover;
}

.card {
  /* Change background color */
  background-color: white;
  /* Add border */
  border: 1px solid #bacdd8;
  /* Add space between the border and the content */
  padding: 8px;
  border-radius: 12px;
}

.tag {
  padding: 4px 8px;
  border: 1px solid #e5eaed;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #788697;
}

.name {
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
}

p {
  font-size: 14px;
  color: #7f8c9b;
  line-height: 150%;
}

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

.info .link {
  color: #5085bb;
}
</style>
