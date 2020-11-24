import {baseUrl} from "../base";
import {post, get,postCode} from "../axios";

/**
 * 登录注册模块start
 * */
//登录
export const login=(account,password) =>post(`${baseUrl.jingji}/login`,{
    account,password
})
//首页
export const getFirstViewData=() =>get(`${baseUrl.jingji}/getFirstViewData`,{})

//用户验证码登录
export const smslogin=(Account,Code,SmsToken) =>post(`${baseUrl.jingji}/smslogin`,{
    Account,Code,SmsToken
})
//验证码
export const getCode=(data) =>postCode(`${baseUrl.jingji}/code`,{
    data
})

/**
 * 登录注册模块end
 * */
/**
 * 用户列表 --start
 * */
//用户列表
export const getUserList=(Page,Count) =>post(`${baseUrl.jingji}/getUserList`,{
    Page,Count
})
//被邀请人ID
export const getMyShareIDs=(AccountID,Page,Count) =>post(`${baseUrl.jingji}/getMyShareIDs`,{
    AccountID,Page,Count
})
//当日参赛用户ID
export const getMyPlayWiths=(AccountID,Page,Count) =>post(`${baseUrl.jingji}/getMyPlayWiths`,{
    AccountID,Page,Count
})
export const optWhitList=(Open) =>post(`${baseUrl.jingji}/optWhitList`,{
    Open
})
export const addWhitList=(AccountID) =>post(`${baseUrl.jingji}/addWhitList`,{
    AccountID
})
export const getWhitList=(Page,Count) =>post(`${baseUrl.jingji}/getWhitList`,{
    Page,Count
})
export const delWhitList=(AccountID) =>post(`${baseUrl.jingji}/delWhitList`,{
    AccountID
})
export const sarchWhitList=(AccountID,Nickname,Phone) =>post(`${baseUrl.jingji}/searchWhiteList`,{
    AccountID,Nickname,Phone
})
//备注
export const editRemark=(AccountID,Remark) =>post(`${baseUrl.jingji}/editRemark`,{
    AccountID,Remark
})


//修改账户转态
export const optUser=(UID,Opt) =>post(`${baseUrl.jingji}/optUser`,{
    UID,Opt
})

//个人信息
export const getOneUser=(AccountID,Nickname,Phone) =>post(`${baseUrl.jingji}/getOneUser`,{
    AccountID,Nickname,Phone
})

//修改实名：/realname/update
export const realnameUpdate=(AccountID,RealName,IDCardNo) =>post(`${baseUrl.jingji}/realname/update`,{
    AccountID,RealName,IDCardNo
})

//清空实名/银行卡 Opt:1--清楚全部  2--清除银行卡
export const clearRealInfo=(UID,Opt) =>post(`${baseUrl.jingji}/clearRealInfo`,{
    UID,Opt
})

//修改银行卡信息
export const bankcardSet=(Accountid,BankName,BankCardNo,Province,City,OpeningBank,OpeningBankNo) =>post(`${baseUrl.jingji}/bankcard/set`,{
    Accountid,BankName,BankCardNo,Province,City,OpeningBank,OpeningBankNo
})


//个人赛事总览
export const getMatchReview=(AccountID,Page,Count) =>post(`${baseUrl.jingji}/getMatchReview`,{
    AccountID,Page,Count
})

//根据赛事名查询赛事
export const getMatchReviewByName=(AccountID,MatchType,Page,Count) =>post(`${baseUrl.jingji}/getMatchReviewByName`,{
    AccountID,MatchType,Page,Count
})

//操作日志列表
export const getUserOptLog=(AccountID,Start,End,Page,Count,OptType) =>post(`${baseUrl.jingji}/getUserOptLog`,{
    AccountID,Start,End,Page,Count,OptType
})


/**
 * 用户列表 --end
 * */
/**
 * 多人赛事 --start
 * */

//请求赛事配置列表
export const matchManagerList=(Page,Count) =>post(`${baseUrl.jingji}/matchManagerList`,{
    Page,Count
})

