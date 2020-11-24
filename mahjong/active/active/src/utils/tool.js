export const getUrlParam = (name)=>{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

export const sendInit  = (e) =>{
    var arr = [];
    for (var i = 0; i < e; i++) {
        arr.push(-1);
    }
    return arr;
}

export const getmjarr=[1,1,1,1,1,1,1,1,1]