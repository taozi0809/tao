let timestampToTime = value =>{
    if(!!value){
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return h+':'+minute
    }
}
let timestampToTime1 = value =>{
    if(!!value){
        value=JSON.stringify(value)
        if(value.length==10){value=parseInt(value)*1000}
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y+'-'+m+'-'+d+' '+h+':'+minute
    }
}
let timestampToTime2 = value =>{
    if(!!value){
        value=JSON.stringify(value)
        if(value.length==10){value=parseInt(value)*1000}
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y+'-'+m+'-'+d+' '+h+':'+minute+':'+second
    }
}
let timestampToTime3 = value =>{
    switch (value) {
        case -1:return '永久';break;
        case 86400:return '1天';break;
        case 259200:return '3天';break;
        case 604800:return '7天';break;
        case 2592000:return '30天';break;
    }
}

let payArrToStr = (arr1,arr2)=>{
     let str1=''
     let str2=''
     let str = ''
     for(let i in arr1){
         str1+=numToStr(arr1[i])+'，'
     }
     for(let i in arr2){
         str2+=numToStr(arr2[i])+'，'
     }
     function numToStr(num){
         switch (num) {
             case 1:return'微信';break;
             case 2:return'支付宝';break;
             case 3:return'IOS';break;
             default:
                 return ''
         }
     }
    str=str1 + str2
    str=str.substr(0, str.length - 1)
    return str

}

let stateToName=value=>{
    if(!!value){
        switch (value){
            case '0':return'未开始';break;
            case '1':return'已结束';break;
            case '2':return'进行中';break;
            default:
                return ''

        }
    }
}
let cToName=value=>{
    if(!!value){
        switch (value){
            case 'results':return'胜平负';break;
            case 'score':return'比分';break;
            case 'totalGoal':return'总进球';break;
            case 'ou':return'大小分';break;
            case 'ah':return'亚洲让球';break;
            case 'ht2ft':return'半全场';break;
            case 'multipleSelection':return'串关';break;
            default:
                return ''
        }
    }
}
let roleToName=value=>{
   value=JSON.stringify(value)
    switch (value){
        case '-2':return'机器人';break;
        case '-1':return'拉黑';break;
        case '1':return'普通玩家';break;
        case '2':return'二级代理';break;
        case '3':return'一级代理';break;
        case '4':return'超级管理员';break;
        default:
            return ''
    }

}

export const actiontypeToS=value=>{
    switch (value){
        case 0:return'点券';break;
        case 1:return'税后奖金';break;
        case 2:return'碎片';break;
        default:
            return ''
    }
}
export const goodtypeToS=value=>{
    switch (value){
        case 1:return'点券';break;
        case 2:return'税后奖金';break;
        default:
            return ''
    }
}

export const OptTypeToS=value=>{
    switch (value){
        case 1:return'常规操作';break;
        case 2:return'赛事操作';break;
        case 3:return'充值操作';break;
        case 4:return'碎片兑换操作';break;
        case 5:return'签到操作';break;
        case 6:return'邮件操作';break;
        case 7:return'活动操作';break;
        case 8:return'平台操作';break;
        default:
            return ''
    }
}

export const payOptions=[
    {
        value:1,
        label:"微信"
    },
    {
        value:2,
        label:"支付宝"
    },
    {
        value:3,
        label:"IOS"
    },
]


export const TakenTypeOptions=[
    {
        value:1,
        label:'RMB'
    }
]

export const PropTypeOptions=[
    {
        value:1,
        label:'点券'
    }
]
export const ExpireOptions=[
    {
        value:-1,
        label:"永久"
    },
    {
        value:86400,
        label:"1天"
    },
    {
        value:259200,
        label:"3天"
    },
    {
        value:604800,
        label:"7天"
    },
    {
        value:2592000,
        label:"30天"
    },
]
export const MatchLevelOptions=[
    {
        value:1,
        label:"海选赛事"
    },
    {
        value:2,
        label:"C级赛事"
    },
    {
        value:3,
        label:"B级赛事"
    },
    {
        value:4,
        label:"A级赛事"
    },
    {
        value:5,
        label:"全国公开赛"
    },
    {
        value:6,
        label:"全国锦标赛"
    },
]
export const MerchantTypeOptions=[
    {
        value:1,
        label:"体总"
    },
    // {
    //     value:2,
    //     label:"真人美女斗地主"
    // }
]

let MatchLevelToStr = (value)=>{
    switch (value){
        case 0:return'';break;
        case 1:return'海选赛事';break;
        case 2:return'C级赛事';break;
        case 3:return'B级赛事';break;
        case 4:return'A级赛事';break;
        case 5:return'全国公开赛';break;
        case 6:return'全国锦标赛';break;
        default:
            return ''
    }
}
let MerchantTypeToStr = (value)=>{
    switch (value){
        case 1:return'体总';break;
        case 2:return'真人美女斗地主';break;
        default:
            return ''
    }
}

export const configOptions=[
    {
        value:"奖金",
        label:"奖金"
    },
    {
        value:"点券",
        label:"点券"
    },
    {
        value:"碎片",
        label:"碎片"
    },
    {
        value:"红分",
        label:"红分"
    },
]

let MailTypeToStr =(value)=>{
    switch (value){
        case 0:return'系统邮件';break;
        case 1:return'赛事邮件';break;
        case 2:return'活动邮件';break;
        default:
            return ''
    }
}
let AwardTypeToStr =(value,arr)=>{
    for(let i in arr){
        if(arr[i].value==value){
            return arr[i].label
        }
    }
}

export const MailTypeOptions=[
    {
        value:0,
        label:"系统邮件"
    },
    {
        value:1,
        label:"赛事邮件"
    },
    {
        value:2,
        label:"活动邮件"
    },
]


export {timestampToTime,timestampToTime1,stateToName,
cToName,roleToName,timestampToTime2,payArrToStr,
timestampToTime3,MatchLevelToStr,MerchantTypeToStr,
MailTypeToStr,AwardTypeToStr}
