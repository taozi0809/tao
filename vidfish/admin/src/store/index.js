import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    isCollapse: false,//左侧边栏是否展开
    videoBaseCtoModelList:[],//电影管理列表
    countNum:0,//电影管理分页
    fileId:'',//视频id
    posterUrl:'',//封面路径
    resourceUrl:'',//视频路径
    coverUrl:'',//视频横向封面
    backUrl:'',//视频背景图

    prevueBaseCtoModelList:[],//预告片列表
    prevueCountNum:0,//预告片分页
	videoDetails:{},//视频详情

}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})