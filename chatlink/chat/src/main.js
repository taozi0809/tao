import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import * as filters from './filter/filters'
import message from './components/message/index'
import * as  socketApi from './service/websocket'

import { Switch } from 'element-ui';
import './plugins/element.js'
Vue.use(Switch)

Vue.use(message)

Vue.prototype.socketApi = socketApi
// agentData：发送的参数；this.getConfigResult：回调方法】
// this.socketApi.sendSock(agentData,this.getConfigResult);

Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
