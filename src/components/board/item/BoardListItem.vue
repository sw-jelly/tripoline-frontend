<script setup>
defineProps({ article: Object })
// enum 불러오기
import { BoardCategoryEnum } from '@/Enums/Enum.js'
import { clsx } from 'clsx'
</script>

<template>
  <tr
    :class="
      clsx({
        'text-center': true,
        'bg-white': article.categoryId !== 2,
        'h-[50px]': true,
        'border-y': true,
        'border-solid': true,
        'border-gray-500': true,
        'hover:bg-stone-200': true,
        'cursor-pointer': true,
        'bg-yellow-100': article.categoryId === 2
      })
    "
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
