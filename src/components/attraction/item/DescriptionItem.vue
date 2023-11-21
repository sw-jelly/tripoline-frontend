<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ info: Object, isPlan: Boolean })
const emit = defineEmits(['addPlanDetail'])

let planDetail = ref({
  contentId: 0,
  planDetailId: -1,
  visitOrder: 0,
  title: null,
  addr1: null,
  visitDate: null,
  memo: null
})

const addPlanDetail = () => {
  planDetail.value.contentId = props.info.contentId
  planDetail.value.title = props.info.title
  planDetail.value.addr1 = props.info.addr1
  emit('addPlanDetail', planDetail.value)
}
</script>

<template>
  <div class="modal fade" id="descriptionView">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="container">
          <div class="card">
            <img :src="props.info.firstImage" />
            <div class="card_details">
              <div class="name">{{ props.info.title }}</div>
              <p>{{ props.info.overview }}</p>
            </div>
            <div v-if="props.isPlan" class="d-flex align-items-center">
              <button class="btn btn-success" @click="addPlanDetail" data-bs-dismiss="modal">
                계획에 추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#descriptionModal .modal-dialog {
  width: fit-content;
  margin-top: 10%;
}

.card img {
  width: 100%;
  border-radius: 12px;
  /* height: 214px; */
  object-fit: cover;
}

.card {
  /* Change background color */
  background-color: white;
  /* Add border */
  border: 1px solid #bacdd8;
  /* Add space between the border and the content */
  padding: 8px;
  border-radius: 12px;
}

.tag {
  padding: 4px 8px;
  border: 1px solid #e5eaed;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #788697;
}

.name {
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
}

p {
  font-size: 14px;
  color: #7f8c9b;
  line-height: 150%;
}
</style>
