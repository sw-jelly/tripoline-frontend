<script setup></script>

<template>
  <div
    class="flex flex-1 flex-col min-h-full"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :delay="200"
  >
    <router-view></router-view>
  </div>
</template>

<style></style>
