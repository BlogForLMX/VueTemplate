import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang'
import Layout from '@/layout/index'

Vue.use(Router)

/**
 * 不需要鉴权的页面
 */
const commonRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: i18n.t('route.login') },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '' }
  }
]

/**
 * 需要接受鉴权的页面
 */
export const asyncRoutes = [

  // 一级路由时使用redirect进行重定向
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      component: () => import('@/views/dashboard/index.vue'),
      name: 'Dashboard',
      meta: {
        title: i18n.t('route.dashboard'),
        icon: 'home',
        needPermission: ['web_dashboard']
      }
    }]
  },

  // 二级路由或者三级路由时不需要进行重定向
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    meta: {
      title: '二级菜单',
      icon: 'xingzhuang',
      needPermission: ['web_demo']
    },
    children: [
      {
        path: 'userinfo',
        name: 'userinfo',
        meta: {
          title: '用户信息',
          icon: 'UserSettings',
          needPermission: ['web_userInfo']
        },
        component: () => import('@/views/demo/index.vue'),
      }
    ]
  },
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