//新增一个赛事
export const addMatch=(MatchType, MatchID, MatchName, Round, Card, StartType, StartTime, LimitPlayer, TotalMatch, EnterFee,
                       Sort, AwardList, ShelfTime, Recommend, Eliminate=null,MatchSource,MatchIcon,MatchLevel
) =>post(`${baseUrl.jingji}/addMatch`,{
    MatchType,
    MatchID,
    MatchName,
    Round,
    Card,
    StartType,
    StartTime,
    LimitPlayer,
    TotalMatch,
    EnterFee,
    Sort,
    AwardList,
    ShelfTime,
    Recommend,
    Eliminate,
    MatchSource,
    MatchIcon,
    MatchLevel,
})

//编辑赛事
export const editMatch=(MatchID,MatchName,Card,StartType,StartTime,LimitPlayer,Eliminate,EnterFee,TotalMatch,ShelfTime,DownShelfTime,AwardList,UseMatch) =>post(`${baseUrl.jingji}/editMatch`,{
    MatchID,
    MatchName,
    Card,
    StartType,
    StartTime,
    LimitPlayer,
    Eliminate,
    EnterFee,
    TotalMatch,
    ShelfTime,
    DownShelfTime,
    AwardList,
    UseMatch
})
//上架赛事/下架赛事/删除赛事  Opt:1上架赛事，2下架赛事，3删除赛事
export const optMatch=(MatchID,Opt) =>post(`${baseUrl.jingji}/optMatch`,{
    MatchID,
    Opt
})

//修改赛事是否首页显示
export const showHall=(MatchID, ShowHall) =>post(`${baseUrl.jingji}/showHall`,{
    MatchID,
    ShowHall,
})

//修改赛事排序
export const editSort=(MatchID, Sort) =>post(`${baseUrl.jingji}/editSort`,{
    MatchID,
    Sort
})

//赛事报表
export const matchReport=(MatchID, Start, End, Page, Count) =>post(`${baseUrl.jingji}/matchReport`,{
    MatchID,
    Start,
    End,
    Page,
    Count
})

//赛事列表
export const matchList=( MatchID,AccountID, MatchType, Start, End, Page, Count) =>post(`${baseUrl.jingji}/matchList`,{
    MatchID,
    AccountID,
    MatchType,
    Start,
    End,
    Page,
    Count,
})

//单局赛事详情
export const matchDetail=( MatchID) =>post(`${baseUrl.jingji}/matchDetail`,{
    MatchID
})


//上传图片
export const uploadMatchIcon=(fd) =>post(`${baseUrl.jingji}/upload/matchIcon`,{
fd
})
//获取图片  get /download/matchIcon/+图片地址
// export const uploadMatchIcon=() =>get(`${baseUrl.jingji}/download/matchIcon/`,{
//
// })

//异常赛事回调
export const dealIllegalMatchCallback=(AccountID,SonMatchID) =>post(`${baseUrl.jingji}/dealIllegalMatchCallback`,{
    AccountID,SonMatchID
})
//异常赛事列表
export const getIllegalMatchRecord=() =>get(`${baseUrl.jingji}/getIllegalMatchRecord`,{})


//赛事盈亏
export const getMatchProfit=(Profit,Status,Page,Count) =>post(`${baseUrl.jingji}/getMatchProfit`,{
    Profit,Status,Page,Count
})

/**
 * 多人赛事 --end
 * */
/**
 * 多支付通道--start
 * */
//支付状态
export const getPayConfig=() =>get(`${baseUrl.jingji}/getPayConfig`,{})
//修改支付状态
export const editPayConfig=(PayType) =>post(`${baseUrl.jingji}/editPayConfig`,{
    PayType
})


//流水记录
export const flowdataHistory=(start,end,page,per,condition) =>post(`${baseUrl.jingji}/flowdata/history`,{
    start,end,page,per,condition
})
//比赛获得
export const awardRecord=(start,end,page,per,condition) =>post(`${baseUrl.jingji}/match/award-record`,{
    start,end,page,per,condition
})
//单个打款
export const flowdataPayment=(id,desc) =>post(`${baseUrl.jingji}/flowdata/payment`,{
    id,desc
})

//单个退款
export const flowdataRefund=(id,desc) =>post(`${baseUrl.jingji}/flowdata/refund`,{
    id,desc
})

//批量打款
export const flowdataPayments=(ids,desc) =>post(`${baseUrl.jingji}/flowdata/payments`,{
    ids,desc
})

//批量退款
export const flowdataRefunds=(ids,desc) =>post(`${baseUrl.jingji}/flowdata/refunds`,{
    ids,desc
})

