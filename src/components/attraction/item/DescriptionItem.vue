<script setup>
import { defineProps } from 'vue'

const props = defineProps({ info: Object })
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
