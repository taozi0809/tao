import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        mask:false,
    },
    mutations:{
        edit(state){
            state.mask = true
        }
    }
})

export default store
