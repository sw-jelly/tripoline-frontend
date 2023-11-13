<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  articleDetail,
  deleteArticle,
  getComments,
  registComment,
  likeArticle
} from '@/api/board.js'

import BoardCommentItem from '@/components/board/item/BoardCommentItem.vue'

const route = useRoute()
const router = useRouter()

const articleId = route.params.articleId

const article = ref({})
const comments = ref([])

const comment = ref({
  commentId: 0,
  articleId: 0,
  memberId: 'ssafy',
  memberName: 'ssafy',
  content: '',
  registerTime: ''
})

onMounted(() => {
  getArticle()
  getArticleComments()
})

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

const getArticleComments = () => {
  console.log(articleId + '번글 댓글 얻으러 가자!!!')
  // API 호출
  getComments(
    articleId,
    ({ data }) => {
      console.log('성공적으로 댓글 얻어오기 완료', data)
      comments.value = data
    },
    (error) => {
      console.log('댓글 얻어오기 실패', error)
    }
  )
}

const like = () => {
  likeArticle(
    articleId,
    ({ data }) => {
      console.log(data)
      getArticle()
    },
    (error) => {
      console.log('좋아요 실패', error)
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

function registerComment() {
  console.log('댓글 달러가자! 댓글 :', comment.value)
  comment.value.articleId = articleId
  registComment(
    comment.value,
    ({ data }) => {
      console.log('성공적으로 댓글 등록 완료', data)
      getArticleComments(articleId) // 새로운 댓글 가져오기
      comment.value.content = ''
    },
    (error) => {
      alert('댓글 등록 중 문제 발생', error)
    }
  )
}

function updateComment() {
  console.log('댓글 수정하자!')
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
          <h2>{{ article.articleTitle }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">{{ article.memberName }}</span> <br />
                <span class="text-secondary fw-light">
                  {{ article.registerTime }} 조회 : {{ article.viewCount }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : {{ comments.length }}</div>
          <button class="btn btn-primary ms-2 col-1" @click="like">좋아요</button>

          <div class="divider mb-3"></div>
          <textarea class="form-control" rows="7" readonly="true" v-model="article.articleContent">
          </textarea>
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
        <h4 class="mt-3 mb-3">댓글</h4>
        <div class="d-flex mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="댓글을 작성하세요"
            v-model="comment.content"
          />
          <button class="btn btn-primary ms-2 col-1" @click="registerComment">등록</button>
        </div>
        <div v-if="comments.length > 0">
          <BoardCommentItem
            v-for="comment in comments"
            :key="comment.commentId"
            :comment="comment"
            @removeComment="getArticleComments"
            @modifyComment="getArticleComments"
          >
          </BoardCommentItem>
        </div>
        <div v-else>
          <h6 class="mt-3 mb-3 text-secondary">등록된 댓글이 없습니다.</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
