<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { totalArticleList, categoryArticleList } from '@/api/board.js'
import { bestArticleList } from '@/api/board.js'
import { BoardCategoryEnum } from '@/Enums/Enum.js'

import VSelect from '@/components/common/VSelect.vue'
import BoardListItem from '@/components/board/item/BoardListItem.vue'
import PageNavigation from '@/components/common/PageNavigation.vue'
const route = useRoute()
const router = useRouter()

const { VITE_LIST_SIZE, VITE_ARTICLE_NAVIGATION_SIZE } = import.meta.env

/**
 * 글 검색조건
 */
const selectOption = ref([
  { text: '검색조건', value: 'all' },
  { text: '글번호', value: 'article_id' },
  { text: '제목', value: 'article_title' },
  { text: '작성자로 조회', value: 'member_id' }
])

/**
 * 카테고리별 검색조건
 */
const categoryOption = ref([
  { text: '게시판 선택', value: 'all' },
  { text: '자유게시판', value: 1 },
  { text: '공지사항', value: 2 },
  { text: '질문게시판', value: 3 },
  { text: '여행 후기', value: 4 }
])

/**
 * 검색, 데이터 출력을 위한 반응형 변수
 */
const articles = ref([])
const currentPage = ref(0)
const totalPage = ref(0)
const isBest = ref(false)
const board = ref(0)

const param = ref({
  interval: parseInt(VITE_LIST_SIZE),
  pageNo: currentPage.value,
  key: '',
  word: ''
})

const changeKey = (val) => {
  console.log('BoarList에서 선택한 조건 : ' + val)
  param.value.key = val
}

const getArticleList = () => {
  totalArticleList(
    param.value,
    ({ data }) => {
      console.log('데이터는', data)
      articles.value = data.articles
      currentPage.value = data.page.pageNo
      totalPage.value = Math.ceil(data.page.total / parseInt(VITE_LIST_SIZE))
      isBest.value = false
    },
    (error) => {
      console.log(error)
    }
  )
}

const changeCategory = (val) => {
  console.log('BoarList에서 선택한 조건 : ' + val)
  param.value.categoryId = val
  board.value = val
  categoryArticleList(
    val,
    param.value,
    ({ data }) => {
      console.log('데이터는', data)
      articles.value = data.articles
      currentPage.value = data.page.pageNo
      totalPage.value = Math.ceil(data.page.total / parseInt(VITE_LIST_SIZE))
    },
    (error) => {
      console.log(error)
    }
  )
}

const getBestArticleList = () => {
  console.log('서버에서 베스트글목록 얻어오자!!!', param.value)
  // API 호출
  console.log('param.value', param.value)

  bestArticleList(
    param.value,
    ({ data }) => {
      console.log('데이터는', data)
      if (data) {
        articles.value = data.articles
        currentPage.value = data.page.pageNo
        totalPage.value = 1 + (data.page.total - 1) / parseInt(VITE_LIST_SIZE)
        isBest.value = true
      } else {
        alert('베스트글이 없습니다.')
      }
    },
    (error) => {
      console.log(error)
    }
  )
}

const onPageChange = (val) => {
  console.log(val + '번 페이지로 이동 준비 끝!!!')
  if (currentPage.value !== val) {
    currentPage.value = val
    param.value.pageNo = val

    if (val >= 1 && val <= totalPage.value) {
      getArticleList()
    }
  }
}

const moveDetail = (article) => {
  router.push({ name: 'board-detail', params: { articleId: article } })
}

const moveWrite = () => {
  router.push({ name: 'board-write', params: { planId: 0 } })
}

onMounted(() => {
  if (route.params.key == 2) {
    board.value = route.params.key
    changeCategory(2)
  } else {
    getArticleList()
  }
})
</script>

<template>
  <div>
    <div class="flex flex-col flex-1 items-center">
      <div class="flex flex-col w-2/3">
        <div class="flex flex-row">
          <img
            v-if="board === 2"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Alarm%20Clock.png"
            alt="Alarm Clock"
            width="100"
            height="100"
          />
          <img
            v-else-if="board === 1"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Men%20with%20Bunny%20Ears.png"
            alt="Men with Bunny Ears"
            width="100"
            height="100"
          />
          <img
            v-else-if="board === 3"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Light%20Skin%20Tone.png"
            alt="Man Technologist Light Skin Tone"
            width="100"
            height="100"
          />
          <img
            v-else
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png"
            alt="Airplane"
            width="100"
            height="100"
          />
          <h2 class="my-3 py-3">
            {{ BoardCategoryEnum[board] }}
          </h2>
        </div>
        <div class="flex flex-col h-full w-full">
          <div class="flex items-center justify-center">
            <div class="flex flex-row w-full justify-between">
              <div class="flex">
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-indent"
                  @click="moveWrite"
                >
                  글쓰기
                </button>

                <button
                  v-if="!isBest"
                  type="button"
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-4 border border-gray-400 rounded shadow"
                  @click="getBestArticleList"
                >
                  베스트
                </button>
                <button
                  v-else
                  type="button"
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  @click="getArticleList"
                >
                  일반글
                </button>
                <div>
                  <VSelect :selectOption="categoryOption" @onKeySelect="changeCategory" />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <form class="flex">
                <!-- @onKeySelect="changeKey" -->
                <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    v-model="param.word"
                    placeholder="검색어..."
                  />
                  <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
                </div>
              </form>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <table class="min-w-[1000px] w-full mt-10 bg-stone-50">
              <thead>
                <tr class="text-center h-[50px]">
                  <th scope="col">카테고리</th>
                  <th scope="col">글번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope="col">조회수</th>
                  <th scope="col">좋아요</th>
                  <th scope="col">댓글수</th>
                  <th scope="col">작성일(최종수정일)</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr
                class="text-center bg-white h-[40px] border-y border-solid border-gray-500 hover:bg-stone-200 cursor-pointer"
              >
                <th scope="row">자유게시판</th>
                <th scope="row">1</th>
                <td>제목</td>
                <td>지인성</td>
                <td>10</td>
                <td>10</td>
                <td>2023-03-23</td>
              </tr>
              <tr class="text-center bg-white h-[40px] border-y border-solid border-gray-500">
                <th scope="row">자유게시판</th>
                <th scope="row">1</th>
                <td>제목입니당구리</td>
                <td>지인성</td>
                <td>10</td>
                <td>10</td>
                <td>2023-03-23</td>
              </tr> -->
                <BoardListItem
                  v-for="article in articles"
                  :key="article.articleNo"
                  :article="article"
                  @moveDetail="moveDetail"
                ></BoardListItem>
              </tbody>
            </table>
            <PageNavigation
              :currentPage="currentPage"
              :total-page="totalPage"
              @page-change="onPageChange"
            ></PageNavigation>
          </div>

          <!-- <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">카테고리</th>
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">좋아요수</th>
              <th scope="col">작성일(최종수정일)</th>
            </tr>
          </thead>
          <tbody>
            <BoardListItem
              v-for="article in articles"
              :key="article.articleNo"
              :article="article"
            ></BoardListItem>
          </tbody>
        </table> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
