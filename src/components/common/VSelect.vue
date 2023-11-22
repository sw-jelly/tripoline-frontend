<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

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
  notice: {
    type: Boolean,
    default: false
  },
  review: {
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

// onMounted(() => {
//   console.log(prop.notice)
//   if (!prop.notice) {
//     Options.value = prop.selectOption
//   } else {
//     Options.value = computedOption
//   }
// })

// 읽기면 전체 선택가능
// 쓰기면 관리자만 선택가능

const computedOption = computed(() => {
  if (!prop.notice) {
    return prop.selectOption
  } else if (prop.review) {
    return prop.selectOption
  } else if (userInfo.value.memberRole === 0) {
    return prop.selectOption
  } else {
    return prop.selectOption.filter((option) => option.value !== 2)
  }
})
</script>

<template>
  <select
    v-model="key"
    @change="onSelect"
    class="form-select form-select-sm me-2 mb-2"
    aria-label="검색조건"
    :disabled="readonly"
  >
    <option
      v-for="option in computedOption"
      :value="option.value"
      :key="option.value"
      :disabled="option.value === 'all'"
      :selected="option.value === 4"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped></style>
