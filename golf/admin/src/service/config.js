import {baseUrl} from "./config/base";
import {post,uploadImg,get} from "./axios";

//登录
export const login=(account,password) =>post(`${baseUrl.admin}/server.do`,{
    method:'shenzhouxing.manager.login',
    data:{account,password}
})
/**
 * 配置模块
 * */
/**
* 首页配置
* */

//主页配置信息列表
export const configList=() =>post(`${baseUrl.bet}/server.do`,{
    method:'index.page.config.list',
    data:{}
})
//添加主页配置
export const configAdd=( publish, blockId, title, matchStartTime, skipId, imgUrl) =>post(`${baseUrl.bet}/server.do`,{
    method:'index.page.config.add',
    data:{publish, blockId, title, matchStartTime, skipId, imgUrl}
})
//修改主页配置
export const configUpdate=( publish, blockId, title, matchStartTime, skipId, imgUrl,configId) =>post(`${baseUrl.bet}/server.do`,{
    method:'index.page.config.update',
    data:{publish, blockId, title, matchStartTime, skipId, imgUrl,configId}
})
//删除主页配置
export const configDelete=(configId) =>post(`${baseUrl.bet}/server.do`,{
    method:'index.page.config.delete',
    data:{configId}
})

//上传图片
export const upload=(file,code='golf:pic') => uploadImg(`${baseUrl.upload}/server.do`,{
    method:'youxibi.upload.do',
    data:{file,code}
})

/**
* 赛事配置
* */

//功能
//比赛列表
export const matchList=(page,pageSize) =>post(`${baseUrl.bet}/server.do`,{
    method:'golf.match.list',
    data:{page,pageSize}
})
//添加比赛
export const matchAdd=(matchName,matchStartTime) =>post(`${baseUrl.bet}/server.do`,{
    method:'golf.match.add',
    data:{matchName,matchStartTime}
})
//结束比赛
export const matchFinish=(matchId) =>post(`${baseUrl.bet}/server.do`,{
    method:'golf.match.finish',
    data:{matchId}
})
//比赛竞猜数据导出选项
export const exportSelection=(matchId) =>post(`${baseUrl.bet}/server.do`,{
    method:'golf.match.export.selection',
    data:{matchId}
})
//比赛竞猜数据导出（get方法请求）
export const exportBbetCensus=(matchId,typeId,code) =>get(`${baseUrl.bet}/export/bet_census`,{
    matchId,typeId,code
})

//玩法
//比赛投注类型列表
export const typeList=(matchId,page,pageSize) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.list',
    data:{matchId,page,pageSize}
})
//添加玩法
export const typeAdd=(matchId,name,rank,type,startTime) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.add',
    data:{matchId,name,rank,type,startTime}
})
//修改玩法
export const typeUpdate=(betTypeId,name,rank,sort,startTime) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.update',
    data:{betTypeId,name,rank,sort,startTime}
})
//结束玩法
export const typeFinish=(betTypeId) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.finish',
    data:{betTypeId}
})
//修改玩法说明
export const tipsUpdate=(betTypeId,tips) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.tips.update',
    data:{betTypeId,tips}
})
//修改投注类型的下单截止时间
export const deadlineUpdate=(betTypeId,deadlineTime) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.type.deadline.update',
    data:{betTypeId,deadlineTime}
})

//投注
//比赛投注类型下的竞猜项列表
export const selectionList=(betTypeId,page,pageSize,customize) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.list',
    data:{betTypeId,page,pageSize,customize}
})
//向投注类型下添加竞猜项
export const selectionAdd=(betTypeId,betSelections,customize,matchStartTime,betSelectionEnName) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.add',
    data:{betTypeId,betSelections,customize,matchStartTime,betSelectionEnName}
})
//修改竞猜项
export const selectionUpdate=(betSelectionId,betSelectionOdds) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.update',
    data:{betSelectionId,betSelectionOdds}
})
//竞猜项结算
export const selectionSettlement=(betSelectionId,betSelectionStatus,parallelCount) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.settlement',
    data:{betSelectionId,betSelectionStatus,parallelCount}
})
//竞猜项下的投注记录
export const betRecord=(betSelectionId,page,pageSize) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.bet.record',
    data:{betSelectionId,page,pageSize}
})
//特殊玩法竞猜项的开启/关闭
export const openSet=(betSelectionId,open) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.open.set',
    data:{betSelectionId,open}
})
//特殊玩法竞猜项的开启/关闭 （批处理）
export const openBatchSet=(betTypeId,customize,open) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.open.batch.set',
    data:{betTypeId,customize,open}
})
//特殊玩法竞猜项的 隐藏/展示（批处理）
export const showBatchSet=(betTypeId,customize,show) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.show.batch.set',
    data:{betTypeId,customize,show}
})
//特殊玩法竞猜项的开赛时间修改（批处理）
export const starttimeBatchSet=(betTypeId,customize,matchStartTime) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.starttime.batch.set',
    data:{betTypeId,customize,matchStartTime}
})

//设置竞猜项的人气状态
export const selectionHotSet=(betSelectionId,hot) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.hot.set',
    data:{betSelectionId,hot}
})
//设置竞猜项的人气状态
export const setTop=(betTypeId,round,topType) =>post(`${baseUrl.bet}/server.do`,{
    method:'match.bet.selection.set.top',
    data:{betTypeId,round,topType}
})

//用户列表
export const userList=(page,pageSize) =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.user.list',
    data:{page,pageSize}
})
//通过手机号查找用户列表
export const byPhonenumber=(phoneNumber) =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.user.list.by.phonenumber',
    data:{phoneNumber}
})

//货币类型列表
export const moneyTypeList=(groupCode='GOLF_BALL') =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.wallet.server.money.type.list',
    data:{groupCode}
})
//货币记录模板类型列表
export const moneyRecordList=() =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.wallet.server.money.template.record.list',
    data:{}
})
//为用户充值余额
export const groupMoneyAdd=(userId,sum,moneyCode,templateCode) =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.wallet.server.group.money.add',
    data:{userId,sum,moneyCode,templateCode}
})
//用户余额
export const walletServerBalance=(userId,moneyCode) =>post(`${baseUrl.login}/server.do`,{
    method:'youxibi.wallet.server.balance',
    data:{userId,moneyCode}
})



