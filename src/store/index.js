import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: null,
    token: null,
    name: null,
    role: null,
    tenant: null,
    tenancies: null,
    currentTenancy: null
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.userId = payload.userId;
      state.token = payload.token;
      state.name = payload.name;
      state.tenant = payload.tenant;
      state.tenancies = payload.tenancies;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.token = null;
      state.tenant = null;
      state.name = null;
      state.tenancies = null;
    },
    setCurrentTenancy(state, payload) {
      state.currentTenancy = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
