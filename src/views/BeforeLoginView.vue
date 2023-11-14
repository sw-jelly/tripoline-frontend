<script setup></script>

<template>
  <div class="flex flex-col w-full h-full bg-stone-300 justify-center items-center">
    <div class="flex flex-row items-center mx-auto">
      <h1 class="title">
        <span class="title-item">T</span>
        <span class="title-item">R</span>
        <span class="title-item">I</span>
        <span class="title-item">P</span>
        <span class="title-item">O</span>
        <span class="title-item">L</span>
        <span class="title-item">I</span>
        <span class="title-item">N</span>
        <span class="title-item">E</span>
      </h1>
      <img src="@/assets/T-rex.png" alt="logo" />
    </div>
    <div class="flex justify-center mt-10">
      <button
        class="bg-white hover:bg-stone-400 w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
      >
        <RouterLink class="nav-link" :to="{ name: 'member-login' }">로그인</RouterLink>
      </button>
      <button
        class="bg-white hover:bg-stone-400 w-[200px] mx-auto text-black font-bold py-2 px-4 rounded"
      >
        <RouterLink class="nav-link" :to="{ name: 'member-regist' }">회원가입</RouterLink>
      </button>
    </div>
  </div>
</template>

<style>
.title {
  color: white;
  font-size: 80px;
  display: flex;
  gap: 8px;
}

.title-item {
  position: relative;

  animation: bounce 0.8s ease infinite alternate;
}
.title-item:nth-child(2) {
  animation-delay: 0.1s;
}
.title-item:nth-child(3) {
  animation-delay: 0.2s;
}
.title-item:nth-child(4) {
  animation-delay: 0.3s;
}
.title-item:nth-child(5) {
  animation-delay: 0.4s;
}
.title-item:nth-child(6) {
  animation-delay: 0.5s;
}
.title-item:nth-child(7) {
  animation-delay: 0.6s;
}
.title-item:nth-child(8) {
  animation-delay: 0.7s;
}
.title-item:nth-child(9) {
  animation-delay: 0.8s;
}

@keyframes bounce {
  100% {
    transform: translateY(-40px);
  }
}
</style>
