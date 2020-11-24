
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

export {dateToWeek,timestampToTime,toName,statusToName,timestampToTime1,timestampToTime2,scoreToResult}
