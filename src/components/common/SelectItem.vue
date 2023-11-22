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
  },
  description: {
    type: String,
    default: '선택'
  }
})

const emit = defineEmits(['onKeySelect'])

const key = ref(prop.select)

const onSelect = (value) => {
  key.value = value
  console.log(key.value + '선택!!')
  emit('onKeySelect', key.value)
}
</script>

<template>
  <a-form-item>
    <a-select v-model="key" @change="onSelect" :disabled="readonly" :placeholder="description">
      <a-select-option
        v-for="option in selectOption"
        :value="option.value"
        :key="option.value"
        :disabled="option.value === 'all'"
      >
        {{ option.text }}</a-select-option
      >
    </a-select>
  </a-form-item>
</template>

<style scoped></style>
