import Vue from 'vue'
import 'axios' from 'axios'
import { sync } from 'vuex-router-sync'
import App from '@/App.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import elementUI from 'element-ui'
import '@/styles/index.css'

Vue.use(elementUI)

axios.defaults.contentType = 'application/json'

Vue.prototype.axios = axios

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    render: h => h(App),
    router,
    store
  })
  return { app, router, store }
}
