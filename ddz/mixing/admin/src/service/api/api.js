import {baseUrl} from "../base";
import {post,get} from "../axios";

//登录
export const login=(account,password) =>post(`${baseUrl.user}/ddz/login`,{
    account,password
})
//注册
export const register=(account,password) =>post(`${baseUrl.user}/ddz/register`,{
    account,password
})

//修改密码
export const password=(originpassword,newpassword,confirmpassword) =>post(`${baseUrl.user}/ddz/password`,{
    originpassword,newpassword,confirmpassword
})


//用户列表
export const playerList=(page,per) =>get(`${baseUrl.user}/ddz/player/list`,{page,per})
//根据昵称/用户ID/手机号查找某个玩家
export const playerCondition=(condition) =>get(`${baseUrl.user}/ddz/player/info`,{condition})
//解禁玩家
export const playerRole=(accountid,desc,role) =>post(`${baseUrl.user}/ddz/player/role`,{
    accountid,desc,role
})
//金币明细
export const chipsRecord=(start,end,page,per,condition) =>get(`${baseUrl.user}/ddz/player/chips/record`,{start,end,page,per,condition})



//数据总览内容
export const pastDaily=(start,end) =>get(`${baseUrl.user}/ddz/daily`,{start,end})
//指定过去一段时间的用户数据情况
export const pastCount=(type) =>get(`${baseUrl.user}/ddz/past/count`,{type})
//游戏对局明细
export const gameRecord=(start,end,page,per,condition) =>get(`${baseUrl.user}/ddz/player/game/record`,{start,end,page,per,condition})
export const channelRecord=(condition) =>get(`${baseUrl.user}/ddz/player/channel/record`,{condition})



//财务总览-总充值金额
export const wxpaySum=(start,end) =>get(`${baseUrl.user}/ddz/pay/sum`,{start,end})
//财务总览-总发放红包金额
export const redpacketSum=(start,end) =>get(`${baseUrl.user}/ddz/redpacket/sum`,{start,end})
//财务总览-充值金额变动
export const wxpayChart=(action) =>get(`${baseUrl.user}/ddz/pay/chart`,{action})
//财务总览-发放红包变动
export const redpacketChart=(action) =>get(`${baseUrl.user}/ddz/redpacket/chart`,{action})
//用户充值明细
export const wxpayList=(start,end,page,per,condition,channel) =>get(`${baseUrl.user}/ddz/pay/list`,{start,end,page,per,condition,channel})
//红包发放明细
export const redpacketList=(start,end,page,per,condition) =>get(`${baseUrl.user}/ddz/redpacket/list`,{start,end,page,per,condition})




