//批量导出
export const flowdataExport=(start,end,condition) =>post(`${baseUrl.jingji}/flowdata/export`,{
    start,end,condition
})

//限额开关：/switch/withdraw-limit
export const switchLimit=() =>post(`${baseUrl.jingji}/switch/withdraw-limit`,{})
//限额开关状态
export const statusLimit=() =>post(`${baseUrl.jingji}/status/withdraw-limit`,{})


//添加线下支付
export const offlinepaymentAdd=(accountid, action_type, change_fee, desc) =>post(`${baseUrl.jingji}/offlinepayment/add`,{
    accountid,
    action_type,
    change_fee,
    desc,
})

//线下支付列表
export const offlinepaymentList=(start,end,page,per,condition) =>post(`${baseUrl.jingji}/offlinepayment/list`,{
    start,end,page,per,condition
})

//支付历史列表
export const orderHistory=(start,end,page,per,condition) =>post(`${baseUrl.jingji}/order/history`,{
    start,end,page,per,condition
})
//通过
export const flowdataPass=(Id) =>post(`${baseUrl.jingji}/flowdata/pass`,{
    Id
})


//添加通道
export const merchantInsert=(MerchantNo,MerchantType,DownPayBranchs,PayMin,PayMax,PublicKey,PrivateKey,Order) =>post(`${baseUrl.jingji}/shop/merchant-insert`,{
    MerchantNo,
    MerchantType,
    DownPayBranchs,
    PayMin,
    PayMax,
    PublicKey,
    PrivateKey,
    Order
})
//删除通道
export const merchantDelete=(ID) =>post(`${baseUrl.jingji}/shop/merchant-delete`,{
    ID
})
//通道列表
export const merchantList=(Page,Per) =>post(`${baseUrl.jingji}/shop/merchant-list`,{
    Page,Per
})
//更新通道
export const merchantUpdate=(ID,MerchantNo,MerchantType,DownPayBranchs,UpPayBranchs,PayMin,PayMax,PublicKey,PrivateKey,Order) =>post(`${baseUrl.jingji}/shop/merchant-update`,{
    ID,
    MerchantNo,
    MerchantType,
    DownPayBranchs,
    UpPayBranchs,
    PayMin,
    PayMax,
    PublicKey,
    PrivateKey,
    Order
})



//添加支付账户
export const payaccountInsert=(MerchantID,PayBranch,Order,Account) =>post(`${baseUrl.jingji}/shop/payaccount-insert`,{
    MerchantID,PayBranch,Order,Account
})
//删除支付账户
export const payaccountDelete=(ID) =>post(`${baseUrl.jingji}/shop/payaccount-delete`,{
    ID
})
//支付账户列表
export const payaccountList=(Page,Per) =>post(`${baseUrl.jingji}/shop/payaccount-list`,{
    Page,Per
})
//更新支付账户
export const payaccountUpdate=(ID,Order,Account) =>post(`${baseUrl.jingji}/shop/payaccount-update`,{
    ID,Order,Account
})



//添加商品类型
export const goodstypeInsert=(merchantid,typename,imgurl,order) =>post(`${baseUrl.jingji}/shop/goodstype-insert`,{
    merchantid,typename,imgurl,order
})
//删除商品类型
export const goodstypeDelete=(id) =>post(`${baseUrl.jingji}/shop/goodstype-delete`,{
    id
})
//商品类型列表
export const goodstypeList=(page,per,condition) =>post(`${baseUrl.jingji}/shop/goodstype-list`,{
    page,per,condition
})
//更新商品类型
export const goodstypeUpdate=(id,typename,imgurl,order) =>post(`${baseUrl.jingji}/shop/goodstype-update`,{
    id,typename,imgurl,order
})



//添加商品
export const goodsInsert=(GoodsTypeID,TakenType,Price,PropType,GetAmount,GiftAmount,Expire,ImgUrl,Order) =>post(`${baseUrl.jingji}/shop/goods-insert`,{
    GoodsTypeID,TakenType,Price,PropType,GetAmount,GiftAmount,Expire,ImgUrl,Order
})
//删除商品
export const goodsDelete=(ID) =>post(`${baseUrl.jingji}/shop/goods-delete`,{
    ID
})
//商品列表
export const goodsList=(Page,Per,Condition) =>post(`${baseUrl.jingji}/shop/goods-list`,{
    Page,Per,Condition
})
//更新商品
export const goodsupdate=(ID,TakenType,Price,PropType,GetAmount,GiftAmount,Expire,ImgUrl,Order) =>post(`${baseUrl.jingji}/shop/goods-update`,{
    ID,TakenType,Price,PropType,GetAmount,GiftAmount,Expire,ImgUrl,Order
})

