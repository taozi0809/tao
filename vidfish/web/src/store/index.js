import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    lang:{},//当前语言
    genresListActive:'',//当前类型
	isLogin:false,//用户是否登录
	loginType:'',//登录状态
	userInfo:{},//用户信息
	langList:[],//语言列表
	videoGenreList:{},//类型列表
	country:'',//国家
	startLoad:true,
	search:{},
}

export default new Vuex.Store({
	plugins:[persistedState()],
	state,
	getters,
	actions,
	mutations,
})