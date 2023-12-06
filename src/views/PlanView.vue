<script setup></script>

<template>
  <div
    class="h-full w-full"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
