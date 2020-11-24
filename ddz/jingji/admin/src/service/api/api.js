import {baseUrl} from "../base";
import {post, get} from "../axios";


/**
 * 登录注册模块start
 * */
//登录
export const login=(account,password) =>post(`${baseUrl.jingji}/login`,{
    account,password
})

//获取验证码
export const getSmsCode=(Account) =>post(`${baseUrl.jingji}/getSmsCode`,{
    Account
})

//修改密码
export const changePassword=(Account,Password,Code) =>post(`${baseUrl.jingji}/changePassword`,{
    Account,Password,Code
})

//首页数据
export const getFirstViewData =() =>get(`${baseUrl.jingji}/getFirstViewData`,{})

/**
 * 登录注册模块end
 * */
/**
 * 个人信息--start
 * */

//获取账号信息
export const getUser =() =>get(`${baseUrl.jingji}/getUser`,{})

//申请提现
export const cashout=(Amount) =>post(`${baseUrl.jingji}/cashout`,{
    Amount
})

//修改银行账户信息
export const editBank=(BankName,BankID) =>post(`${baseUrl.jingji}/editBank`,{
    BankName,BankID
})

//修改绑定游戏信息
export const editGameInfo=(GameID) =>post(`${baseUrl.jingji}/editGameInfo`,{
    GameID
})

/**
 * 个人信息--end
 * */
/**
 * 我的玩家--start
 * */
//下级玩家列表
export const getDownPlayers =(AccountID,Name,Phone,Page,Count) =>post(`${baseUrl.jingji}/getDownPlayers`,{
    AccountID,Name,Phone,Page,Count
})

/**
 * 我的玩家--end
 * */



/**
 * 协办管理--start
 * */

//新增协办
export const addAgent=(AgentPhone,AgentName,AgentRole,GameID,GameNickname,GamePhone,WechatNum,Location) =>post(`${baseUrl.jingji}/addAgent`,{
    AgentPhone,AgentName,AgentRole,GameID,GameNickname,GamePhone,WechatNum,Location
})

//获取协办列表
export const getAgents=(Page,Count) =>post(`${baseUrl.jingji}/getAgents`,{
   Page,Count
})

//查看协办
export const getOneAgent=(AccountID) =>post(`${baseUrl.jingji}/getOneAgent`,{
    AccountID
})

//搜索协办
export const searchOneAgent =(AccountID,Name,Phone) =>post(`${baseUrl.jingji}/searchOneAgent`,{
    AccountID,Name,Phone
})

//初始化协办密码
export const initPassword =(AccountID) =>post(`${baseUrl.jingji}/initPassword`,{
    AccountID
})

//操作协办状态
export const optUser =(AccountID,Opt) =>post(`${baseUrl.jingji}/optUser`,{
    AccountID,Opt
})

//协办权限列表
export const getAgentTypeList =(AgentType,Page,Count) =>post(`${baseUrl.jingji}/getAgentTypeList`,{
    AgentType,Page,Count,
})
//修改-获取协办权限列表
export const getAgentTypeLimits =(AgentType) =>post(`${baseUrl.jingji}/getAgentTypeLimits`,{
    AgentType
})
//修改-编辑协办权限列表
export const editAgentTypeLimits =(AgentType,list) =>post(`${baseUrl.jingji}/editAgentTypeLimits`,{
    AgentType,list
})
//协办审核列表
export const getExamineAgents =(Page,Count) =>post(`${baseUrl.jingji}/getExamineAgents`,{
    Page,Count
})

//审核协办
export const examineAgent=(OrderID,AccountID,Opt,DenyReason,AgentFeeOpt) =>post(`${baseUrl.jingji}/examineAgent`,{
    OrderID,AccountID,Opt,DenyReason,AgentFeeOpt
})

//搜索协办
export const searchExamineAgent =(Name,Phone) =>post(`${baseUrl.jingji}/searchExamineAgent`,{
    Name,Phone
})
/**
 * 协办管理--end
 * */



/**
 * 收益管理--start
 * */
//收益明细
export const getProfitList =(Name,Start,End,Page,Count) =>post(`${baseUrl.jingji}/getProfitList`,{
    Name,Start,End,Page,Count
})
//收益比例列表
export const getAgentTypeRates =(Page,Count) =>post(`${baseUrl.jingji}/getAgentTypeRates`,{
    Page,Count
})
//修改收益比例
export const editAgentTypeRate =(AgentType,list) =>post(`${baseUrl.jingji}/editAgentTypeRate`,{
    AgentType,list
})

//充值费列表
export const getAgentChargeRates =(Page,Count) =>post(`${baseUrl.jingji}/getAgentChargeRates`,{
    Page,Count
})
//修改充值费
export const editAgentChargeRate =(AgentType,list) =>post(`${baseUrl.jingji}/editAgentChargeRate`,{
    AgentType,list
})

/**
 * 收益管理--end
 * */




/**
 * 提现管理--start
 * */

//提现明细
export const getCashOutList=(Status,Page,Count,Start,End) =>post(`${baseUrl.jingji}/getCashOutList`,{
    Status,Page,Count,Start,End
})

//提现审核
export const examineCashOut=(Opt,GroupCount,Reason,OrderID) =>post(`${baseUrl.jingji}/examineCashOut`,{
    Opt,GroupCount,Reason,OrderID
})
/**
 * 提现管理--end
 * */



