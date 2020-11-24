import {YXB} from "./YXB";
import fetch from './fetch'

/*
* h5 邀请注册体坛
* */

// 1.注册
export const link_register_with_link = (identify,captcha,phoneNumber,password,inviteCode) => fetch({
    method:'shenzhouxing.link.register.with.link',
    data:{identify,captcha,phoneNumber,password,inviteCode}
},YXB.url.chat_link+'/client.do')
// 2.获取验证码
export const sms_send_captcha = (contentCode,key,phoneNumber) => fetch({
    method:'youxibi.sms.send.captcha',
    data:{contentCode,key,phoneNumber}
},YXB.url.coin+'/client.do')
// 3.获取key
export const user_identify = () => fetch({
    method:'youxibi.user.identify',
    data:{}
},YXB.url.coin+'/client.do')

