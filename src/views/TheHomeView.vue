<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="vh-100 text-white rounded">
    <video
      style="width: 100%; height: 100%; object-fit: cover"
      autoplay
      muted
      loop
      data-aos="fade-in"
      src="@/assets/video/cherry.mp4"
      type="video/mp4"
    ></video>
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <h2 data-aos="fade-up" data-aos-delay="100">
            <span id="Mainelement"></span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">지금 찾아보세요</p>
        </div>
      </div>
    </div>
  </div>
</template>
