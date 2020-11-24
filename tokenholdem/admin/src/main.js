import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

import * as filters from './filter/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
