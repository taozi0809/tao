import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userName:'',//用户名
    token:'',//用户token
    // userName:'uw90998767950723',//用户名
    // token:'E176CB49CA27BD4907D42A123D4020CE',//用户token
    // userName:'vX16682663460225167',//用户名
    // token:'0FD74208AD24ABFB644ABD9D8262F53E',//用户token

    message:{//提示消息
        show:false,
        msg:'',
    },
    guessActive:'time',//竞猜页按时间/联赛排序
    guessActiveIndex:0,//默认显示列表
    guessActiveDataList:[],//显示列表
    guessTimeList:[],//竞猜页时间列表
    guessTournamentList:[],//竞猜页联赛列表

    guessActiveBasketball:'time',//竞猜页按时间/联赛排序--篮球
    guessActiveIndexBasketball:0,//默认显示列表--篮球
    guessActiveDataListBasketball:[],//显示列表--篮球
    guessTimeListBasketball:[],//竞猜页时间列表--篮球
    guessTournamentListBasketball:[],//竞猜页联赛列表--篮球

    betInfo:{},//竞猜页数据
    isBetInput:false,//是否显示竞猜投注弹框
    guessInputData:{},//选中竞猜数据

    betInfoBasketball:{},//竞猜页数据--篮球
    isBetInputBasketball:false,//是否显示竞猜投注弹框--篮球
    guessInputDataBasketball:{},//选中竞猜数据--篮球

    gameDetails:{},//比赛详情
    isMenu:false,//是否显示menu菜单
    isCompetition:false,//是否显示赛事筛选
    competitionFiltrate:[],//赛事筛选过滤
    competitionFiltrateIdArr:[],//赛事赛选列表

    isBetRelated:false,//串关投注弹框
    requestEd:false,//请求是否结束
    matchIdAndInfos:[],//串关 下注信息
    betRelatedRandom:'',//串关随机数




}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})