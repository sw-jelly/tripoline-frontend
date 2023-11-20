<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
const { userUpdate, userWithDrawal, getUserInfo, uploadProfileImage } = memberStore
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

const selectedFile = ref(null)

const handleFileChange = (e) => {
  selectedFile.value = e.target.files
}

const upload = async () => {
  const formData = new FormData()
  // form에서 선택된 데이터 가져오기
  formData.append('formData', selectedFile.value[0])
  formData.append('memberId', user.value.memberId)
  await uploadProfileImage(formData)
}
const readonly = ref(true)
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="flex items-center justify-center">
      <h2 class="my-3 py-3 text-center">내정보</h2>
    </div>
    <!-- 테일윈드식으로 사용자 정보 테이블형식으로 보여주기 -->
    <div class="flex flex-col w-1/3 mx-auto justify-center">
      <!-- 사용자 정보 표시할 테이블 -->
      <div class="flex flex-col items-center justify-center">
        <img
          v-if="userInfo.memberPhoto"
          :src="`http://localhost:8080/tripoline/assets/img/${userInfo.memberPhoto}`"
          alt="아바타"
          class="rounded-full h-24 w-24"
        />
        <img
          v-else
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
          class="rounded-full"
        />
        <!-- src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" -->

        <form name="form" method="post" enctype="multipart/form-data" @submit.prevent="upload">
          <input
            type="file"
            name="files"
            ref="fileInput"
            @change="handleFileChange"
            multiple="multiple"
          />
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="upload"
          >
            사진 업로드
          </button>
        </form>
      </div>

      <table class="table table-fixed text-start">
        <tbody>
          <tr>
            <th colspan="1" class="bg-light">아이디</th>
            <td colspan="2">
              <input
                type="text"
                class="border rounded"
                v-model="user.memberId"
                readonly="readonly"
                style="background-color: #e9ecef"
              />
            </td>
          </tr>
          <tr>
            <th class="bg-light">닉네임</th>
            <td colspan="2">
              <input
                type="text"
                class="border rounded"
                v-model="user.memberName"
                :readonly="readonly"
                :style="readonly ? 'background-color: #e9ecef' : ''"
              />
            </td>
          </tr>
          <tr>
            <th class="bg-light">전화번호</th>
            <td colspan="2">
              <input
                type="text"
                class="border rounded"
                v-model="user.memberPhone"
                :readonly="readonly"
                :style="readonly ? 'background-color: #e9ecef' : ''"
              />
            </td>
          </tr>
          <tr>
            <th class="bg-light">이메일</th>
            <td colspan="2">
              <input
                type="text"
                class="border rounded"
                v-model="user.memberEmail"
                :readonly="readonly"
                :style="readonly ? 'background-color: #e9ecef' : ''"
              />
            </td>
          </tr>
          <tr>
            <th class="bg-light">거주지(시도)</th>
            <td colspan="2">
              <VSelect
                :selectOption="sidoList"
                :key="user.sidoCode"
                :select="user.sidoCode"
                @onKeySelect="onChangeSido"
                :readonly="readonly"
              />
            </td>
          </tr>
          <tr>
            <th class="bg-light">거주지(구군)</th>
            <td colspan="2">
              <VSelect
                :selectOption="gugunList"
                :key="user.gugunCode"
                :select="user.gugunCode"
                @onKeySelect="onChangeGugun"
                :readonly="readonly"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <button type="button" class="btn btn-primary mt-2 mx-10" @click="toggleChange">수정</button>
      <button type="button" class="btn btn-success mt-2" @click="userModify" v-if="!readonly">
        정보 변경
      </button>
      <button type="button" class="btn btn-danger mt-2 mx-10" @click="userWithDrawl">탈퇴</button>
    </div>
  </div>
</template>

<style scoped></style>
