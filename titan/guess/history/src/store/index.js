import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state ={
    userName:'',
    token:'',
    // userName:'uw90998767950723',
    // token:'0D17CF96938F504B495C1987287B0CD0',
    // userName:'XS2945787155878700',//用户名
    // token:'C1A1D8E0CF7ED81D91E42A24DD8B3838',//用户token
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})