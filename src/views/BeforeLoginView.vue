<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { useMenuStore } from '@/stores/menu'

const router = useRouter()
const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore
const { changeMenuState } = useMenuStore()

const loginUser = ref({
  memberId: '',
  memberPassword: ''
})

const login = async () => {
  console.log('login ing!!!! !!!')
  await userLogin(loginUser.value)
  console.log('loginInfo', loginUser.value)
  let token = sessionStorage.getItem('accessToken')
  console.log('111. ', token)
  console.log('isLogin: ', isLogin)
  if (isLogin) {
    console.log('로그인 성공아닌가???')
    getUserInfo(token)
    changeMenuState()
  }
  router.push('/')
}
const loginshow = ref(false)
const signupshow = ref(false)
</script>

<template>
  <div class="absolute flex flex-col w-screen h-screen bg-stone-300">
    <div class="relative flex flex-col w-full top-1/3 items-center justify-start h-[100px]">
      <Transition :duration="550" name="nested">
        <div class="flex justify-center items-center" v-show="!loginshow && !signupshow">
          <h1 class="title">
            <span class="title-item">T</span>
            <span class="title-item">R</span>
            <span class="title-item">I</span>
            <span class="title-item">P</span>
            <span class="title-item">O</span>
            <span class="title-item">L</span>
            <span class="title-item">I</span>
            <span class="title-item">N</span>
            <span class="title-item">E</span>
          </h1>
          <img src="@/assets/T-rex.png" alt="logo" />
        </div>
      </Transition>
    </div>
    <div class="relative top-1/2 flex w-full justify-center items-center h-[50px]">
      <button
        class="bg-white hover:bg-stone-400 w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
        @click="loginshow = !loginshow"
      >
        로그인
      </button>
      <Transition class="w-[500px] h-[500px] bg-white rounded" :duration="250" name="nested">
        <form class="absolute p-[50px] flex flex-col justify-evenly" v-show="loginshow">
          <div
            class="absolute right-[15px] top-[15px] cursor-pointer"
            @click="loginshow = !loginshow"
          >
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              X
            </button>
          </div>
          <h1 class="text-center text-2xl">로그인</h1>
          <input
            class="rounded"
            type="text"
            :memberId="loginUser.memberId"
            @click="loginUser.memberId = $event.target.value"
            placeholder="아이디를 입력해주세요"
            required
          />
          <input
            class="rounded"
            type="password"
            :memberPassword="loginUser.memberPassword"
            @click="loginUser.memberPassword = $event.target.value"
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <button type="button" class="login w-full" @click="login">로그인</button>

          <a href="#">비밀번호가 기억이 안나나요?</a>
          <hr />
          <button class="create-account">회원가입 하러 가기</button>
        </form>
      </Transition>
      <button
        class="bg-white hover:bg-stone-400 w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
        @click="signupshow = !signupshow"
      >
        회원가입
      </button>
      <Transition class="w-[500px] h-[500px] bg-white rounded" :duration="250" name="nested">
        <form class="absolute p-[50px] flex flex-col justify-evenly" v-show="signupshow">
          <div
            class="absolute right-[15px] top-[15px] cursor-pointer"
            @click="signupshow = !signupshow"
          >
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              X
            </button>
          </div>
          <h1 class="text-center text-2xl">회원가입</h1>
          <input class="rounded" type="text" placeholder="아이디를 입력해주세요" required />
          <input class="rounded" type="password" placeholder="비밀번호를 입력해주세요" required />
          <RouterLink :to="{ name: 'home' }"
            ><button class="login w-full">회원가입하기</button></RouterLink
          >
          <a href="#">소셜로그인???</a>
          <hr />
          <button class="create-account">소셜로그인???</button>
        </form>
      </Transition>
      <!-- <button
        class="bg-white hover:bg-stone-400 w-[200px] mx-auto text-black font-bold py-2 px-4 rounded"
      >
        <RouterLink class="nav-link" :to="{ name: 'member-regist' }">회원가입</RouterLink>
      </button> -->
    </div>
  </div>
</template>

<style scoped>
form input {
  margin-top: 12px;
  border-width: 1px;
  border-color: black;
  border-style: solid;
  outline: none;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

form input:focus {
  border: 1.8px solid #1877f2;
}

.login {
  outline: none;
  border: none;
  background: #1877f2;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  color: #fff;
}

form .login:hover {
  background: #0f71f1;
  cursor: pointer;
}

form a {
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  padding-top: 0.8rem;
  color: #1877f2;
}

form hr {
  background: #f7f7f7;
  margin: 1rem;
}

form .create-account {
  outline: none;
  border: none;
  background: #06b909;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  color: #fff;
  width: 75%;
  margin: 0 auto;
}

form .create-account:hover {
  background: #03ad06;
  cursor: pointer;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

.title {
  color: white;
  font-size: 80px;
  display: flex;
  gap: 8px;
}

.title-item {
  position: relative;

  animation: bounce 0.8s ease infinite alternate;
}
.title-item:nth-child(2) {
  animation-delay: 0.1s;
}
.title-item:nth-child(3) {
  animation-delay: 0.2s;
}
.title-item:nth-child(4) {
  animation-delay: 0.3s;
}
.title-item:nth-child(5) {
  animation-delay: 0.4s;
}
.title-item:nth-child(6) {
  animation-delay: 0.5s;
}
.title-item:nth-child(7) {
  animation-delay: 0.6s;
}
.title-item:nth-child(8) {
  animation-delay: 0.7s;
}
.title-item:nth-child(9) {
  animation-delay: 0.8s;
}

@keyframes bounce {
  100% {
    transform: translateY(-40px);
  }
}
</style>
