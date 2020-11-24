import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

import * as filters from './filter/filters'
import './plugins/element.js'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import VeLine from 'v-charts/lib/line'
import VeRing from 'v-charts/lib/ring'

Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import{
  Input,
  Form,
  FormItem,
  Loading,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  PageHeader,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  DatePicker,
  Dialog,
  Radio,
  TimePicker,
  Tabs,
  TabPane,
  Upload,
  Image,
  RadioGroup,
  Card,
  Popconfirm,
  Switch,
  Popover,
  Checkbox,
  CheckboxGroup,

} from 'element-ui';
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Loading);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(PageHeader);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);
Vue.use(Image);
Vue.use(RadioGroup);
Vue.use(Card);
Vue.use(Popconfirm);
Vue.use(Switch);
Vue.use(Popover);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
