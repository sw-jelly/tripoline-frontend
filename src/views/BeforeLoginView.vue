<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <div class="flex flex-col w-full h-full bg-stone-300 justify-center items-center">
    <div class="flex flex-row items-center mx-auto" v-show="!show">
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
    <div class="flex justify-center items-center mt-10">
      <button
        class="bg-white hover:bg-stone-400 w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
        @click="show = !show"
      >
        로그인
      </button>
      <Transition
        class="absolute w-[500px] h-[500px] bg-white rounded"
        :duration="150"
        name="nested"
      >
        <div v-if="show" class="outer">
          <div class="inner">
            Hello
            <button @click="show = !show">X</button>
          </div>
        </div>
      </Transition>
      <button
        class="bg-white hover:bg-stone-400 w-[200px] mx-auto text-black font-bold py-2 px-4 rounded"
      >
        <RouterLink class="nav-link" :to="{ name: 'member-regist' }">회원가입</RouterLink>
      </button>
    </div>
  </div>
</template>

<style>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}

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
