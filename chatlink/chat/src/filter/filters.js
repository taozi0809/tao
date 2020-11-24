let timestampFormatting=(timestamp,formatting,mark='-')=>{
    var date = new Date(timestamp);
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
    switch (formatting){
        case 'mm:hh':
            return h+':'+minute
            break;
        case 'yyyy-mm-dd':
            return y+mark+m+mark+d
            break;
        case 'yyyy-mm-dd mm:hh':
            return y+mark+m+mark+d+' '+h+':'+minute
            break;
        case 'mm-dd mm:hh':
            return m+mark+d+' '+h+':'+minute
            break;
    }
}

function getDateTimeBefor(publishtime) {
    var currTime = Date.parse(new Date());
    var l = parseInt(currTime) - parseInt(publishtime);
    var time = l / 1000;

    var hours = time / 3600;
    if (hours < 24) {
        return timestampFormatting(publishtime,'mm:hh','/')
    }

    var days = time / 3600 / 24;
    if (days < 7) {
       return getWeek(new Date(timestampFormatting(publishtime,'yyyy-mm-dd','-')))
    }else{
        return timestampFormatting(publishtime,'yyyy-mm-dd','/')
    }
}

function getWeek(date) {
    var week;
    if(date.getDay() == 0) week = "星期日"
    if(date.getDay() == 1) week = "星期一"
    if(date.getDay() == 2) week = "星期二"
    if(date.getDay() == 3) week = "星期三"
    if(date.getDay() == 4) week = "星期四"
    if(date.getDay() == 5) week = "星期五"
    if(date.getDay() == 6) week = "星期六"
    return week;
}

const timestampToDate =value=>{
   return getDateTimeBefor(value)

}
let chatHistoryTimeToTime = ([value,oldValue]) => {
    if (!value||!oldValue) return ''

    let new_time = Date.parse(new Date());
    let date = new Date(value)
    let M = date.getMonth()//月
    let d = date.getDate() //日
    let z = date.getDay()//周几
    let h = date.getHours()//时
    var m = date.getMinutes()//分

    function gsh(a){
        if(a<10){
            return '0'+a
        }else{
            return a
        }
    }
    function gsh_xq(a){
        switch (a){
            case 0:
                return '日'
                break
            case 1:
                return '一'
                break
            case 2:
                return '二'
                break
            case 3:
                return '三'
                break
            case 4:
                return '四'
                break
            case 5:
                return '五'
                break
            case 6:
                return '六'
                break
        }
    }
    M = M+1
    z = gsh_xq(z)
    h = gsh(h)
    m = gsh(m)

    if(new Date(value).toDateString() === new Date().toDateString()){ //当天

        if(value-oldValue <= 300000){//不超过5分钟
            return ''
        } else{
            return h+':'+m;
        }

    }else{
        if(new_time - value <= 604800000){
            return '星期'+z+' '+h+':'+m;
        } else{
            return M+'-'+d+' '+h+':'+m;
        }

    }
}

export {timestampToDate,chatHistoryTimeToTime,timestampFormatting}