/**
 * 多支付通道--end
 * */

/**
 * 机器人设置--start
 * */
//赛事机器人总情况
export const robotMatch=(page,per,condition) =>post(`${baseUrl.jingji}/robot/match`,{
    page,per,condition
})
//赛事机器人数量详情
export const robotMatchDetail=(page,per,condition) =>post(`${baseUrl.jingji}/robot/match-detail`,{
    page,per,condition
})
//增加修改赛事机器人 type 1--增加 2--修改
export const robotSave=(match_id,robot_num,per_match_num,desc,type) =>post(`${baseUrl.jingji}/robot/save`,{
    match_id,robot_num,per_match_num,desc,type
})
//暂停
export const robotStop=(match_id) =>post(`${baseUrl.jingji}/robot/stop`,{
    match_id
})
//一键暂停
export const stopAll=(match_types) =>post(`${baseUrl.jingji}/robot/stop-all`,{
    match_types
})
//启动
export const robotStart=(match_id) =>post(`${baseUrl.jingji}/robot/start`,{
    match_id
})
//一键启动
export const startAll=(match_types) =>post(`${baseUrl.jingji}/robot/start-all`,{
    match_types
})
//删除机器人
export const robotDelete=(match_id) =>post(`${baseUrl.jingji}/robot/delete`,{
    match_id
})
/**
 * 机器人设置--end
 * */

/**
 * 系统设置--start
 * */
//
export const getRestartList=(Page,Count,Start,End) =>post(`${baseUrl.jingji}/getRestartList`,{
    Page,Count,Start,End
})
//
export const addRestart=(TipsTime,RestartTime,EndTime,RestartTitle,RestartType,RestartContent) =>post(`${baseUrl.jingji}/addRestart`,{
    TipsTime,RestartTime,EndTime,RestartTitle,RestartType,RestartContent
})
export const editRestart=(ID,TipsTime,RestartTime,EndTime,RestartTitle,RestartType,RestartContent) =>post(`${baseUrl.jingji}/editRestart`,{
    ID,TipsTime,RestartTime,EndTime,RestartTitle,RestartType,RestartContent
})
export const optRestart=(ID,Status) =>post(`${baseUrl.jingji}/optRestart`,{
    ID,Status
})


// 添加用户配置记录
export const adminInsert=(Account,PlaintextPass,Role,Owner) =>post(`${baseUrl.jingji}/admin-user/insert`,{
    Account,PlaintextPass,Role,Owner
})
// 删除用户配置记录
export const adminDelete=(ID) =>post(`${baseUrl.jingji}/admin-user/delete`,{
    ID
})
// 用户配置记录列表
export const adminLlist=(Page,Per,Condition) =>post(`${baseUrl.jingji}/admin-user/list`,{
    Page,Per,Condition
})
// 更新公告控制记录
export const adminUpdate=(ID,Account,PlaintextPass,Role,Owner,Power,Status) =>post(`${baseUrl.jingji}/admin-user/update`,{
    ID,Account,PlaintextPass,Role,Owner,Power,Status
})


/**
 * 系统设置--end
 * */
/**
 * 玩家反馈--start
 * */
// 反馈列表
export const feedbackList=(Page,Per,Start,End,Condition) =>post(`${baseUrl.jingji}/feedback/list`,{
    Page,Per,Start,End,Condition
})
// 更新反馈
export const feedbackUpdate=(ID,MailServiceType,ReplyTitle,AwardType,AwardNum,MailContent,ReadStatus,ReplyStatus) =>post(`${baseUrl.jingji}/feedback/update`,{
    ID,MailServiceType,ReplyTitle,AwardType,AwardNum,MailContent,ReadStatus,ReplyStatus
})
/**
 * 玩家反馈--end
 * */
/**
 * 大厅功能--start
 * */

