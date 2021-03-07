import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './quasar'
import GlobalMixins from '@/mixins/GlobalMixin'
Vue.config.productionTip = false

// Use axios as http client.
Vue.prototype.$http = axios;

// Set the base URL based on the .env
// PRODUCTION = .env.production
// LOCAL = .env.local
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_APISERVER;

new Vue({
  mixins: [GlobalMixins],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
