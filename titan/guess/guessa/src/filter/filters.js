
let dateToWeek = value =>{
    if(value){
        let weekDay = new Date(value).getDay();
        switch (weekDay){
            case 0:
                return '星期天'
                break;
            case 1:
                return '星期一'
                break;
            case 2:
                return '星期二'
                break;
            case 3:
                return '星期三'
                break;
            case 4:
                return '星期四'
                break;
            case 5:
                return '星期五'
                break;
            case 6:
                return '星期六'
                break;
        }
    }
}

let timestampToTime = value =>{
    if(value){
        let date = new Date(value );
        let Y = date.getFullYear();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        let D = date.getDate() <10?'0'+date.getDate():date.getDate();
        let h = date.getHours()<10?'0'+date.getHours():date.getHours();
        let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes() ;
        return Y+'-'+M+'-'+D +' '+h+':'+m;
    }
}

let timestampToTime1 = value =>{
    if(value){
        let date = new Date(value );
        let Y = date.getFullYear();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        let D = date.getDate() <10?'0'+date.getDate():date.getDate();
        let h = date.getHours()<10?'0'+date.getHours():date.getHours();
        let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes() ;
        return h+':'+m;
    }
}
let timestampToTime2 = value =>{
    if(value){
        let date = new Date(value );
        let Y = date.getFullYear();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        let D = date.getDate() <10?'0'+date.getDate():date.getDate();
        let h = date.getHours()<10?'0'+date.getHours():date.getHours();
        let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes() ;
        return M+'-'+D ;
    }
}

let toName = value =>{
    if(value){
        switch (value) {
            case 'home':
                return '主胜'
                break;
            case 'guest':
                return '客胜'
                break;
            case 'draw':
                return '平局'
                break;
            case 's0':
                return '0'
                break;
            case 's1':
                return '1'
                break;
            case 's2':
                return '2'
                break;
            case 's3':
                return '3'
                break;
            case 's4':
                return '4'
                break;
            case 's5':
                return '5'
                break;
            case 's6':
                return '6'
                break;
            case 's7':
                return '7+'
                break;
                default:
                    return value
        }
    }
}

let statusToName = value =>{
    switch (value) {
        case 'notstarted':
            return '未开始'
            break;
        case 'inprogress':
            return '进行中'
            break;
        case 'finished':
            return '完场'
            break;
        case 'cancelled':
            return '取消'
            break;
        case 'interrupted':
            return '中断'
            break;
        case 'unknown':
            return '未知'
            break;
        case 'deleted':
            return '删除'
            break;
        default:
            return value
    }
}

let scoreToResult = value =>{
    if(value==0){
        return '平'
    }else if(value>0){
        return '胜'
    }else if(value<0){
        return '负'
    }
}

let passWayToName = value =>{
    switch (value){
        case 0:
            return '至少选择2场比赛'
            break;
        case 1:
            return '至少选择2场比赛'
            break;
        case 2:
            return '2串1'
            break;
        case 3:
            return '2串1，3串1'
            break;
        case 4:
            return '2串1，3串1，4串1'
            break;
        case 5:
            return '2串1，3串1，4串1，5串1'
            break;
        case 6:
            return '2串1，3串1，4串1，5串1，6串1'
            break;
        case 7:
            return '2串1，3串1，4串1，5串1，6串1，7串1'
            break;
        case 8:
            return '2串1，3串1，4串1，5串1，6串1，7串1，8串1'
            break;
        default:
            return '至少选择2场比赛'
    }
}

let typesToPassWay = arr=>{
    let arr1=[]
    for(let i in arr){
        switch (arr[i]){
            case 'ONE':
                arr1.push('2串1')
                break;
            case 'TWO':
                arr1.push('3串1')
                break;
            case 'FIVE':
                arr1.push('4串1')
                break;
            case 'TEN':
                arr1.push('5串1')
                break;
            case 'SEVENTEEN':
                arr1.push('6串1')
                break;
            case 'TWENTY_SEVEN':
                arr1.push('7串1')
                break;
            case 'THIRTY_THREE':
                arr1.push('8串1')
                break;
        }
    }
    return arr1.join(',')
}


export {dateToWeek,timestampToTime,toName,statusToName,timestampToTime1,timestampToTime2,scoreToResult,passWayToName,typesToPassWay}
