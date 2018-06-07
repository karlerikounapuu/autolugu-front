// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './backend/vue-axios'
import store from './store'
import toasts from './alerts/toast'

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  toasts,
  template: '<App/>',
  components: { App }
})
