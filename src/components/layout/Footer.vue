<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const showAlert = () => {
  alert('자료첨부 준비중')
}
</script>

<template>
  <footer class="h-[240px] relative translate-y-0 bg-stone-500">
    <!-- footer영역 채워넣기 -->
    <div class="w-full h-full flex justify-evenly items-center">
      <div class="flex flex-col justify-evenly">
        <div class="text-2xl text-white">
          <a href="index.html">
            <span>Enjoy Trip</span>
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
          <p><strong>Email:</strong> <span>ssafy@ssafy.com</span></p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-2xl text-white">
          <h4>&COPY; Tripoline</h4>
          <p>SSAFY 1학기 관통프로젝트</p>
          <p>SSAFY 서울 13반</p>
          <p>트리폴린</p>
          <a class="text-white border-t solid underline cursor-pointer" @click="showAlert"
            >도와주신분들</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
