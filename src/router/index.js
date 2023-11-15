import { createRouter, createWebHistory } from 'vue-router'
import TheHomeView from '@/views/TheHomeView.vue'
import BeforeLoginView from '@/views/BeforeLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 히스토리모드 -> 히스토리가 쌓임, 단점은 새로고침시 히스토리가 날라감, 홈페이지로 초기화됨
  // 해시모드 -> 새로고침시에도 현재 페이지 유지, 단점은 url에 #이 붙음
  routes: [
    {
      path: '/',
      name: 'main',
      component: BeforeLoginView
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/TheHomeView.vue')
    },
    {
      path: '/member/login',
      name: 'member-login',
      component: () => import('@/components/member/MemberLoginView.vue')
    },
    {
      path: '/member/regist',
      name: 'member-regist',
      component: () => import('@/components/member/MemberRegisterView.vue')
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
          name: 'attraction-view'
        }
      ]
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'),
      redirect: '/board/list',
      children: [
        {
          path: 'list',
          name: 'board-list',
          component: () => import('@/components/board/BoardListView.vue')
        },
        {
          path: 'write',
          name: 'board-write',
          component: () => import('@/components/board/BoardWriteView.vue')
        },
        {
          path: 'detail:articleId',
          name: 'board-detail', // 수정,삭제 여기서
          component: () => import('@/components/board/BoardDetailView.vue')
        },
        {
          path: 'update:articleId',
          name: 'board-update', // 수정,삭제 여기서
          component: () => import('@/components/board/BoardUpdateView.vue')
        }
      ]
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('@/components/board/PlanningView.vue')
    }
  ]
})
export default router
