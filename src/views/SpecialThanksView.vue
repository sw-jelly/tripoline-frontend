<script setup></script>

<template>
  <div class="flex flex-1 w-full h-full justify-center items-center text-center bg-stone-300">
    <!-- We make a wrap around all of the content so that we can simply animate all of the content at the same time. I wanted a zoomIn effect and instead of placing the same class on all tags, I wrapped them into one div! -->
    <div class="flex flex-col">
      <div :class="{ 'slide-up': showContent }">
        <h1>Thank you!</h1>
        <br />
        <h2>7월부터 시작된 싸피여정이 벌써 절반이 지나갔습니다</h2>
        <h2>
          많이 부족했지만 지난 한 학기 동안 함께 프로젝트 같이 진행했던 SSAFY 서울 13반 승우, 민지,
          동훈이형 페어에게 감사합니다
        </h2>
        <h1>그리고 이번 관통 마지막 날까지 밤 늦게 고생해준 유경이도 너무 고마워</h1>
        <h1>1학기 동안 교육 열심히 진행해주신 친절한 김강사 님에게도 감사합니다</h1>
        <h1>마지막으로 서울 13반 모두 고맙습니다!!</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 1s ease;
}
</style>
