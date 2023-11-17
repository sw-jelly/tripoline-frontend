<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
const { userUpdate, userWithDrawal, getUserInfo } = memberStore
import { useRouter } from 'vue-router'
import VSelect from '@/components/common/VSelect.vue'
const router = useRouter()
const user = ref({})
import { searchSido, searchGugun } from '@/api/attraction'

onMounted(() => {
  user.value = JSON.parse(JSON.stringify(userInfo.value))
  getSidoList()
  onChangeSido(user.value.sidoCode)
})

const sidoList = ref([])
const gugunList = ref([{ text: '구/군 선택', value: 'all' }])

const getSidoList = async () => {
  await searchSido(
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

const onChangeSido = async (val) => {
  user.value.sidoCode = val
  await searchGugun(
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
  user.value.gugunCode = val
}

const userWithDrawl = () => {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    userWithDrawal(
      user.value.memberId,
      () => {
        alert('탈퇴가 완료되었습니다.')
      },
      (error) => {
        alert('탈퇴가 실패하였습니다')
      }
    )
  }
}

const toggleChange = () => {
  if (readonly.value) {
    readonly.value = false
  } else {
    readonly.value = true
  }
}

const userModify = async () => {
  await userUpdate(user.value)
  alert('회원정보 수정이 완료되었습니다.')
  router.push('/member')

  readonly.value = true
}
const readonly = ref(true)
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">내정보</h2>
      </div>
      <div class="col-lg-10">
        <div class="card mt-3 m-auto" style="max-width: 700px">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="https://source.unsplash.com/random/250x250/?food"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body text-start">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item flex">
                    아이디 :
                    <input
                      type="text"
                      class="border rounded"
                      v-model="user.memberId"
                      readonly="readonly"
                      style="background-color: #e9ecef"
                    />
                  </li>
                  <li class="list-group-item flex">
                    이름 :
                    <input
                      type="text"
                      class="border rounded"
                      v-model="user.memberName"
                      :readonly="readonly"
                      :style="readonly ? 'background-color: #e9ecef' : ''"
                    />
                  </li>
                  <li class="list-group-item flex">
                    전화번호 :
                    <input
                      type="text"
                      class="border rounded"
                      v-model="user.memberPhone"
                      :readonly="readonly"
                      :style="readonly ? 'background-color: #e9ecef' : ''"
                    />
                  </li>
                  <li class="list-group-item flex">
                    이메일 :
                    <input
                      type="text"
                      class="border rounded"
                      v-model="user.memberEmail"
                      :readonly="readonly"
                      :style="readonly ? 'background-color: #e9ecef' : ''"
                    />
                  </li>
                  <li class="list-group-item flex">
                    시도 :
                    <VSelect
                      :selectOption="sidoList"
                      :key="user.sidoCode"
                      :select="user.sidoCode"
                      @onKeySelect="onChangeSido"
                      :readonly="readonly"
                    />
                    <!-- <input
                      type="select"
                      class="border rounded" 
                      v-model="user.sidoCode"
                      :readonly="readonly"
                      :style="readonly ? 'background-color: #e9ecef' : ''"
                    /> -->
                  </li>
                  <li class="list-group-item flex">
                    구군 :
                    <VSelect
                      :selectOption="gugunList"
                      :key="user.gugunCode"
                      :select="user.gugunCode"
                      @onKeySelect="onChangeGugun"
                      :readonly="readonly"
                    />
                    <!-- <input
                      type="text"
                      class="border rounded"
                      v-model="user.gugunCode"
                      :readonly="readonly"
                      :style="readonly ? 'background-color: #e9ecef' : ''"
                    /> -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="button" class="btn btn-primary mt-2 mx-10" @click="toggleChange">
            수정
          </button>
          <button type="button" class="btn btn-success mt-2" @click="userModify" v-if="!readonly">
            정보 변경
          </button>
          <button type="button" class="btn btn-danger mt-2 mx-10" @click="userWithDrawl">
            탈퇴
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
