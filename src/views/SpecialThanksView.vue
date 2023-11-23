<script setup></script>

<template>
  <div class="flex flex-1 w-full h-full justify-center items-center text-center">
    <div id="wrapper" class="animated zoomIn">
      <!-- We make a wrap around all of the content so that we can simply animate all of the content at the same time. I wanted a zoomIn effect and instead of placing the same class on all tags, I wrapped them into one div! -->
      <h1>
        <!-- The <h1> tag is the reason why the text is big! -->
        <underline>Thank you!</underline>
        <!-- The underline makes a border on the top and on the bottom of the text -->
      </h1>
      <h3>지난 한 학기 동안 함께 프로젝트 진행해준 승우, 민지, 동훈이형 고맙습니다</h3>
      <h3>그리고 이번 관통 마지막 날까지 밤 늦게 고생해준 유경이도 너무 고마워</h3>
    </div>
  </div>
</template>

<style scoped></style>
