import {post,postUpload} from "./axios/axios";
import baseUrl from '../data/base'


/*
* upload
* */
export const uploadDo = (code,file) => post(`${baseUrl.upload}/client.do`,{
    method:'youxibi.upload.do',
    data:{code}
})
export const postUploadDo = (code,file) => postUpload(`${baseUrl.upload}/client.do`,{
    method:'youxibi.upload.do',
    data:{code}
},file)

/*
* 钱包列表
* */
export const coinBalanceList = (userName,token) => post(`${baseUrl.coin}/client.do`,{
    method:'youxibi.coin.balance.list',
    data:{userName,token}
})

/*
* 1、增加付款方式信息
* */
export const addPaymentMethod = (userName,token,account,beneficiaryName,paymentMethodId,qrCodeUrl) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.add.payment.method',
    data:{userName,token,account,beneficiaryName,paymentMethodId,qrCodeUrl}
})
/*
* 4、用户支付方式列表
* */
export const userPaymentMethod = (userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.user.payment.method',
    data:{userName,token}
})

/*
* 5、支付方式列表
* */
export const paymentMethod = () => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.payment.method',
    data:{}
})

/*
* 6、币商创建出售交易
* */
export const createSellTrade = (coinId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,merchantPaymentMethodIds,userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.create.sell.trade',
    data:{
        coinId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,merchantPaymentMethodIds,userName,token
    }
})

/*
* 7、币商创建购买交易
* */
export const createBuyTrade = (coinId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.create.buy.trade',
    data:{
        coinId,amount,price,startTradeTime,endTradeTime,
        minTradePrice,maxTradePrice,paymentMethodIds,userName,token
    }
})

/*
* 8、币商创建交易列表
* */
export const tradeList = (userName,token,status,tradeType,page,pageSize) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.trade.list',
    data:{userName,token,status,tradeType,page,pageSize}
})

/*
* 9、修改交易的接单状态
* */
export const updateTradeStatus = (userName,token,tradeId,status) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.update.trade.status',
    data:{userName,token,tradeId,status}
})

/*
* 8.修改支付方式
* */
export const updatePaymentMethod = (userName,token,account,beneficiaryName,userPaymentId,qrCodeUrl) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.update.payment.method',
    data:{userName,token,account,beneficiaryName,userPaymentId,qrCodeUrl}
})

/*
* 26、增加商家付款方式信息
* */
export const addMerchantPaymentMethod = (userName,token,paymentMethodInfo,paymentMethodId) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.add.merchant.payment.method',
    data:{userName,token,paymentMethodInfo,paymentMethodId}
})

/*
* 27、删除商家支付方式
* */
export const deleteMerchantPaymentMethod = (userName,token,merchantPaymentId) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.delete.merchant.payment.method',
    data:{userName,token,merchantPaymentId}
})

/*
* 28、修改商家支付方式
* */
export const updateMerchantPaymentMethod = (userName,token,merchantPaymentId,paymentMethodInfo,globalUpdate) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.update.merchant.payment.method',
    data:{userName,token,merchantPaymentId,paymentMethodInfo,globalUpdate}
})

/*
* 29、商家支付方式列表
* */
export const merchantPaymentMethod = (userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.merchant.payment.method',
    data:{userName,token}
})
/*
* 30、商家出售交易详情
* */
export const sellTradeDetails = (userName,token,tradeId) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.sell.trade.details',
    data:{userName,token,tradeId}
})
/*
* 31、商家收购交易详情
* */
export const buyTradeDetails = (userName,token,tradeId) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.buy.trade.details',
    data:{userName,token,tradeId}
})
/*
* 32、删除交易
* */
export const deleteTrade = (userName,token,tradeId) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.delete.trade',
    data:{userName,token,tradeId}
})
/*
* 33、修改商家买入交易
* */
export const updateBuyTrade = (tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.update.buy.trade',
    data:{tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,userName,token}
})
/*
* 34、修改商家卖出交易
* */
export const updateSellTrade = (tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.update.sell.trade',
    data:{tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,userName,token}
})
/*
* 35.修改商家卖出交易的收款方式
* */
export const sellTradePaymentMethodUpdate = (userName,token,merchantPaymentId,paymentMethodId,tradeId,paymentMethodInfo) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.sell.trade.payment.method.update',
    data:{userName,token,merchantPaymentId,paymentMethodId,tradeId,paymentMethodInfo}
})

/*
* 36.查询币商的支付方式是否设置为自动获取
* */
export const autoPayInfo = (userName,token) => post(`${baseUrl.otc}/client.do`,{
    method:'shenzhouxing.otc.check.auto.pay.info',
    data:{userName,token}
})