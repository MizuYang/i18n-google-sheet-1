import { createStore } from 'vuex'
// import axios from 'axios'

// 其它store
import test from '@/vuex/store/test.js'

export default createStore({
  strict: false, // 嚴謹模式
  state: {
  },
  actions: {
    method (store, data) {
      // 呼叫 actions 方法
      // store.dispatch('方法名稱', 參數)
      // 呼叫 mutations 方法
      // store.commit('方法名稱', 參數)
    }
  },
  mutations: {
    UPDATE_DATA (state, data) {
      // state.data = data
    }
  },
  getters: {
  },
  modules: {
    test
  }
})
