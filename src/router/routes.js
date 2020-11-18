import { asyncRoutes } from '@/router'
import store from '../store'

// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes(permisssionCodes) {

  // 进行菜单过滤
  const accessedRoutes = filterAsyncRoutes(asyncRoutes, permisssionCodes)
  // 进行权限路由的缓存操作
  store.dispatch('handlePermissionMenus', accessedRoutes)
  // 最后添加404页面 否则会在登陆成功后跳到404页面
  accessedRoutes.push({ path: '*', redirect: '/404' })

  return accessedRoutes
}


/**
 * 递归过滤异步路由表， 返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param permissionCodes
 */
export function filterAsyncRoutes(routes, permissionCodes) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(permissionCodes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissionCodes)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 通过meta.needPermission判断是否与当前用户权限匹配
 * @param permissionCodes
 * @param route
 */
function hasPermission(permissionCodes, route) {
  if (route.meta && route.meta.needPermission) {
    return permissionCodes.some(permissionCode => route.meta.needPermission.includes(permissionCode))
  } else {
    return true
  }
}