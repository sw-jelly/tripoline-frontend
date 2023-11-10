<script setup>

function showAlert(){
  alert('기능 구현 예정')
}
</script>

<template>
  <div class="container-xxl vh-100">
    <div
      class="authentication-wrapper authentication-basic container-p-y position-absolute top-50 start-50 translate-middle"
      style="width: 800px"
    >
    <div class="authentication-inner">
          <!-- Register Card -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center">
                <a href="${root}/index.jsp" class="app-brand-link gap-2">
                  <span class="app-brand-logo demo">
                    <img src="@/assets/flight.png" alt="브랜드로고" :style="{width : '100px'}"/>
                  </span>
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-2">Enjoy Trip에 오신걸 환영합니다 👋</h4>
              <p class="mb-4">Enjoy Trip과 함께해주셔서 감사합니다</p>

          		<form id="form-join" method="POST" action="">
          		<input type="hidden" name="action" value="join" />
                <div class="mb-3">
                  <label for="userid" class="form-label">사용할 아이디를 입력해주세요</label>
                  <input
                    type="text"
                    class="form-control"
                    id="userid"
                    name="userid"
                    placeholder="사용할 아이디를 입력해주세요"
                    autofocus
                  />
                </div>
                                <div class="mb-3">
                  <label for="username" class="form-label">본인의 이름을 입력해주세요</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    placeholder="사용할 이름을 입력해주세요"
                    autofocus
                  />
                </div>
                               
                
                
                <div class="mb-3 form-password-toggle">
                  <div id="result-view" class="d-flex justify-content-between">
                    <label class="form-label" for="userpwd">사용할 비밀번호를 입력해주세요</label>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="userpwd"
                      class="form-control"
                      name="userpwd"
                      placeholder="사용할 비밀번호를 입력해주세요"
                      aria-describedby="password"
                    />                
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>
                
                                <div class="mb-3 form-password-toggle">
                  <div id="resultpw-view" class="d-flex justify-content-between">
                    <label class="form-label" for="pwdcheck">다시한번 사용할 비밀번호를 입력해주세요</label>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="pwdcheck"
                      class="form-control"
                      name="pwdcheck"
                      placeholder="다시한번 사용할 비밀번호를 입력해주세요"
                      aria-describedby="password"
                    />                
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>
                  <div class="input-group input-group-merge">
                <input
                  type="text"
                  class="form-control"
                  id="emailid"
                  name="emailid"
                  placeholder="이메일아이디"
                />
                <span class="input-group-text">@</span>
                <select
                  class="form-select"
                  id="emaildomain"
                  name="emaildomain"
                  aria-label="이메일 도메인 선택"
                >
                  <option selected>선택</option>
                  <option value="ssafy.com">싸피</option>
                  <option value="google.com">구글</option>
                  <option value="naver.com">네이버</option>
                  <option value="kakao.com">카카오</option>
                </select>
              </div>
                
                   <div class="mb-3 mt-3">
                  <button class="btn btn-primary d-grid w-100" id="btn-join" type="button" @click="showAlert">회원 가입</button>
                </div>
                              
			</form>
             

              <p class="text-center">
                <span>이미 가입 하셨나요?</span>
                <a  @click="showAlert">
                  <span>로그인 하러 가기</span>
                </a>
              </p>
            </div>
          </div>
          <!-- Register Card -->
        </div>
    </div>
  </div>
</template>

<style scoped></style>
