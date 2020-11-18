import axios from 'axios'
import router from '@/router'
import { warningMessage, errorMessage } from '@/utils/message'
import { resetTokenAndClearUser } from '@/utils'

/**
 * 创建一个请求实例
 */
const service = axios.create({
  baseURL: '/',
  timeout: 60000 // 设置默认的请求超时时间
})

/**
 * 请求拦截操作
 */
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (config.data === undefined) {
    config.data = {}
  }
  if (config.params === undefined) {
    config.params = {}
  }
  // let timeFlag = +new Date()
  // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // config.headers['lang'] = lang
  // config.headers['xxx'] = 'WEB'

  // 在headers中拼装token信息
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, (error) => Promise.reject(error))

/**
 * 响应拦截操作
 */
service.interceptors.response.use(
  response => {
    // 判断如果时流类型，直接放行
    if (response.config.responseType !== undefined && response.config.responseType.toLowerCase() === 'blob') {
      return response
    }
    const res = response.data
    // 这里是接口处理的一个示范，可以根据自己的项目需求更改
    // 例如业务逻辑1000为分界
    if (res.code !== 1000) {
      if (router.history.current.path !== '/login') {
        // 需要提示用户重新登录;
        const reloadCodes = [1001, 1009, 1005, 2000, 2003, 2006]
        if (reloadCodes.includes(res.code)) {
          // 返回登录页
          resetTokenAndClearUser()
          router.push('login')
        } else {
          // 业务错误码
          warningMessage(res.msg)
        }
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },

  (error) => {
    if (error.name === 'Error') {
      errorMessage(error.msg)
    } else {
      errorMessage(error.response.data.data)
    }
    return Promise.reject(error)
  }
)

export default service
