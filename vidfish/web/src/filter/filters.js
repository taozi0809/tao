
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
export {isFilter,isNameFilter,timesFilter,timestampToTime,isPromotionM,isPromotionY,gender,timestampToTime1,cardType,langToName}