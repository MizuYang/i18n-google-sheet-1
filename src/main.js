import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'
import store from './vuex/index'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import $thousandths from '@/utils/thousandths.js' // 設定請求超時 5000 毫秒（即 5 秒）

import App from './App.vue'
import router from './router' //* 千分位

// axios.defaults.baseURL = 'http://xxx.com' // 共用網址頭
// axios.defaults.headers.common.Authorization = 'Bearer your-auth-token' // 自定義請求頭
axios.defaults.timeout = 5000

const app = createApp(App)

app.config.globalProperties.$thousandths = $thousandths //* 千分位

app.component('IsLoading', VueLoading)

app.use(router)
app.use(VueAxios, axios)
app.use(Vuex)
app.use(store)
app.mount('#app')
