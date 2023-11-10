<script setup>
import { ref } from 'vue'

defineProps({
  selectOption: {
    type: Array
  }
})

const emit = defineEmits(['onKeySelect'])

const key = ref('all')

const onSelect = () => {
  console.log(key.value + '선택!!')
  emit('onKeySelect', key.value)
}
</script>

<template>
  <select
    v-model="key"
    @change="onSelect"
    class="form-select form-select-sm ms-5 me-1 w-50"
    aria-label="검색조건"
  >
    <option
      v-for="option in selectOption"
      :value="option.value"
      :key="option.value"
      :disabled="option.value === 'all'"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped></style>
