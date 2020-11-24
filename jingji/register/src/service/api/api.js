import {baseUrl} from "../base";
import {post} from "../axios";

//注册
export const register=(data) =>post(`${baseUrl.register}/register`,{
    data
})
//登录
export const loginverify=(data) =>post(`${baseUrl.register}/loginverify`,{
    data
})
//验证码
export const getCode=(data) =>post(`${baseUrl.register}/code`,{
    data
})
