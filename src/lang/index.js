/**
 * 设置多语言支持
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// 引入Element UI库的多语言支持
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 引入业务场景多语言支持
import enLocale from './en'
import zhLocale from './zh'

// 设置多语言支持
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // 设置地区
  messages // 设置地区信息
})

export default i18n
