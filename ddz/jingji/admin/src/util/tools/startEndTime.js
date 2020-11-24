export const getToday = ()=>{
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
    var dateStr = year + "-" + month + "-" + day;
    return dateStr
}


export  const getBeforeToday = ()=>{
    var nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth()-1);
    var y = nowDate.getFullYear();
    var m = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    var d = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
    var dateStr = y + "-" + m + "-" + d;

    return dateStr
}


export const timeToTimestamp = (str)=>{
    str = str.replace(/-/g,'/')
    var date = new Date(str)
    return date.getTime()/1000
}
