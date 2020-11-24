import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import * as filters from './filter/filters'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
