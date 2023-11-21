<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import { searchSido, searchGugun } from '@/api/attraction'
import VSelect from '../components/common/VSelect.vue'

const router = useRouter()
const memberStore = useMemberStore()

const { isLogin, userInfo } = storeToRefs(memberStore)
const { userLogin, getUserInfo, userRegist } = memberStore

const loginUser = ref({
  memberId: '',
  memberPassword: ''
})

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])

onMounted(() => {
  getSidoList()
})

const getSidoList = () => {
  searchSido(
    ({ data }) => {
      let options = []
      options.push({ text: '시/도 선택', value: 'all' })
      data.sidos.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode })
      })
      sidoList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const onChangeSido = (val) => {
  User.value.sidoCode = val
  searchGugun(
    { sidoCode: val },
    ({ data }) => {
      let options = []
      options.push({ text: '구/군 선택', value: 'all' })
      data.guguns.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode })
      })
      gugunList.value = options
    },
    (err) => {
      console.log(err)
    }
  )
}

const onChangeGugun = (val) => {
  User.value.gugunCode = val
}

const date = ref()

const User = ref({
  memberId: '',
  memberPassword: '',
  memberName: '',
  memberEmail: '',
  sidoCode: 0,
  gugunCode: 0,
  memberBirthdate: '',
  memberGender: '',
  memberPhone: '',
  memberRole: 1
})

const login = async () => {
  console.log('login ing!!!! !!!')
  await userLogin(loginUser.value)

  let token = sessionStorage.getItem('accessToken')
  await getUserInfo(token)
  router.push('/home')
}

const regist = async () => {
  userRegist(User.value)
  router.go(0)
}

const handleDatePickerChange = (date) => {
  User.value.memberBirthdate = date
}

const loginshow = ref(false)
const signupshow = ref(false)
</script>

<template>
  <div
    class="relative flex flex-col w-full h-full bg-stone-300"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
  >
    <div class="relative flex flex-col w-full top-1/3 items-center justify-start h-[100px]">
      <Transition :duration="550" name="nested">
        <div class="flex justify-center items-center" v-if="!loginshow && !signupshow">
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
        class="bg-blue-500 hover:bg-blue-700 w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
        @click="loginshow = !loginshow"
      >
        로그인
      </button>

      <Transition class="w-[500px] h-[500px] bg-white rounded" :duration="250" name="nested">
        <form
          class="absolute p-[50px] flex flex-col justify-evenly"
          v-show="loginshow"
          @submit.prevent="login"
        >
          <div
            class="absolute right-[15px] top-[15px] cursor-pointer"
            @click="loginshow = !loginshow"
          >
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              X
            </button>
          </div>
          <div class="flex flex-row justify-between items-center">
            <img src="@/assets/T-rex.png" width="80" alt="logo" style="transform: scaleX(-1)" />
            <h1 class="text-center text-2xl">로그인</h1>
            <img src="@/assets/T-rex.png" width="80" alt="logo" />
          </div>

          <input
            class="rounded"
            type="text"
            :memberId="loginUser.memberId"
            @change="loginUser.memberId = $event.target.value"
            placeholder="아이디를 입력해주세요"
            required
          />
          <input
            class="rounded"
            type="password"
            :memberPassword="loginUser.memberPassword"
            @change="loginUser.memberPassword = $event.target.value"
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <button type="button" class="login w-full" @click.prevent="login">로그인</button>

          <a href="#">비밀번호가 기억이 안나나요?</a>
          <hr />
        </form>
      </Transition>
      <button
        class="bg-stone-500 hover:bg-white w-[200px] text-black font-bold py-2 px-4 rounded mr-2"
        @click="signupshow = !signupshow"
      >
        회원가입
      </button>
      <Transition class="flex flex-col flex-1 rounded bg-white" :duration="250" name="nested">
        <form class="absolute bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6" v-if="signupshow">
          <div class="grid gap-4 gap-y-2 text-3xl grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <p class="font-medium text-lg">회원 가입 시작하기</p>
              <p>회원 정보를 입력 후 트리폴린을 시작해보세요</p>
              <img src="@/assets/T-rex.png" alt="logo" style="transform: scaleX(-1)" />
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label for="id">아이디를 입력해주세요 </label>
                  <input
                    name="id"
                    type="text"
                    :memberId="User.memberId"
                    @change="(User.memberId = $event.target.value), checkId"
                    placeholder="아이디를 입력해주세요"
                    required
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div class="md:col-span-5">
                  <label for="name">닉네임을 입력해주세요</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    :memberName="User.memberName"
                    @change="User.memberName = $event.target.value"
                    placeholder="닉네임 입력해주세요"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="password">비밀번호 입력</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="사용할 비밀번호 입력"
                    :memberPassword="User.memberPassword"
                    @change="User.memberPassword = $event.target.value"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">이메일을 입력해주세요</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    :memberEmail="User.memberEmail"
                    @change="User.memberEmail = $event.target.value"
                    placeholder="이메일을 입력해주세요"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">생년월일 입력</label>
                  <a-space direction="vertical" :size="12">
                    <a-date-picker v-model:value="date" @change="handleDatePickerChange" />
                  </a-space>
                </div>
                <div class="md:col-span-5">
                  <label for="gender">성별 입력</label>
                  <select
                    name="gender"
                    id="gender"
                    v-model="User.memberGender"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  >
                    <option value="" disabled>성별 선택</option>
                    <option value="M">남자</option>
                    <option value="W">여자</option>
                  </select>
                </div>
                <div class="md:col-span-5">
                  <label for="email">전화번호 입력</label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    :memberEmail="User.memberPhone"
                    @change="User.memberPhone = $event.target.value"
                    placeholder="전화번호를 입력해주세요"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>
                <!-- <label for="sido">
              <select
                class="rounded"
                name="sido"
                id="sido"
                :sidoCode="User.sidoCode"
                @change="User.sidoCode = $event.target.value"
                required
              >
                <option value="0">시도코드</option>
                <option value="1">강남</option>
                <option value="2">경기</option>
                <option value="3">서울</option>
              </select>
            </label>
            <label for="gugun">
              <select
                class="rounded"
                name="gugun"
                id="gugun"
                :gugunCode="User.gugunCode"
                @change="User.gugunCode = $event.target.value"
                required
              >
                <option value="">강남</option>
                <option value="1">서울</option>
                <option value="2">용인</option>
                <option value="3">시도</option>
              </select>
            </label>
          </div> -->
                <div class="md:col-span-2">
                  <label for="country">사는 지역(시도)</label>
                  <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
                </div>

                <div class="md:col-span-2">
                  <label for="state">사는지역(구군)</label>
                  <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end gap-[10px]">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="regist"
                    >
                      회원가입
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      @click="signupshow = !signupshow"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Transition>
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
