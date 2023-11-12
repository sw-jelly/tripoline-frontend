<script setup>
import { ref, onMounted } from 'vue'
import BoardFormItem from './item/BoardFormItem.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
onMounted(() => {
  let { articleId } = route.params
  console.log('글수정 페이지 진입', articleId)
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글수정</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <BoardFormItem type="modify" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
