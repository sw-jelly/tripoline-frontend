import { RouterLink } from 'vue-router';
<template>
  <div class="flex flex-col flex-1 w-full min-h-full">
    <h1 class="ml-[100px]">어드민페이지</h1>
    <div class="flex flex-col justify-center items-center h-[50px]">
      <ul class="flex w-full h-full items-center m-0 justify-start gap-[20px]">
        <li>
          <RouterLink :to="{ name: 'admin-userlist' }" class="no-underline">
            <button class="text-black hover:bg-blue-100 text-2xl">사용자조회</button>
          </RouterLink>
        </li>
        <li>
          <router-link
            :to="{ name: 'admin-userlist', params: { modify: 'modify' } }"
            class="no-underline"
          >
            <button class="text-black hover:bg-blue-100 text-2xl">사용자관리</button>
          </router-link>
        </li>

        <li>
          <router-link to="/admin/notice" class="no-underline">
            <button class="text-black hover:bg-blue-100 text-2xl">공지사항등록</button>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.menu-bar {
  background-color: #f0f0f0;
  padding: 10px;
}

.menu-bar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-bar li {
  display: inline-block;
  margin-right: 10px;
}

.menu-bar li a {
  text-decoration: none;
  color: #333;
  padding: 5px;
}

.menu-bar li a:hover {
  background-color: #ddd;
}
</style>
