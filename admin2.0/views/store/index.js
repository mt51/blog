import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      keyword: '',
      articleList: [],
      error: null
    },
    actions: {
      fetchArticleList (state, opt) {
        const { page, size } = opt
        axios(`/api/article/list?page=${page}&size=${size}`)
          .then(res => {
            state.commit('setArticles', res.data.lists)
            if (res.status === 200) {
              state.commit('setArticles', res.data.lists)
            }
          })
          .catch(error => {
            state.commit('setError', error)
          })
      }
    },
    mutations: {
      setArticles (state, lists) {
        state.articleList = lists
      },
      setError (state, error) {
        state.error = error
      }
    }
  })
}
