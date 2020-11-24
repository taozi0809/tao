import {baseUrl} from "../../data/base";
import {post,get} from "../axios";

//登录
export const login=(data) =>post(`${baseUrl.user}/tholdemtoken/login`,data)


//修改密码
export const password=(data) =>post(`${baseUrl.user}/tholdemtoken/password`,data)


//用户列表
export const playerList=(page,per) =>get(`${baseUrl.user}/tholdemtoken/player/list`,{page,per})
//根据昵称/用户ID/手机号查找某个玩家
export const playerCondition=(condition) =>get(`${baseUrl.user}/tholdemtoken/player/info`,{condition})
//解禁玩家
export const playerRole=(data) =>post(`${baseUrl.user}/tholdemtoken/player/role`,data)
//收款信息设置
export const paySet=(data) =>post(`${baseUrl.user}/tholdemtoken/pay/set`,data)



//数据总览内容
export const pastDaily=(start,end) =>get(`${baseUrl.user}/tholdemtoken/daily`,{start,end})
//指定过去一段时间的用户数据情况
export const pastCount=(type) =>get(`${baseUrl.user}/tholdemtoken/past/count`,{type})
//指定过去一段时间的盈利数据情况
export const pastProfit=(type) =>get(`${baseUrl.user}/tholdemtoken/past/profit`,{type})
//游戏对局明细
export const gameRecord=(start,end,page,per,condition) =>get(`${baseUrl.user}/tholdemtoken/player/game/record`,{start,end,page,per,condition})


//USDT 充提明细
export const redchargeList=(start,end,page,per,condition) =>get(`${baseUrl.user}/tholdemtoken/redcharge/list`,{start,end,page,per,condition})
//USDT总充值数和总兑换数
export const redchargeCount=(start,end) =>get(`${baseUrl.user}/tholdemtoken/redcharge/count`,{start,end})

//GACT兑换记录
export const redemptionList=(start,end,page,per,condition) =>get(`${baseUrl.user}/tholdemtoken/redemption/list`,{start,end,page,per,condition})
//GACT总兑换数和总兑出数量
export const redemptionCount=(start,end) =>get(`${baseUrl.user}/tholdemtoken/redemption/count`,{start,end})

























