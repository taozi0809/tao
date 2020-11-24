

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
let stateToName=value=>{
    if(!!value){
        switch (value){
            case '0':return'未开始';break;
            case '1':return'已结束';break;
            case '2':return'进行中';break;
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

export {timestampToTime,stateToName,timestampToTime1,cToName}