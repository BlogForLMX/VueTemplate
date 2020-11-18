import { resetRouter } from '@/router'

export function resetTokenAndClearUser() {
  // 退出登陆 清除用户资料
  window.sessionStorage.setItem('token', '')
  window.sessionStorage.setItem('userImg', '')
  window.sessionStorage.setItem('userName', '')
  window.sessionStorage.setItem('routerPath', '')
  // 重设路由
  resetRouter()
}

export const defaultDocumentTitle = 'Vue-Template'
export function getDocumentTitle(pageTitle) {
  if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
  return `${defaultDocumentTitle}`
}
