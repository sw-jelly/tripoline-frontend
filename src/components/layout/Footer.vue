<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const showAlert = () => {
  alert('자료첨부 준비중')
}
</script>

<template>
  <footer class="flex flex-col bg-stone-600 p-[10px] bottom-[0]">
    <!-- footer영역 채워넣기 -->
    <div class="flex justify-around items-between">
      <div class="flex flex-col">
        <div class="text-2xl text-white">
          <a href="/" class="none text-white">
            <span>Tripoline</span>
          </a>
          <p>
            CopyRight &copy; SSAFY 서울 13반 지인성 <br />
            Member & Contributor <br />
            ssafy 서울 13반 지인성 (DB, BackEnd-PJT, Vue)<br />
            ssafy 서울 13반 양유경 (Spring, Vue PJT)<br />
            ssafy 서울 13반 이동훈 (BackEnd, Algorithm PJT)<br />
            ssafy 서울 13반 정민지 (DB-PJT) <br />
          </p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-2xl text-white">
          <h4>Contact Us</h4>
          <p>삼성 청년소프트웨어 아카데미 (SSAFY)</p>
          <p>대한민국 서울특별시</p>
          <p>강남구 역삼동 테헤란로 212</p>
          <p class="mt-4"><strong>Phone:</strong> <span>+82 10-1004-1004 </span></p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-2xl text-white">
          <h4>&COPY; Tripoline</h4>
          <p>SSAFY 1학기 관통프로젝트</p>
          <p>SSAFY 서울 13반</p>
          <p>트리폴린</p>
          <RouterLink
            class="text-white border-t solid underline cursor-pointer"
            :to="{ name: 'specialthanks' }"
            >도와주신분들</RouterLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
