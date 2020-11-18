import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 左侧菜单栏数据（模拟后台返回的菜单数据格式）
    permisssionCodes: ['web_dashboard', 'web_demo', 'web_userInfo'],
    permisssionMenus: []
  },
  mutations: {
    SET_MENUS(state, items) {
      state.permisssionMenus = [...items]
    }
  },
  actions: {
    // 保存菜单
    handlePermissionMenus({ commit }, data) {
      commit('SET_MENUS', data)
    }
  }

})

export default store