// 添加邮件
export const mailcontrolInsert=(TargetID,Title,Content,Annexes,Expire,MailServiceType) =>post(`${baseUrl.jingji}/mailcontrol/insert`,{
    TargetID,Title,Content,Annexes,Expire,MailServiceType
})
// 删除邮件
export const mailcontrolDelete=(ID) =>post(`${baseUrl.jingji}/mailcontrol/delete`,{
    ID
})
// 邮件列表
export const mailcontrolList=(Page,Per) =>post(`${baseUrl.jingji}/mailcontrol/list`,{
    Page,Per
})
// 修改邮件
export const mailcontrolUpdate=(ID,TargetID,Title,Content,Annexes,Expire,Status,MailServiceType) =>post(`${baseUrl.jingji}/mailcontrol/update`,{
    ID,TargetID,Title,Content,Annexes,Expire,Status,MailServiceType
})
// 发送邮件
export const mailcontrolSendall=(Ids) =>post(`${baseUrl.jingji}/mailcontrol/sendall`,{
    Ids
})



// 添加道具
export const configInsert=(PropID,Name,ImgUrl) =>post(`${baseUrl.jingji}/propbase/config-insert`,{
    PropID,Name,ImgUrl
})
// 删除道具
export const configDelete=(ID) =>post(`${baseUrl.jingji}/propbase/config-delete`,{
    ID
})
// 道具列表
export const configList=(Page,Per) =>post(`${baseUrl.jingji}/propbase/config-list`,{
    Page,Per
})
// 更新道具
export const configUpdate=(ID,Name,ImgUrl) =>post(`${baseUrl.jingji}/propbase/config-update`,{
    ID,Name,ImgUrl
})

//每日福利列表
export const getDailyWelfareConfig=() =>get(`${baseUrl.jingji}/getDailyWelfareConfig`,{})
//每日福利编辑
export const editDailyWelfareConfig=(Config) =>post(`${baseUrl.jingji}/editDailyWelfareConfig`,{
    Config
})

//分享有奖列表
export const getShareAward=() =>get(`${baseUrl.jingji}/getShareAward`,{})
//分享有奖编辑
export const editShareAward=(SharePic,AwardItem,AwardNum,DailyLimit) =>post(`${baseUrl.jingji}/editShareAward`,{
    SharePic,AwardItem,AwardNum,DailyLimit
})

//添加跑马灯控制记录
export const horseLampInsert=(Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content) =>post(`${baseUrl.jingji}/horse-lamp/insert`,{
    Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content
})
//删除跑马灯控制记录
export const horseLampDelete=(ID) =>post(`${baseUrl.jingji}/horse-lamp/delete`,{
    ID
})
//跑马灯控制记录列表
export const horseLampList=(Page,Per,Start,End,Condition) =>post(`${baseUrl.jingji}/horse-lamp/list`,{
    Page,Per,Start,End,Condition
})
//更新跑马灯控制记录
export const horseLampUpdate=(ID,Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content,Status) =>post(`${baseUrl.jingji}/horse-lamp/update`,{
    ID,Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content,Status
})

//添加活动控制记录
export const activityInsert=(Order,Title,Img,Matchid,Link,PrevUpedAt,PrevDownedAt) =>post(`${baseUrl.jingji}/activity-control/insert`,{
    Order,Title,Img,Matchid,Link,PrevUpedAt,PrevDownedAt
})
//删除活动控制记录
export const activityDelete=(ID) =>post(`${baseUrl.jingji}/activity-control/delete`,{
    ID
})
//活动控制记录列表
export const activityList=(Page,Per,Start,End,Condition) =>post(`${baseUrl.jingji}/activity-control/list`,{
    Page,Per,Start,End,Condition
})
//更新活动控制记录
export const activityUpdate=(ID,Order,Title,Img,Matchid,Link,PrevUpedAt,PrevDownedAt,Status,ClickCnt) =>post(`${baseUrl.jingji}/activity-control/update`,{
    ID,Order,Title,Img,Matchid,Link,PrevUpedAt,PrevDownedAt,Status,ClickCnt
})

//添加公告控制记录
export const noticeInsert=(Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Img) =>post(`${baseUrl.jingji}/notice-control/insert`,{
    Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Img
})
//删除公告控制记录
export const noticeDelete=(ID) =>post(`${baseUrl.jingji}/notice-control/delete`,{
    ID
})
//公告控制记录列表
export const noticeList=(Page,Per,Start,End,Condition) =>post(`${baseUrl.jingji}/notice-control/list`,{
    Page,Per,Start,End,Condition
})
//更新公告控制记录
export const noticeUpdate=(ID,Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Status,Img) =>post(`${baseUrl.jingji}/notice-control/update`,{
    ID,Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Status,Img
})

