import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import animate from 'animate.css'
Vue.use(animate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
