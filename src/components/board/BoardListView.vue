<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { totalArticleList, categoryArticleList } from '@/api/board.js'
import { bestArticleList } from '@/api/board.js'

import VSelect from '@/components/common/VSelect.vue'
import BoardListItem from '@/components/board/item/BoardListItem.vue'
import PageNavigation from '@/components/common/PageNavigation.vue'

const router = useRouter()

onMounted(() => {
  getArticleList()
})

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
  { text: '기타게시판', value: 3 }
])

/**
 * 검색, 데이터 출력을 위한 반응형 변수
 */
const articles = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const isBest = ref(false)

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
      articles.value = data.articles
      currentPage.value = data.page.pageNo
      totalPage.value = 1 + (data.page.total - 1) / parseInt(VITE_LIST_SIZE)
      isBest.value = true
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

const moveWrite = () => {
  router.push({ name: 'board-write' })
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글목록</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-6 text-start d-flex justify-content-between">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">
              글쓰기
            </button>

            <button
              v-if="!isBest"
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="getBestArticleList"
            >
              베스트
            </button>
            <button
              v-else
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="getArticleList"
            >
              일반글
            </button>
            <VSelect :selectOption="categoryOption" @onKeySelect="changeCategory" />
          </div>
          <div class="col-md-6">
            <form class="d-flex">
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
        <table class="table table-hover">
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
        </table>
      </div>
      <PageNavigation
        :currentPage="currentPage"
        :total-page="totalPage"
        @page-change="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<style scoped></style>