/**
 * 大厅功能--end
 * */
/**
 * 财务报表--start
 * */

//总盈利图 MapPeriod:1-今日，2-本周，3-本月，4-全年，
export const getFisrtViewMap=(MapPeriod) =>post(`${baseUrl.jingji}/getFisrtViewMap`,{
    MapPeriod
})
// 赛事奖金发放占比图
export const getMatchPercentMap=(Start,End) =>post(`${baseUrl.jingji}/getMatchPercentMap`,{
    Start,End
})
//每日购买/每日消耗点券数
export const getWeekBuyAndUse=() =>get(`${baseUrl.jingji}/getWeekBuyAndUse`,{})
//列表  1按购买次数降序,2按购买次数升序,3按周涨幅降序,4按周涨幅升升序
export const getItemUseList=(Page,Count,Sort) =>post(`${baseUrl.jingji}/getItemUseList`,{
    Page,Count,Sort
})
//提现数额次数占比  1总数据,2昨日,3上周,4本周,5上月,6本月,7全年
export const getTotalCashoutPercent=(MapPeriod) =>post(`${baseUrl.jingji}/getTotalCashoutPercent`,{
    MapPeriod
})
//充值明细界面
export const getChargeDetail=(Start,End,Page,Count) =>post(`${baseUrl.jingji}/getChargeDetail`,{
    Start,End,Page,Count
})
//提现明细界面
export const getCashoutDetail=(Start,End,Page,Count) =>post(`${baseUrl.jingji}/getCashoutDetail`,{
    Start,End,Page,Count
})
//赛事奖金总览界面
export const getMatchAwardPreview=(Start,End,Page,Count,MatchID,MatchName) =>post(`${baseUrl.jingji}/getMatchAwardPreview`,{
    Start,End,Page,Count,MatchID,MatchName
})
/**
 * 财务报表--end
 * */
/**
 * 数据报表--end
 * */
//数据分析 top
export const getAnalysisFirstView=() =>get(`${baseUrl.jingji}/getAnalysisFirstView`,{})
//数据分析 折线图 ReqType请求类型,1新增用户,2活跃用户,3累计用户,4充值总额/提现总额,5赛事消耗场,6新用户次日留存率
export const getAnalysisTotalMap=(Start,End,ReqType) =>post(`${baseUrl.jingji}/getAnalysisTotalMap`,{
    Start,End,ReqType
})
//数据分析 柱状图 ReqType请求类型,1充值金额/提现金额,2点券赠送/点券消耗/奖金发放柱状图
export const getAnalysisBarMap=(Start,End,ReqType) =>post(`${baseUrl.jingji}/getAnalysisBarMap`,{
    Start,End,ReqType
})

//赛事分析
export const getAnalysisMatch=(Start,End,Page,Count,AgentID) =>post(`${baseUrl.jingji}/getAnalysisMatch`,{
    Start,End,Page,Count,AgentID
})
//用户分析
export const getAnalysisPlayers=(Start,End,Page,Count,AgentID) =>post(`${baseUrl.jingji}/getAnalysisPlayers`,{
    Start,End,Page,Count,AgentID
})
//新增用户分析
export const getAnalysisNewPlayers=(Start,End,Page,Count,AgentID) =>post(`${baseUrl.jingji}/getAnalysisNewPlayers`,{
    Start,End,Page,Count,AgentID
})
//充值额度分析
export const getAnalysisCharge=(Start,End,Page,Count,) =>post(`${baseUrl.jingji}/getAnalysisCharge`,{
    Start,End,Page,Count,
})
//用户点券余额分布分析界面
export const getAnalysisPlayerCoupon=(Start,End,Page,Count,) =>post(`${baseUrl.jingji}/getAnalysisPlayerCoupon`,{
    Start,End,Page,Count,
})
//用户使用点券分布分析界面
export const getAnalysisCouponUse=(Start,End,Page,Count,) =>post(`${baseUrl.jingji}/getAnalysisCouponUse`,{
    Start,End,Page,Count,
})
//用户赛事奖金获得分布分析界面
export const getAnalysisAward=(Start,End,Page,Count,) =>post(`${baseUrl.jingji}/getAnalysisAward`,{
    Start,End,Page,Count,
})


/**
 * 数据报表--end
 * */
