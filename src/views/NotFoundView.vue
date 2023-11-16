<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full h-full">
    <RouterLink :to="{ name: 'main' }" class="flex h-full justify-center">
      <img src="@/assets/404cat.jpg" alt="404" class="h-full object-cover" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
