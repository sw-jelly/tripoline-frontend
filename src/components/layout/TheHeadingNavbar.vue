<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex w-full h-[140px] align-center justify-evenly text-center bg-gray-50">
    <div class="flex items-center">
      <RouterLink :to="{ name: 'main' }">
        <img src="@/assets/flight.png" width="90" />
      </RouterLink>
      <h1 class="text-2xl mx-4">Tripoline</h1>
    </div>
    <div class="flex flex-row items-center">
      <ul>
        <li class="float-left text-lg">
          <a href="#" class="text-decoration-none text-black">공지사항</a>
        </li>
        <li class="float-left ml-[10px] text-lg">
          <RouterLink class="nav-link" :to="{ name: 'board' }">게시판</RouterLink>
        </li>
        <li class="float-left ml-[10px] text-lg">
          <RouterLink class="nav-link" :to="{ name: 'attraction' }">관광지 검색</RouterLink>
        </li>
        <li class="float-left ml-[10px] text-lg">
          <RouterLink class="nav-link" :to="{ name: 'plan' }">여행 계획</RouterLink>
        </li>
      </ul>
      <ul class="mx-10">
        <li class="float-left ml-[10px] text-lg">
          <RouterLink class="nav-link" :to="{ name: 'member-login' }">로그인</RouterLink>
        </li>
        <li class="float-left ml-[10px] text-lg">
          <RouterLink class="nav-link" :to="{ name: 'member-regist' }">회원가입</RouterLink>
        </li>
      </ul>
    </div>

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
    <!-- </div>
    </div> -->
  </nav>
</template>

<style scoped></style>
