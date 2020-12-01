import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS resets

import Element from 'element-ui' // Element UI
import 'element-ui/lib/theme-chalk/index.css' // Element UI CSS
import i18n from './lang' // internationalization

import '@/styles/index.scss' // Global CSS

import axios from 'axios'
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon

import './permission'


// 此处并没有按需引入Element UI, 对打包体积会有影响，
// 如需按需加载，请参考（https://element.eleme.cn/#/zh-CN/component/quickstart）
Vue.use(Element, {
  size: 'medium', // 设置组件默认的尺寸大小
  zIndex: 3000, // 设置弹框的初始 z-index（默认值：2000）
  // 设置i18n的支持，Element UI规定的写法（https://element.eleme.cn/#/zh-CN/component/i18n）
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
