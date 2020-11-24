import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import * as filters from './filter/filters'
import message from './components/message/index'
import loadPage from './components/loadPage/index'
Vue.config.productionTip = false
import 'swiper/dist/css/swiper.css';
Vue.use(message)
Vue.use(loadPage)

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
