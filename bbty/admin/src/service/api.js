import {baseUrl} from "../data/base";
import {post} from "./axios";

/*用户活跃数据*/
export const activeData=(startDate,endDate) => post(`${baseUrl.user}/server.do`,{
    method:'youxibi.user.active.data',
    data:{startDate,endDate}
})

/*用户活跃历史数据*/
export const historyData=(startDate,endDate) => post(`${baseUrl.user}/server.do`,{
    method:'youxibi.user.active.history.data',
    data:{startDate,endDate}
})