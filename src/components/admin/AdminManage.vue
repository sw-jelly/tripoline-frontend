<script setup>
import { ref, onMounted } from 'vue'
const { VITE_LIST_SIZE } = import.meta.env
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import PageNavigation from '@/components/common/PageNavigation.vue'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)
import { searchAll } from '@/api/member.js'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
const { adminWithDrawal } = memberStore
import { AdminCategoryEnum } from '@/Enums/Enum.js'

const modify = ref('main')
const route = useRoute()

const members = ref()
const currentPage = ref(0)
const totalPage = ref(0)

const param = ref({
  interval: parseInt(VITE_LIST_SIZE),
  pageNo: currentPage.value,
  key: '',
  word: ''
})

const selectedList = ref([])

const getMembers = async () => {
  await searchAll(param.value, ({ data }) => {
    members.value = data.members
    currentPage.value = data.page.pageNo
    totalPage.value = Math.ceil(data.page.total / parseInt(VITE_LIST_SIZE))
  })
}

onMounted(() => {
  getMembers()
  modify.value = route.params.modify
  console.log(route.params.modify)
})

watch(
  () => route.params.modify,
  (newModify, oldModify) => {
    modify.value = newModify
    // 변경된 값에 대한 추가 로직 수행
  }
)

const addList = (e) => {
  const userId = e.target.value

  // 체크박스가 선택됐다면 추가, 해제됐다면 리스트에서 삭제
  if (e.target.checked) {
    // 이미 선택된 유저가 아닌 경우에만 추가
    if (!selectedList.value.includes(userId)) {
      selectedList.value.push(userId)
    }
  } else {
    // 선택 해제 시 해당 유저를 selectedList에서 제거
    const index = selectedList.value.indexOf(userId)
    if (index !== -1) {
      selectedList.value.splice(index, 1)
    }
  }

  console.log('현재 선택된 유저들', selectedList.value)
}

const deleteMember = async () => {
  try {
    // adminWithDrawal이 완료될 때까지 기다림
    await adminWithDrawal(selectedList.value)

    // adminWithDrawal이 완료된 후에 실행될 코드
    getMembers()
    selectedList.value = []
  } catch (error) {
    console.error('에러 발생:', error)
  }
}
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <caption class="text-2xl">
      {{
        AdminCategoryEnum[route.params.modify]
          ? AdminCategoryEnum[route.params.modify]
          : '사용자조회'
      }}
    </caption>
    <table class="table text-center table-striped table-hover">
      <thead class="border table-success">
        <tr>
          <th scope="col">순번</th>
          <th scope="col">사용자 사진</th>
          <th scope="col">사용자아이디</th>
          <th scope="col">사용자닉네임</th>
          <th scope="col">이메일</th>
          <th scope="col">전화번호</th>
          <th scope="col">사용자성별</th>
          <th scope="col" v-if="modify === 'modify'">사용자삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="selectedList.length > 0">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>선택된 유저수 {{ selectedList.length }}</td>
          <td v-if="modify === 'modify'">
            <button class="btn btn-danger" @click="deleteMember">삭제</button>
          </td>
        </tr>
        <tr v-for="(member, index) in members" :key="member.memberId">
          <td>{{ index + 1 }}</td>
          <td><img :src="member.memberPhoto" width="100" height="auto" /></td>
          <td>{{ member.memberId }}</td>
          <td>{{ member.memberName }}</td>
          <td>{{ member.memberEmail }}</td>
          <td>{{ member.memberGender }}</td>
          <td>{{ member.memberGender }}</td>
          <td v-if="modify === 'modify'">
            <input
              type="checkbox"
              :disabled="member.memberId === 'admin'"
              @click="addList"
              :value="member.memberId"
            />
          </td>
        </tr>
        <!-- <tr>
          <td>1</td>
          <td>아이디</td>
          <td>이름</td>
          <td>성별</td>
        </tr>
        <tr>
          <td>여기는</td>
          <td>데이터</td>
          <td>데이터</td>
          <td>데이터</td>
        </tr>
        <tr>
          <td>여기는</td>
          <td>데이터</td>
          <td>데이터</td>
          <td>데이터</td>
        </tr> -->
      </tbody>
    </table>

    <PageNavigation
      :currentPage="currentPage"
      :total-page="totalPage"
      @page-change="onPageChange"
    ></PageNavigation>
  </div>
</template>

<style scoped></style>
