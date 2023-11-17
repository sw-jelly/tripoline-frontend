<script setup>
defineProps({ plan: Object })
</script>

<template>
  <router-link
    :to="{ name: 'plan-detail', params: { planId: plan.planId } }"
    class="article-title link-dark"
  >
    <v-card class="mx-auto" min-width="200" max-width="344">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">{{ plan.sidoName }} {{ plan.gugunName }}</div>
          <div class="text-h6 mb-1">{{ plan.planTitle }}</div>
          <div class="text-caption">{{ plan.startDate }} ~ {{ plan.endDate }}</div>
        </div>
      </v-card-item>
    </v-card>
  </router-link>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
