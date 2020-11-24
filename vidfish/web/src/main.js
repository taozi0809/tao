import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'swiper/dist/css/swiper.min.css';
import message from './components/message/index'
import load from './components/load/index'
import MetaInfo from 'vue-meta-info'
import * as filters from './filter/filters'

Vue.config.productionTip = false
Vue.use(message)
Vue.use(load)
Vue.use(MetaInfo)
// Vue.use(VueWechatTitle)
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App),
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')
