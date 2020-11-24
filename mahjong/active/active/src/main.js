import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as filters from './filter/filters'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
