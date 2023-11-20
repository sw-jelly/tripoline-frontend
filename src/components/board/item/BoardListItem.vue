<script setup>
defineProps({ article: Object })
// enum 불러오기
import { BoardCategoryEnum } from '@/Enums/Enum.js'
</script>

<template>
  <tr
    class="text-center bg-white h-[50px] border-y border-solid border-gray-500 hover:bg-stone-200 cursor-pointer"
    @click="$emit('moveDetail', article.articleId)"
  >
    <!-- boardCategoryEnum에 정의된 매핑된 값 불러오기 -->
    <th scope="row">{{ BoardCategoryEnum[article.categoryId] }}</th>
    <th scope="row">{{ article.articleId }}</th>
    <td class="text-center">
      {{ article.articleTitle }}
    </td>
    <td>{{ article.memberName }}</td>
    <td>{{ article.viewCount }}</td>
    <td>{{ article.likeCount }}</td>
    <td>{{ article.commentCount }}</td>
    <td>{{ article.updateTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
