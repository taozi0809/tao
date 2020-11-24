import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './plugins/element.js'
import * as filters from './filter/filters'
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
