import fetch from '../assets/config/fetch'
import {YXB} from "../assets/config/YXB";


//0.获取语言版本信息
export const languageSelect = () => fetch({
    method:'vidfish.language.select',
    data:{}
})


//1.获取视频类型列表接口
export const videoGenre = (lang) => fetch({
    method:'vidfish.video.genre',
    data:{lang}
})

//2.获取视频类型列表接口-电影、电视剧
export const videoType = () => fetch({
    method:'vidfish.video.type',
    data:{}
})


//3.获取视频资源列表接口
export const baseList = (ip,lon,lat,typeName,genreName,isRecommend,isNew,isVip,lang,pageNum,pageSize,contry) => fetch({
    method:'vidfish.video.base.list',
    data:{ip,lon,lat,typeName,genreName,isRecommend,isNew,isVip,lang,pageNum,pageSize,contry}
})


//4.根据id获取电影视频详情
export const movieBaseDetails = (contry,id,lang,source='1') => fetch({
    method:'vidfish.movie.base.details',
    data:{contry,id,lang,source}
})

//5.根据id获取电视剧集详情
export const dramaBaseDetails = (ip,lon,lat,parentId,lang,start,end,source='1') => fetch({
    method:'vidfish.drama.base.details',
    data:{ip,lon,lat,parentId,lang,start,end,source}
})

//6、用户登录接口
export const userLogin = (account,password,lang) => fetch({
    method:'vidfish.user.login',
    data:{account,password,lang}
})

//7、用户是否是vip
export const vipUserInfo = (token) => fetch({
    method:'vidfish.vip.user.info',
    data:{token}
})

//8、用户播放历史记录列表查询接口
export const playbackRecords = (token,lang,pageNum,pageSize) => fetch({
    method:'vidfish.playback.records',
    data:{token,lang,pageNum,pageSize}
})

//9、注册接口
export const vidfishUserRegist = (userName,account,password,checkCode,inviteCode,promotionType,promotionCode,birthday,photoUrl,gender) => fetch({
    method:'vidfish.user.regist',
    data:{userName,account,password,checkCode,inviteCode,promotionType,promotionCode,birthday,photoUrl,gender}
})

//10、注册码发送接口
export const emailSendCheckCode = (phoneNumber,email,lang) => fetch({
    method:'vidfish.email.send.check.code',
    data:{phoneNumber,email,lang}
})

//11、根据用户输入的关键词检索视频资源
export const userSearchVideo = (lon,lat,typeName,genreName,videoName,ip,contry,lang,token) => fetch({
    method:'vidfish.user.search.video',
    data:{lon,lat,typeName,genreName,videoName,ip,contry,lang,token}
})


//12、根据用户所在国家获取支付平台列表
export const defrayPlatformList = (contryName,enable_) => fetch({
    method:'youxibi.defray.platform.list',
    data:{contryName,enable_}
},YXB.url.zf)

//13、根据经纬度获取国家简称
export const positionHhortName = (lon,lat) => fetch({
    method:'vidfish.position.short.name',
    data:{lon,lat}
})

//13、根据用户token获取用户最新信息
export const userTokenGetinfo = (token) => fetch({
    method:'vidfish.user.token.getinfo',
    data:{token}
})


//14、用户信息设置接口
export const userSetting = (token,birthday,cancellation,gender,isPush,parentControl,parentPassword,userName,email,phoneNumber,changeEmailCode,changePhoneCode) => fetch({
    method:'vidfish.user.setting',
    data:{token,birthday,cancellation,gender,isPush,parentControl,parentPassword,userName,email,phoneNumber,changeEmailCode,changePhoneCode}
})

//14.用户修改密码/忘记密码
export const userChangePassword = (account,checkCode,password,rePassword) => fetch({
    method:'vidfish.user.changePassword',
    data:{account,checkCode,password,rePassword}
})

//15.获取单笔购买链接
export const paypalPay = (total,currency,method,intent,description,rebackSuccessUrl,rebackCancelUrl,idCode,productId,productType) => fetch({
    method:'youxibi.paypal.pay',
    data:{total,currency,method,intent,description,rebackSuccessUrl,rebackCancelUrl,idCode,productId,productType}
},YXB.url.zf)


//15.获取产品信息列表
export const payProductlist = () => fetch({
    method:'youxibi.pay.product.list',
    data:{}
},YXB.url.zf)

//16.创建计划
export const paypalCreatePlan = (product_id,name,description,billing_cycles,payment_preferences,taxes) => fetch({
    method:'youxibi.paypal.create.plan',
    data:{product_id,name,description,billing_cycles,payment_preferences,taxes}
},YXB.url.zf)

//17.创建订阅
export const paypalCreateSubscription = (subscriber,name,email_address,return_url,cancel_url) => fetch({
    method:'youxibi.paypal.create.subscription',
    data:{subscriber,name,email_address,return_url,cancel_url}
},YXB.url.zf)


//18.根据经纬度获取国家简称
export const positionShortName = (lon,lat,ip) => fetch({
    method:'vidfish.position.short.name',
    data:{lon,lat,ip}
})

//19.视频点击率累计
export const videoClickTimes = (id) => fetch({
    method:'vidfish.video.click.times',
    data:{id}
})

//20.视频播放量累计
export const playbackStatTimes = (resourceId) => fetch({
    method:'vidfish.playback.stat.times',
    data:{resourceId}
})

//21.用户播放记录保存接口
export const playbackSave = (token,resourceId,duration,typeName) => fetch({
    method:'vidfish.playback.save',
    data:{token,resourceId,duration,typeName}
})

//22.促销码
export const rechargeUse = (token,code,partnerKey) => fetch({
    method:'vidfish.recharge.use',
    data:{token,code,partnerKey}
})

//23.用户使用免费码
export const freeCodeUse = (token,code,partnerKey,area,lang) => fetch({
    method:'vidfish.free.code.use',
    data:{token,code,partnerKey,area,lang}
})

//24.查询视频栏目列表
export const videoItemList = (genreName,typeName,contry,pageSize,pageNum,lang,id) => fetch({
    method:'vidfish.video.item.list',
    data:{genreName,typeName,contry,pageSize,pageNum,lang,id}
})

//25.添加子账户
export const subaccountAdd = (parentId,email,password) => fetch({
    method:'vidfish.user.subaccount.add',
    data:{parentId,email,password}
})
//26.子账户列表
export const subaccountList = (parentId) => fetch({
    method:'vidfish.user.subaccount.list',
    data:{parentId}
})
//27.删除子账户
export const subaccountDelete = (id) => fetch({
    method:'vidfish.user.subaccount.delete',
    data:{id}
})
//28.子账户解绑
export const subaccountUnited = (id) => fetch({
    method:'vidfish.user.subaccount.untied',
    data:{id}
})
