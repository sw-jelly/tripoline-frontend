<script setup></script>

<template>
  <div
    class="flex flex-col flex-1 h-full text-start mt-3"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <h1 class="ml-[100px]">My Page</h1>
    <router-view></router-view>
  </div>
</template>

<style></style>
