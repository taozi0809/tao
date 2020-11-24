import md5 from 'js-md5'

const YXB={
    device : "WEB",
    deviceId :"none",
    lang : 'ZH',
    // partnerKey :'youxibi_shenzhouxing_titan',
    // secretKey : '3FFF00AE8A7EEEA4E053C82EF509EA57',
    partnerKey :'youxibi_shenzhouxing_gc',
    secretKey : 'EA6CD4B2ACB4AAFBBCE4716805DA8045',
    signType : "NORMAL",
    versionCode : 100,
    versionName :'1.0',
}

var yxbCotMd5=(method,params)=>{
    var yxb={}
    if(!!params){
        yxb={
            device :YXB.device,
            deviceId :YXB.deviceId,
            lang : YXB.lang,
            method:method,
            params:JSON.stringify(params),
            partnerKey :YXB.partnerKey,
            secretKey : YXB.secretKey,
            sendTime :new Date().getTime(),
            signType : YXB.signType,
            versionCode : YXB.versionCode,
            versionName :YXB.versionName,
        }
    }
    else{
        yxb={
            device :YXB.device,
            deviceId :YXB.deviceId,
            lang : YXB.lang,
            method:method,
            partnerKey :YXB.partnerKey,
            secretKey : YXB.secretKey,
            sendTime : new Date().getTime(),
            signType : YXB.signType,
            versionCode : YXB.versionCode,
            versionName :YXB.versionName,
        }
    }

    let content=""
    for(let i in yxb){
        content=content+i+"="+yxb[i]+"&"
    }
    yxb['sign'] = md5(content.substring(0, content.length - 1));
    return yxb
}
export default yxbCotMd5






