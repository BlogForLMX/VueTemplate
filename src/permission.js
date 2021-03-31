
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import createRoutes from '@/router/routes'
import { getDocumentTitle, resetTokenAndClearUser } from './utils'

NProgress.configure({
  showSpinner: false
})

// 是否有菜单数据
let hasMenus = false

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = getDocumentTitle(to.meta.title)
  // 开启加载动画
  NProgress.start()

  if (window.sessionStorage.getItem('token')) {
    // 从登陆页面过来，直接跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (hasMenus) {
        next()
        NProgress.done()
      } else {
        try {
          // 这里可以用 await 配合请求后台数据来生成路由
          // const data = await axios.get('xxx')
          // const routes = createRoutes(data)
          // 把模拟的菜单数据格式放到store，此处需要后台返回
          const routes = createRoutes(store.state.permisssionCodes)
          // 动态添加路由
          router.addRoutes(routes)
          hasMenus = true
          next({ path: to.path || '/' })
        } catch (error) {
          resetTokenAndClearUser()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    hasMenus = false
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
