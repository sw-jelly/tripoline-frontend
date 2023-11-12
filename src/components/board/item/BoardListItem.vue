<script setup>
defineProps({ article: Object })
// enum 불러오기
import { BoardCategoryEnum } from '@/Enums/Enum.js'
</script>

<template>
  <tr class="text-center">
    <!-- boardCategoryEnum에 정의된 매핑된 값 불러오기 -->
    <th scope="row">{{ BoardCategoryEnum[article.categoryId] }}</th>
    <th scope="row">{{ article.articleId }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'board-detail', params: { articleId: article.articleId } }"
        class="article-title link-dark"
      >
        {{ article.articleTitle }}
      </router-link>
    </td>
    <td>{{ article.memberName }}</td>
    <td>{{ article.viewCount }}</td>
    <td>{{ article.likeCount }}</td>
    <td>{{ article.updateTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
