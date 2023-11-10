<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'main' }">
        <img src="@/assets/flight.png" width="100" /> Enjoy Trip
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="#">공지사항</a></li>
          <li class="nav-item"><a class="nav-link" href="${root}/board/list">게시판</a></li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'attraction' }">관광지 검색</RouterLink>
          </li>
        </ul>
        <c:if test="${empty userinfo}">
          <ul class="navbar-nav me-2">
            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'member-login' }">로그인</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal"
                >회원가입</a
              >
            </li>
          </ul>
        </c:if>
        <!-- 로그인 후 -->
        <!-- <c:if test="${!empty userinfo}">
          <ul class="navbar-nav me-2">
            <li class="nav-item me-5"><a class="nav-link" id="welcome"></a></li>
            <li class="nav-item">
              <a class="nav-link" href="${root}/user?action=logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#mypageModal"
                >마이페이지</a
              >
            </li>
          </ul>
        </c:if> -->
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
