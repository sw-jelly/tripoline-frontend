<!-- <script setup>
import Tiptap from '@/components/Tiptap/Tiptap.vue'
</script>

<template>
  <div>
    <Tiptap />
  </div>
</template>

<style scoped></style> -->

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
      article.value.likeCount += 1
      // getArticle()
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
  <div class="flex flex-col flex-1">
    <div class="flex flex-col w-4/6 h-full mx-auto">
      <div id="categoryContainer">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">글 상세 보기</h2>
      </div>
      <div id="boardContents">
        <div id="boardHeader" class="flex flex-col bg-stone-300">
          <h1 class="text-2xl">게시판 : 게시판분류</h1>
          <h1 class="text-2xl">제목 : {{ article.articleTitle }}</h1>
          <div class="flex justify-between">
            <div class="flex justify-center flex-start">
              작성자 : {{ article.memberName }}
              <div class="flex flex-col items-center">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                  width="30"
                />
                {{ article.registerTime }}
              </div>
            </div>
            <div class="flex items-center gap-[10px]">
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eye.png"
                alt="Eye"
                width="25"
                height="25"
              />
              <p>{{ article.viewCount }}</p>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Writing%20Hand%20Medium-Light%20Skin%20Tone.png"
                alt="Writing Hand Medium-Light Skin Tone"
                width="25"
                height="25"
              />
              <p>{{ comments.length }}</p>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up.png"
                alt="Thumbs Up"
                width="25"
                height="25"
                @click="like"
              />
              <p class="pr-[10px]">{{ article.likeCount }}</p>
            </div>
          </div>
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

        <div class="w-full h-full px-[10px] py-[10px]">
          <textarea
            class="w-full h-[300px] border-[1px] border-black border-solid rounded p-[15px]"
            readonly="true"
            v-model="article.articleContent"
          >
          </textarea>
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <div class="flex justify-center gap-[15px]">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
            @click="moveList"
          >
            글목록
          </button>
          <button
            type="button"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 ms-1"
            @click="moveModify"
          >
            글수정
          </button>
          <button
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3 ms-1"
            @click="onDeleteArticle"
          >
            글삭제
          </button>
        </div>
        <div class="flex flex-col">
          <h4>댓글</h4>
          <div class="flex mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="댓글을 작성하세요"
              v-model="comment.content"
            />
            <button class="btn btn-primary ms-2 col-1" @click="registerComment">등록</button>
          </div>
        </div>
        <div v-if="comments.length > 0" class="flex flex-col">
          <BoardCommentItem
            class="flex flex-col"
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
  <!-- <Footer /> -->
</template>

<style scoped></style>
