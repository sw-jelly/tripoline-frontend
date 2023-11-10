<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.categoryId }}</th>
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
    <td>{{ article.registerTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
