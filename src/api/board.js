// API 통신 모아놓기
import { localAxios } from '@/utils/http-commons'

const local = localAxios()

// 책 목록 조회
function totalArticleList(params, success, fail) {
  local.get('boardRest', { params }).then(success).catch(fail)
}

function bestArticleList(params, success, fail) {
  local.get('boardRest/searchBest', { params }).then(success).catch(fail)
}

// 공사중
// function categoryArticleList(params, success, fail) {
//   local.get('boardRest/searchBest', { params }).then(success).catch(fail)
// }

function articleDetail(articleId, success, fail) {
  console.log(articleId)
  local.get(`boardRest/${articleId}`).then(success).catch(fail)
}

function registArticle(article, success, fail) {
  const articleData = JSON.stringify(article);
  console.log('resgistArticle.........',articleData)
  local.post(`boardRest`, articleData).then(success).catch(fail)
}

function deleteArticle(articleId, success, fail) {
  local.delete(`boardRest/${articleId}`).then(success).catch(fail)
}

function likeArticle(articleId, success, fail) {
  local.put(`boardRest/${articleId}`).then(success).catch(fail)
}

function updateArticle(article, success, fail) {
  local.put(`boardRest`, JSON.stringify(article)).then(success).catch(fail)
}

export {
  totalArticleList,
  bestArticleList,
  articleDetail,
  registArticle,
  updateArticle,
  deleteArticle,
  likeArticle
}
