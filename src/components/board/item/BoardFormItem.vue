<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { registArticle, articleDetail, updateArticle, likeArticle } from '@/api/board'
import VSelect from '../../common/VSelect.vue'

// router, route setting
const router = useRouter()
const route = useRoute()

// category select options
const boardOptions = ref([
  { text: '카테고리 선택', value: 'all' },
  { text: '자유게시판', value: 1 },
  { text: '공지사항', value: 2 },
  { text: '질문게시판', value: 3 }
])

// getting props
const props = defineProps({ type: String })

const isUseId = ref(false)

const articleId = route.params.articleId
// article Dto setting
const article = ref({
  articleId: 0, // db에서 auto increment
  articleContent: '',
  articleTitle: '',
  categoryId: 0,
  image: '',
  likeCount: 0,
  memberId: '',
  memberName: '',
  viewCount: 0,
  updateTime: new Date(),
  registerTime: new Date()
})

if (props.type === 'modify') {
  let { articleId } = route.params
  console.log(articleId + '번글 얻어와서 수정할거야')
  // API 호출
  isUseId.value = true
}

onMounted(() => {
  if (props.type === 'modify') {
    getArticle()
    console.log(article.value.categoryId)
  }
})

function changeKey(val) {
  console.log('BoardForm에서 선택한 조건 : ' + val)
  article.value.categoryId = val
}

function writeArticle() {
  console.log('글등록하자!!', article.value)
  registArticle(
    article.value,
    ({ data }) => {
      alert('성공적으로 글 등록 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      alert('글 등록 중 문제 발생', error)
    }
  )
}

const getArticle = () => {
  console.log(articleId + '번글 얻으러 가자!!!')
  // API 호출
  articleDetail(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 얻어오기 완료', data)
      article.value = data
    },
    (error) => {
      console.log('글 얻어오기 실패', error)
    }
  )
}

const update = () => {
  console.log(article.value.articleId + '번글 수정하자!!', article.value)
  // API 호출
  updateArticle(
    article.value,
    ({ data }) => {
      alert('성공적으로 글 수정 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      alert('글 수정 중 문제 발생', error)
    }
  )
}

function moveList() {
  router.push({ name: 'board-list' })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="categoryId" class="form-label">게시판 분류 : </label>
      <VSelect :selectOption="boardOptions" @onKeySelect="changeKey" />
    </div>
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.memberId"
        :disabled="isUseId"
        placeholder="작성자ID..."
      />
    </div>
    <div class="mb-3">
      <label for="subject" class="form-label">제목 : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.articleTitle"
        placeholder="제목..."
      />
    </div>

    <div class="mb-3">
      <label for="member_name" class="form-label">이름 : </label>
      <input type="text" class="form-control" v-model="article.memberName" placeholder="이름..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="article.articleContent" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button
        type="submit"
        class="btn btn-outline-primary mb-3"
        v-if="type === 'regist'"
        @click="writeArticle"
      >
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" @click="update" v-else>
        글수정
      </button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
