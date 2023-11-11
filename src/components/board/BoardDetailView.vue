<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleDetail, deleteArticle } from '@/api/board.js'

const route = useRoute()
const router = useRouter()

const articleId = route.params.articleId

const article = ref({})

onMounted(() => {
  getArticle()
})

const getArticle = () => {
  console.log(articleId + '번글 얻으러 가자!!!')
  // API 호출
  articleDetail(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 얻어오기 완료', data)
      article.value = data.article
    },
    (error) => {
      console.log('글 얻어오기 실패', error)
    }
  )
}

function moveList() {
  router.push({ name: 'board-list' })
}

function moveModify() {
  router.push({ name: 'board-update', params: { articleId } })
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleId + '번글 삭제하러 가자!!!')
  // API 호출
  deleteArticle(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 삭제 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      console.log('글 삭제 실패', error)
    }
  )
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ article.articleId }}. {{ article.articleTitle }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">안효인</span> <br />
                <span class="text-secondary fw-light">
                  {{ article.registerTime }}1 조회 : {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 17</div>

          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
