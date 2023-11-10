<script setup></script>

<template>
  <div class="container-xxl vh-100">
    <div
      class="authentication-wrapper authentication-basic container-p-y position-absolute top-50 start-50 translate-middle"
      style="width: 800px"
    >
      <div class="authentication-inner">
        <!-- Register -->
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center">
              <a href="${root}/index.jsp" class="app-brand-link gap-2">
                <span class="app-brand-logo demo">
                  <img src="@/assets/flight.png" alt="브랜드로고" width="100px" />
                </span>
              </a>
            </div>
            <!-- /Logo -->
            <h4 class="mb-2">Enjoy Trip에 오신걸 환영합니다 👋</h4>
            <p class="mb-4">여행이 함께하는 곳, 새로운 여행을 경험해보세요</p>

            <form id="form-login" class="mb-3" method="POST" action="">
              <input type="hidden" name="action" value="login" />
              <div class="mb-3">
                <label for="userid" class="form-label">사용자 아이디를 입력해주세요</label>
                <input
                  type="text"
                  class="form-control"
                  id="userid"
                  name="userid"
                  placeholder="아이디를 입력해주세요"
                  value="${saveid}"
                  autofocus
                />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="userpwd">비밀번호</label>
                  <a href="${root}/user/findPassword.jsp">
                    <small>비밀번호가 기억이 안나시나요?</small>
                  </a>
                </div>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="userpwd"
                    class="form-control"
                    name="userpwd"
                    placeholder="비밀번호를 입력해주세요"
                    aria-describedby="password"
                  />
                  <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="saveid"
                    value="ok"
                    name="saveid"
                  />
                  <label class="form-check-label" for="saveid"> 아이디 기억하기 </label>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" id="btn-login" type="button">
                  로그인
                </button>
              </div>
            </form>

            <p class="text-center">
              <span>Enjoy Trip이 처음이세요?</span>
              <a href="${root}/user/register.jsp">
                <span>회원 가입 하러 가기</span>
              </a>
            </p>
          </div>
        </div>
        <!-- /Register -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
