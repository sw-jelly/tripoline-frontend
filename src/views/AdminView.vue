<script setup></script>

<template>
  <div class="flex flex-col flex-1 w-full min-h-full">
    <h2 class="ml-[100px]">어드민페이지</h2>
    <div>컨트롤러 버튼영역 (회원조회, 관리(탈퇴) 등 )</div>
    <div class="flex flex-row flex-1 bg-red-300">
      <div class="flex flex-grow-1 bg-yellow-300">서브 버튼</div>
      <div class="flex flex-grow-3 bg-blue-500">
        <table class="table table-fixed w-2/3">
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
