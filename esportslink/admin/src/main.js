import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import * as filters from './filter/filters'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



// import { Button, Select,Dialog,Input,Radio,Checkbox,Option,Table,DatePicker,
//   Menu,MenuItem,TableColumn,Dropdown,DropdownMenu,DropdownItem,
//   Pagination,TabPane,Tabs,Message,Loading,MessageBox} from 'element-ui';
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Dialog)
// Vue.use(Input)
// Vue.use(Radio)
// Vue.use(Checkbox)
// Vue.use(Option)
// Vue.use(Table)
// Vue.use(DatePicker)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(TableColumn)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Pagination)
// Vue.use(TabPane)
// Vue.use(Tabs)
// Vue.use(Message)
// Vue.use(Loading)
// Vue.use(MessageBox)


Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
