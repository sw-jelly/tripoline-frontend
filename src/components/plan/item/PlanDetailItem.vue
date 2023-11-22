<script setup>
import { ref, watch } from 'vue'
import { deletePlanDetail } from '@/api/plan.js'
import Draggable from 'vuedraggable'

const props = defineProps({ planDetails: Array, readonly: Boolean, index: Number })
const clonedPlanDetails = ref([...props.planDetails])
const emit = defineEmits(['updatePlanDetails'])

const onDragStart = (event) => {
  if (props.readonly) {
    event.preventDefault()
  }
}

const onDragEnd = () => {
  console.log('onDragEnd', clonedPlanDetails.value)
  clonedPlanDetails.value.forEach((planDetail, index) => {
    planDetail.visitOrder = index + 1
  })
  emit('updatePlanDetails', clonedPlanDetails.value)
}

watch(
  () => props.planDetails,
  (newVal) => {
    console.log('watch !@!@', newVal)
    if (newVal == undefined) {
      clonedPlanDetails.value = []
      return
    }
    clonedPlanDetails.value = [...newVal]
  },
  { deep: true }
)

const removePlanDetail = (index) => {
  let target = clonedPlanDetails.value.splice(index, 1)[0]
  let targetId = target.planDetailId
  props.planDetails.splice(index, 1)

  if (targetId == -1) return
  deletePlanDetail(
    targetId,
    () => {
      console.log('성공적으로 계획 상세 삭제 완료')
    },
    (error) => {
      console.log('계획 상세 삭제 실패', error)
    }
  )
}
</script>

<template>
  <a-timeline>
    <div v-if="index == -1" class="text-center">
      <p>날짜를 선택해주세요.</p>
    </div>
    <div v-if="clonedPlanDetails.length === 0 && index > -1" class="text-center">
      <p>추가된 계획이 없습니다.</p>
    </div>
    <div v-else>
      <draggable
        v-model="clonedPlanDetails"
        @start="onDragStart"
        @end="onDragEnd"
        item-key="header"
        :disabled="props.readonly"
      >
        <template v-slot:item="{ element, index }">
          <a-timeline-item class="draggable-item">
            <a-card style="width: 300px">
              
                <p style="display: flex; justify-content: space-between">
                  {{ index + 1 }}<div v-if="!readonly"><a-button danger @click="removePlanDetail(index)">삭제</a-button></div>
                </p>
              <p>{{ element.title }}</p>
              <p>{{ element.addr1 }}</p>
            </a-card>
          </a-timeline-item>
        </template>
      </draggable>
    </div>
  </a-timeline>
</template>

<style scoped>
.draggable-item {
  cursor: grab;
  margin-bottom: 10px;
}
</style>
