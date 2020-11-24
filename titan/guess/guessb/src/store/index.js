import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userName:'',//用户名
    token:'',//用户token
    // userName:'sX31311302457320',//用户名
    // token:'F9F6F53C29DD5D6F6DAEAC42D55F64DA',//用户token
    message:{//提示消息
		show:false,
		msg:'',
    },
    guessActive:'time',//竞猜页按时间/联赛排序
    guessActiveIndex:0,//默认显示列表
    guessActiveDataList:[],//显示列表
    guessTimeList:[],//竞猜页时间列表
    guessTournamentList:[],//竞猜页联赛列表
    betInfo:{},//竞猜页数据
    isBetInput:false,//是否显示竞猜投注弹框
    guessInputData:{},//选中竞猜数据
    gameDetails:{},//比赛详情
	isMenu:false,//是否显示menu菜单
    isCompetition:false,//是否显示赛事筛选
    competitionFiltrate:{},//赛事筛选过滤
    competitionFiltrateIdArr:[]//赛事赛选列表


}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})