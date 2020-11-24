import {baseUrl} from "../data/base";
import {post,uploadImg} from "./axios";

/*登录*/
export const loginPassword=(account,password) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.login.password',
    data:{account,password}
})
//查询资产
export const balanceList=(userName,token) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.coin.balance.list',
    data:{userName,token}
})

//init user
export const userInit=(userName,token,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.init',
    data:{userName,token,type}
})

//好友列表
export const friendRelationList=(userName,token) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.list',
    data:{userName,token}
})

//通过idcode查询用户信息
export const getUserInfo=(userIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.info',
    data:{userIdCode}
})
//通过idcodes查询用户信息
export const userInfos=(userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.infos',
    data:{userIdCodes}
})

//获取某用户标记状态
export const friendMark=(idCode,token,userName) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.get.friend.mark',
    data:{idCode,token,userName}
})


//获取背景
export const badgeInfo=(badgeCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.badge.info',
    data:{badgeCode}
})
//获取称号
export const bubbleInfo=(bubbleCode,size) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.bubble.info',
    data:{bubbleCode,size}
})

//好友申请列表
export const friendRelationApplyList=(userName,token) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.apply.list',
    data:{userName,token}
})


//进入聊天
export const userChatStateIn=(userName,token,groupIdCode,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.chat.state.in',
    data:{userName,token,groupIdCode,type}
})
//退出聊天
export const userChatStateOut=(userName,token,groupIdCode,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.chat.state.out',
    data:{userName,token,groupIdCode,type}
})
//创建好友对话
export const userChatCreate=(userName,token,userIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.chat.create',
    data:{userName,token,userIdCode}
})
//历史消息列表
export const userChatHistory=(beginTime,lastTime,userName,token,groupIdCode,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.user.chat.history',
    data:{beginTime,lastTime,userName,token,groupIdCode,type}
})


//给群聊/好友发送消息
export const messageSend=(uid,userName,token,content,groupIdCode,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.message.send',
    data:{uid,userName,token,content,groupIdCode,type}
})

//同意好友申请
export const relationAgree=(userName,token,friendIdCode,applyContent) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.agree',
    data:{userName,token,friendIdCode,applyContent}
})
//拒绝好友申请
export const relationDisagree=(userName,token,friendIdCode,applyContent) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.disagree',
    data:{userName,token,friendIdCode,applyContent}
})
//删除好友
export const relationDelete=(userName,token,friendIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.delete',
    data:{userName,token,friendIdCode}
})


//创建群聊
export const groupCreate=(userName,token,name,type,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.create',
    data:{userName,token,name,type,userIdCodes}
})
//群详情
export const groupInfo=(userName,token,groupIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.info',
    data:{userName,token,groupIdCode}
})
//修改群名
export const groupEdit=(userName,token,groupIdCode,groupName) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.edit',
    data:{userName,token,groupIdCode,groupName}
})
//修改加群是否需要审核
export const groupEditType=(userName,token,groupIdCode,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.edit',
    data:{userName,token,groupIdCode,type}
})

//发布群公告
export const groupChatAddNotice=(userName,token,link,content,groupIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.chat.add.notice',
    data:{userName,token,link,content,groupIdCode}
})
//申请进群
export const groupJoinApply=(userName,token,groupIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.join.apply',
    data:{userName,token,groupIdCode}
})
//同意进群
export const groupJoinAgree=(userName,token,groupIdCode,userIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.join.agree',
    data:{userName,token,groupIdCode,userIdCode}
})
//申请加入群列表
export const groupJoinApplyList=(userName,token,groupIdCode,page,pageSize) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.join.apply.list',
    data:{userName,token,groupIdCode,page,pageSize}
})
//添加群成员
export const groupJoin=(userName,token,groupIdCode,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.join',
    data:{userName,token,groupIdCode,userIdCodes}
})
//删除群成员
export const groupDelete=(userName,token,groupIdCode,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.delete',
    data:{userName,token,groupIdCode,userIdCodes}
})
//退出群
export const groupOut=(userName,token,groupIdCode,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.out',
    data:{userName,token,groupIdCode,userIdCodes}
})
//销毁群
export const groupDestroy=(userName,token,groupIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.destroy',
    data:{userName,token,groupIdCode}
})
//群主管理权转让
export const groupSetHolder=(userName,token,groupIdCode,idCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.set.holder',
    data:{userName,token,groupIdCode,idCode}
})

//删除群管理员
export const groupRemoveManager=(userName,token,groupIdCode,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.remove.manager',
    data:{userName,token,groupIdCode,userIdCodes}
})
//添加群管理员
export const groupAddManager=(userName,token,groupIdCode,userIdCodes) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.group.add.manager',
    data:{userName,token,groupIdCode,userIdCodes}
})
//群二维码
export const qrGroupinfo=(groupIdCode) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.qr.groupinfo',
    data:{groupIdCode}
})

//查找用户
export const userInfo=(account) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.info',
    data:{account}
})
//添加好友
export const friendRelationApply=(userName,token,friendIdCode,applyContent) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.user.friend.relation.apply',
    data:{userName,token,friendIdCode,applyContent}
})

//上传图片
export const upload=(code,file) => uploadImg(`${baseUrl.upload}/client.do`,{
    method:'youxibi.upload.do',
    data:{code,file}
})
//发送图片
export const sendPic=(uid,userName,token,groupIdCode,picUrl,width,height,type) => post(`${baseUrl.core}/client.do`,{
    method:'youxibi.chat.message.send.pic',
    data:{userName,token,uid,groupIdCode,picUrl,width,height,type}
})

//查看红包状态红包 DOING->红包领取中 TAKEN->红包领取完成  OVERTIME->红包已过期  OVER->手慢了，红包派完了
export const packetCheck=(userName,token,packetId,packetUserIdCode) => post(`${baseUrl.app}/client.do`,{
    method:'shenzhouxing.circle.packet.check',
    data:{userName,token,packetId,packetUserIdCode}
})
//查看红包详情
export const getPacketInfo=(userName,token,packetId,packetUserIdCode) => post(`${baseUrl.app}/client.do`,{
    method:'shenzhouxing.circle.packet.info',
    data:{userName,token,packetId,packetUserIdCode}
})
//领取红包
export const packetTake=(userName,token,packetId,packetUserIdCode) => post(`${baseUrl.app}/client.do`,{
    method:'shenzhouxing.circle.packet.take',
    data:{userName,token,packetId,packetUserIdCode}
})

//私聊发送包
export const packetCreateNormal=(userName,token,chatGroupIdCode,toUserIdCode,chatType,coinName,moneyCode,sum,desc) => post(`${baseUrl.app}/client.do`,{
    method:'shenzhouxing.circle.packet.create.normal',
    data:{userName,token,chatGroupIdCode,toUserIdCode,chatType,coinName,moneyCode,sum,desc}
})
//群聊发送包
export const packetCreateNormalGroup=(userName,token,chatGroupIdCode,chatType,coinName,moneyCode,size,sum,desc) => post(`${baseUrl.app}/client.do`,{
    method:'shenzhouxing.circle.packet.create.normal',
    data:{userName,token,chatGroupIdCode,chatType,coinName,moneyCode,size,sum,desc}
})

















