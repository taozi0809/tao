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
export const num2mj = (num)=>{
    switch (num) {
        case 0:
            return '一万'
            break;
        case 1:
            return '二万'
            break;
        case 2:
            return '三万'
            break;
        case 3:
            return '四万'
            break;
        case 4:
            return '五万'
            break;
        case 5:
            return '六万'
            break;
        case 6:
            return '七万'
            break;
        case 7:
            return '八万'
            break;
        case 8:
            return '九万'
            break;

        case 9:
            return '一筒'
            break;
        case 10:
            return '二筒'
            break;
        case 11:
            return '三筒'
            break;
        case 12:
            return '四筒'
            break;
        case 13:
            return '五筒'
            break;
        case 14:
            return '六筒'
            break;
        case 15:
            return '七筒'
            break;
        case 16:
            return '八筒'
            break;
        case 17:
            return '九筒'
            break;

        case 18:
            return '一条'
            break;
        case 19:
            return '二条'
            break;
        case 20:
            return '三条'
            break;
        case 21:
            return '四条'
            break;
        case 22:
            return '五条'
            break;
        case 23:
            return '六条'
            break;
        case 24:
            return '七条'
            break;
        case 25:
            return '八条'
            break;
        case 26:
            return '九条'
            break;
    }
}

let king2Name = (str)=>{
    switch (str) {
        case 'LastPrize':
            return '参与奖'
            break
        case 'ThirdPrize':
            return '铜牌奖'
            break
        case 'SecondPrize':
            return '银牌奖'
            break
        case 'FirstPrize':
            return '金牌奖'
            break
        case 'TopPrize':
            return '特等奖'
            break

    }
}
let cards2name = (arr)=>{
    var arr1=[]
    for(let i in arr){
        arr1.push(num2mj(arr[i]))
    }
    return arr1.join(',')
}

export {timestampToTime,timestampToTime1,king2Name,cards2name}