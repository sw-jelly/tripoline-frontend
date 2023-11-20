<script setup>
import { ref } from 'vue'

const prop = defineProps({
  selectOption: {
    type: Array
  },
  select: {
    type: String,
    default: 'all'
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onKeySelect'])

const key = ref(prop.select)

const onSelect = () => {
  console.log(key.value + '선택!!')
  emit('onKeySelect', key.value)
}
</script>

<template>
  <select
    v-model="key"
    @change="onSelect"
    class="form-select form-select-sm me-2 w-50"
    aria-label="검색조건"
    :disabled="readonly"
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
