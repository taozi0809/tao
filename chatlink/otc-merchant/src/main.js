import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/'
import FastClick from 'fastclick'

import 'swiper/dist/css/swiper.css';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.config.productionTip = false

import { Button,Switch,NumberKeyboard,Field,DatetimePicker,RadioGroup,Radio,
    Popup,Toast,Loading,Uploader,List,Cell,Dialog,Checkbox,CheckboxGroup,
} from 'vant';
Vue.use(Button);
Vue.use(Switch);
Vue.use(NumberKeyboard);
Vue.use(Field);
Vue.use(DatetimePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Uploader);
Vue.use(List);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
