import { createRouter, createWebHistory } from 'vue-router'
import TheHomeView from '@/views/TheHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 히스토리모드 -> 히스토리가 쌓임, 단점은 새로고침시 히스토리가 날라감, 홈페이지로 초기화됨
  // 해시모드 -> 새로고침시에도 현재 페이지 유지, 단점은 url에 #이 붙음
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheHomeView
    },
    {
      path: '/member/login',
      name: 'member-login',
      component: () => import('@/components/member/MemberLoginView.vue')
    },
    {
      path: '/member/regist',
      name: 'member-regist',
      component: () => import('@/views/MemberRegistView.vue')
    },
    {
      path: '/member/update',
      name: 'member-update',
      component: () => import('@/views/MemberUpdateView.vue')
    },
    {
      path: '/member/withdrawal',
      name: 'member-withdrawal',
      component: () => import('@/views/MemberWithdrawalView.vue')
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: () => import('@/views/AttractionView.vue'),
      children: [
        {
          path: 'view',
          name: 'attraction-view',
          component: () => import('@/views/AttractionDetailView.vue')
        }
      ]
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView'),
      redirect: '/board/list',
      children: [
        {
          path: 'list',
          name: 'board-list',
          component: () => import('@/views/BoardListView')
        },
        {
          path: 'write',
          name: 'board-write',
          component: () => import('@/views/BoardWriteView')
        },
        {
          path: 'detail',
          name: 'board-detail', // 수정,삭제 여기서
          component: () => import('@/views/BoardDetailView')
        }
      ]
    }
  ]
})
export default router
