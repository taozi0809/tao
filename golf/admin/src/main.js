import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

import * as filters from './filter/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import element from "@/plugins/element";
// import echarts from "@/plugins/echarts";

// Vue.use(echarts)
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
