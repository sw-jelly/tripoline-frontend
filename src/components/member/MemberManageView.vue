<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getFavoriteListByMemberId, deleteFavorite } from '@/api/favorite'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
const { userUpdate, userWithDrawal, getUserInfo, uploadImage } = memberStore
import { useRouter } from 'vue-router'
import VSelect from '@/components/common/VSelect.vue'
const { VITE_IMGBB_API } = import.meta.env
const router = useRouter()
const user = ref({})
import { searchSido, searchGugun } from '@/api/attraction'

onMounted(() => {
  user.value = JSON.parse(JSON.stringify(userInfo.value))
  getSidoList()
  onChangeSido(user.value.sidoCode)
  getFavoriteList()
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
  formData.append('key', VITE_IMGBB_API)
  formData.append('image', selectedFile.value[0])
  // formData.append('memberId', user.value.memberId)
  await uploadImage(formData, userInfo.value.memberId)
}
const readonly = ref(true)

const attractions = ref([])
const getFavoriteList = () => {
  getFavoriteListByMemberId(
    userInfo.value.memberId,
    ({ data }) => {
      attractions.value = data
      console.log('attractions.value', attractions.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const goToAttractionPage = () => {
  router.push({ name: 'attraction' })
}

const deleteFavoriteItem = (item) => {
  console.log('item', item)

  deleteFavorite(
    item.favoriteId,
    () => {
      alert('삭제되었습니다.')
      getFavoriteList()
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<template>
  <div class="flex flex-1">
    <div class="flex flex-col" style="width: 45%">
      <div class="flex items-center justify-center">
        <h2 class="my-3 py-3 text-center">내 정보</h2>
      </div>
      <!-- 테일윈드식으로 사용자 정보 테이블형식으로 보여주기 -->
      <div class="flex flex-col w-1/3 mx-auto justify-center">
        <!-- 사용자 정보 표시할 테이블 -->
        <div class="flex flex-col items-center justify-center">
          <img
            v-if="userInfo.memberPhoto"
            :src="`${userInfo.memberPhoto}`"
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

    <div style="width: 55%">
      <div class="flex items-center">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png"
          alt="Heart with Arrow"
          width="50"
          height="50"
          class="mb-[10px]"
        />
        <h2>&nbsp;찜한 관광지&nbsp;</h2>
        <PlusCircleOutlined style="font-size: 20px" @click="goToAttractionPage" />
      </div>
      <a-list
        class="border border-solid border-gray-300 rounded"
        item-layout="horizontal"
        :data-source="attractions"
        style="width: 80%; height: 60%; overflow-y: scroll; margin-top: 10px"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta style="font-size: 13px" :description="item.addr1">
              <template #title>
                <div style="font-size: 20px; display: flex; justify-content: space-between">
                  {{ item.title }}
                  <DeleteOutlined @click="deleteFavoriteItem(item)" style="margin-right: 10px" />
                </div>
              </template>
              <template #avatar>
                <a-avatar :src="item.firstImage" style="width: 50px; height: 50px" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<style scoped>
.ant-spin-container .ant-list-items {
  height: 60%;
  overflow-y: scroll;
  margin-top: 10px;
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
}

* {
  font-family: 'pretendard', sans-serif !important;
}
</style>
