<script setup>
import { ref, watch } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps({ planDetails: Array, readonly: Boolean })
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
    console.log('watch', newVal)
    if (newVal == undefined) {
      clonedPlanDetails.value = []
      return
    }
    clonedPlanDetails.value = [...newVal]
  },
  { deep: true }
)
</script>

<template>
  <a-timeline>
    <div v-if="clonedPlanDetails.length === 0" class="text-center">
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
              <p>{{ index + 1 }}</p>
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
