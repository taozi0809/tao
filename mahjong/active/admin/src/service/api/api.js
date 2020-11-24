import {baseUrl} from "../base";
import {post,get} from "../axios";

//登录
export const login=(account,password) =>post(`${baseUrl.user}/login`,{
    account,password
})
//获取礼物列表
export const prizeList=(start,end,page,per,condition) =>get(`${baseUrl.user}/prize`,{start,end,page,per,condition})
//兑换奖品
export const prizeUpdate=(accountid,code) =>post(`${baseUrl.user}/prize/update`,{accountid,code})




















