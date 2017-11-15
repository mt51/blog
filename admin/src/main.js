// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.use(iView)

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.contentType = 'application/json'
axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')
  config.headers.token = token
  return config
}, error => {
  return Promise.reject(error)
})

Vue.prototype.axios = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.name !== 'Signin' && !token) {
    next({
      path: '/signin'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
