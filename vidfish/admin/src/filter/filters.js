
let gender = value =>{
    if(value=='0'){
        return '男'
    }else if(value=='1'){
        return '女'
    }else{
        return '未填'
    }
}
let isFilter = value =>{
    return value=='0'?'是':'否'
}
let isPromotionM = value =>{
    return value=='0'?'是':'否'
}
let isPromotionY = value =>{
    return value=='1'?'是':'否'
}
let isNameFilter = value =>{
    return value==''||value===null?'未设置':value
}
let timesFilter = value =>{
    return value==''||value===null?'0':value
}
let cardType = value =>{
    return value=='0'?'月卡':'年卡'
}
let langToName = (value1,value2)=>{
    if(value1!=''&&value1!=undefined&&value1!=null){
        return value2[value1]
    }
}
let productIdToName = value =>{
    switch (value){
        case 1:
            return '月卡'
            break;
        case 2:
            return '年卡'
            break;
        case 3:
            return '订阅月卡'
            break;
        case 4:
            return '订阅年卡'
            break;
    }
}
let payStatusToName = value=>{
    switch (value){
        case 0:
            return '预支付'
            break;
        case 1:
            return '支付成功'
            break;
        case 2:
            return '支付取消或支付失败'
            break;
    }
}

let isTheme = value=>{
    switch (value){
        case 1:
            return '登录'
            break;
        case 2:
            return '注册'
            break;
        case 3:
            return '支付'
            break;
        case 4:
            return '操作帮助'
            break;
    }
}

let isType = value=>{
    switch (value){
        case 1:
            return '图片'
            break;
        case 2:
            return '文档'
            break;
        case 3:
            return '视频'
            break;
    }
}

let timestampToTime = value =>{
    if(value){
        let date = new Date(value );
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() ;
        let s = date.getSeconds();
        return Y+M+D +' '+h+m;
    }
}
let timestampToTime1 = value =>{
    if(value){
        let date = new Date(value );
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() ;
        let s = date.getSeconds();
        return Y+M+D
    }
}
let langToNameA=value=>{
    switch (value){
        case 'ZH':return'中文';break;
        case 'EN':return'英文';break;
        case 'IND':return'印尼';break;
        case 'ES':return'葡萄牙';break;
        case 'PT':return'西班牙';break;
    }
}

export {isFilter,isNameFilter,timesFilter,timestampToTime,isPromotionY,gender,timestampToTime1,langToName,
    productIdToName,payStatusToName,isTheme,isType,langToNameA}