import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './util/tools/i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
