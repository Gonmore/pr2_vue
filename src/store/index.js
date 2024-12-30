import { createStore } from 'vuex'

export default createStore({
  state: {
    baseUrl: process.env.VUE_APP_API_URL
  },
  getters: {
    
    doubleCount(state) {
      return state.count * 2
    },
    getBaseUrl(state) {
      return state.baseUrl
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    
    increment({ commit }) {
      commit('increment')
    }
  },
  modules: {
  }
})
