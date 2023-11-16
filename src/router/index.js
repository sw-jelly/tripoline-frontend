import { createRouter, createWebHistory } from 'vue-router'
import TheHomeView from '@/views/TheHomeView.vue'
import BeforeLoginView from '@/views/BeforeLoginView.vue'

import { useMemberStore } from '@/stores/member'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 히스토리모드 -> 히스토리가 쌓임, 단점은 새로고침시 히스토리가 날라감, 홈페이지로 초기화됨
  // 해시모드 -> 새로고침시에도 현재 페이지 유지, 단점은 url에 #이 붙음
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/',
      name: 'main',
      component: BeforeLoginView,
      // 로그인이 안된경우엔 여기로, 로그인이 된 경우엔 home으로 redirect

      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next('/home')
        } else {
          next()
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/TheHomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      }
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
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
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

      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
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
      component: () => import('@/components/board/PlanningView.vue'),
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
export default router
