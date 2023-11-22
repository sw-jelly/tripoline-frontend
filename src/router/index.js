import { createRouter, createWebHistory } from 'vue-router'
import BeforeLoginView from '@/views/BeforeLoginView.vue'
import TheHomeView from '@/views/TheHomeView.vue'
import { useMemberStore } from '@/stores/member'
import TheElectricChargingStationView from '@/views/TheElectricChargingStationView.vue'
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
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin && useMemberStore().userInfo.memberRole == 0) {
          next()
        } else {
          alert('접근 권한이 없습니다')
          next('/')
        }
      },
      children: [
        {
          path: '/admin/userlist/:modify?',
          name: 'admin-userlist',
          component: () => import('@/components/admin/AdminManage.vue')
        },
        {
          path: '/admin/notice',
          name: 'admin-notice',
          component: () => import('@/components/board/BoardWriteView.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: TheHomeView,
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/MyPageView.vue'),
      redirect: '/member/manage',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {
          path: 'manage',
          name: 'member-manage',
          component: () => import('@/components/member/MemberManageView.vue')
        }
      ]
    },
    {
      path: '/member/withdrawal',
      name: 'member-withdrawal',
      component: () => import('@/components/MemberWithdrawalView.vue')
    },
    {
      path: '/estations',
      name: 'estations',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: TheElectricChargingStationView
    },
    {
      path: '/weather',
      name: 'weather',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: () => import('@/views/WeatherView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: () => import('@/views/GalleryView.vue'),
      redirect: '/gallery/list',
      children: [
        {
          path: 'list',
          name: 'gallery-list',
          component: () => import('@/components/gallery/GalleryList.vue')
        }
      ]
    },
    {
      path: '/hotplace',
      name: 'hotplace',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: () => import('@/views/HotPlaceView.vue')
    },
    {
      path: '/specialthanks',
      name: 'specialthanks',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: () => import('@/views/SpecialThanksView.vue')
    },
    {
      path: '/news',
      name: 'news',
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      component: () => import('@/views/AttractionNewsView.vue')
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
      props: true,
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
          path: 'list:key?',

          name: 'board-list',
          component: () => import('@/components/board/BoardListView.vue')
        },
        {
          path: 'write:planId',
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
      component: () => import('@/views/PlanView.vue'),
      beforeEnter: (to, from, next) => {
        if (useMemberStore().isLogin) {
          next()
        } else {
          next('/')
        }
      },
      redirect: '/plan/list',
      children: [
        {
          path: 'list',
          name: 'plan-list',
          component: () => import('@/components/plan/PlanListView.vue')
        },
        {
          path: 'regist',
          name: 'plan-regist',
          component: () => import('@/components/plan/PlanRegistView.vue')
        },
        {
          path: '/plan-regist-detail/:planId',
          name: 'plan-regist-detail',
          component: () => import('@/components/plan/PlanRegistDetailView.vue')
        },
        {
          path: 'detail/:planId',
          name: 'plan-detail',
          component: () => import('@/components/plan/PlanDetailView.vue')
        },
        {
          path: 'update/:planId',
          name: 'plan-update',
          component: () => import('@/components/plan/PlanUpdateView.vue')
        }
      ]
    }
  ]
})
export default router
