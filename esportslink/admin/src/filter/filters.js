

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
        var starttime = Date.parse(new Date())
        var time = value - starttime;
        if(time<0){time=0}
        var day = parseInt(time / 1000 / 60 / 60 / 24);
        var hour = parseInt(time / 1000 / 60 / 60 % 24);
        var minute = parseInt(time / 1000 / 60 % 60);
        var seconds = parseInt(time / 1000 % 60);
        // $('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");

        return `${day}天 ${hour}小时 ${minute}分钟`
    }
}




let stateToName=value=>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'未开始';break;
        case '1':return'比赛中';break;
        case '2':return'已结束';break;
    }
}
let statusToName=value=>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'未开始';break;
        case '1':return'进行中';break;
        case '2':return'已结束';break;
        case '3':return'已取消';break;
        case '4':return'封盘';break;
    }
}
let betTypeToName=value=>{
    if(!!value){
        value=JSON.stringify(value)
        switch (value){
            case '1':return'全场获胜';break;
            case '2':return'输赢（单局）';break;
            case '3':return'全场让分';break;
            case '4':return'1血';break;
            case '5':return'5杀';break;
            case '6':return'10杀';break;
            case '7':return'首塔';break;
            case '8':return'小龙首杀';break;
            case '9':return'大龙首杀';break;
            case '10':return'人头总数奇偶';break;
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
        }
    }
}
let boardNumToName = value=>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'全局';break;
        case '1':return'第一局';break;
        case '2':return'第二局';break;
        case '3':return'第三局';break;
        case '4':return'第四局';break;
        case '5':return'第五局';break;
    }
}

let operateTypeToName = value =>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'正常';break;
        case '1':return'待获取';break;
        case '2':return'异常';break;
        case '3':return'手动判定';break;

    }
}
let operateTypeToName2 = value =>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'正常';break;
        case '1':return'待获取';break;
        case '2':return'异常（未处理）';break;
        case '3':return'异常（已处理）';break;

    }
}

let quizTypeToName = value =>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'未结算';break;
        case '1':return'已结束';break;
        case '2':return'撤单';break;

    }
}

let operateStatusToName = value =>{
    value=JSON.stringify(value)
    switch (value){
        case '0':return'待结算';break;
        case '1':return'异常';break;
        case '2':return'已结算';break;
    }
}

export {timestampToTime,stateToName,timestampToTime1,cToName,statusToName,
betTypeToName,boardNumToName,operateTypeToName,quizTypeToName,
operateStatusToName,timestampToTime2,operateTypeToName2}