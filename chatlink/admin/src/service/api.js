import {baseUrl} from "../data/base";
import {post} from "./axios";

export const tradeData=(date) => post(`${baseUrl.otc}/server.do`,{
    method:'shenzhouxing.otc.trade.data',
    data:{date}
})

export const activeData=(date) => post(`${baseUrl.user}/server.do`,{
    method:'youxibi.user.active.data',
    data:{date}
})

export const historyData=(date) => post(`${baseUrl.user}/server.do`,{
    method:'youxibi.user.active.history.data',
    data:{date}
})