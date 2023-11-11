<script setup>
defineProps({ comment: Object })
</script>

<template>
  <div id="comment" class="m-3">
    <div class="d-flex justify-content-between align-items-center">
      <p class="mb-1 h5">{{comment.memberName}} <span class="small">{{comment.registerTime}}</span></p>
      <a href="#"><i class="fas fa-reply fa-xs"></i><span class="small">reply</span></a>
    </div>
    <p class="mb-0">{{comment.content}}</p>
  </div>
</template>

<style scoped></style>
