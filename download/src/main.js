import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

import 'swiper/dist/css/swiper.css';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

FastClick.attach(document.body);
Vue.config.productionTip = false

//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
