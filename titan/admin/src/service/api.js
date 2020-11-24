import {baseUrl} from "../data/base";
import {post} from "./axios";

/*登录*/
export const managerLogin=(account,password) => post(`${baseUrl.manage}/server.do`,{
    method:'shenzhouxing.manager.login',
    data:{account,password}
})

/*管理员菜单*/
export const managerMenu=(managerToken) => post(`${baseUrl.manage}/server.do`,{
    method:'shenzhouxing.manager.menu',
    data:{managerToken}
})


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

/*通过手机号查找用户*/
export const phoneNumber=(phoneNumber) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.user.info.by.phone.number',
    data:{phoneNumber}
})

/*创建代理*/
export const createAgency=(managerToken,userIdCode,rebatePercent) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.create.agency',
    data:{managerToken,userIdCode,rebatePercent}
})

/*修改代理*/
export const updateAgency=(managerToken,agencyId,rebatePercent,remark) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.update.agency',
    data:{managerToken,agencyId,rebatePercent,remark}
})

/*代理列表*/
export const agencyList=(managerToken,page,pageSize) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.agency.list',
    data:{managerToken,page,pageSize}
})

/*代理详情*/
export const agencyInfo=(managerToken,agencyId) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.agency.info',
    data:{managerToken,agencyId}
})

/*代理用户列表*/
export const userList=(managerToken,page,pageSize) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.user.list',
    data:{managerToken,page,pageSize}
})

/*代理用户消费订单列表*/
export const userOrderList=(managerToken,userId,page,pageSize) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.user.order.list',
    data:{managerToken,userId,page,pageSize}
})

/*代理的财务统计*/
export const financeInfo=(managerToken) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.finance.info',
    data:{managerToken}
})

/*代理的返利流水记录*/
export const profitList=(managerToken,agencyId,page,pageSize) => post(`${baseUrl.agent}/server.do`,{
    method:'agency.profit.list',
    data:{managerToken,agencyId,page,pageSize}
})
