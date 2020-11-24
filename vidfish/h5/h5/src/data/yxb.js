import md5 from 'js-md5'
var yxbCotMd5=(method,params)=>{
    var yxb={
        device : "WEB",
        deviceId :"none",
        lang : 'ZH',
        partnerKey :'overseas_fish_app',
        secretKey : '6EB84343B8FD7CE57B6F92506B30985A',
        signType : "NORMAL",
        versionCode : 100,
        versionName :'1.0',
    }
    if(!!params){
        yxb={
            device :yxb.device,
            deviceId :yxb.deviceId,
            lang : yxb.lang,
            method:method,
            params:JSON.stringify(params),
            partnerKey :yxb.partnerKey,
            secretKey : yxb.secretKey,
            sendTime :new Date().getTime(),
            signType : yxb.signType,
            versionCode : yxb.versionCode,
            versionName :yxb.versionName,
        }
    }
    else{
        yxb={
            device :yxb.device,
            deviceId :yxb.deviceId,
            lang : yxb.lang,
            method:method,
            partnerKey :yxb.partnerKey,
            secretKey : yxb.secretKey,
            sendTime :new Date().getTime(),
            signType : yxb.signType,
            versionCode : yxb.versionCode,
            versionName :yxb.versionName,
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






