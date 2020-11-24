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

export const StatusToStr = value =>{
   switch (value) {
       case 1:
           return "正常"
           break;
       case 2:
           return "审核中"
           break;
       case 3:
           return "未通过审核"
           break;
       case 4:
           return "封号"
           break;
   }
}
export const routerOptionsS=[
    {
        i:"jingji-iconhome mr10",
        path:"/home",
        name:"首页",
    },
    {
        i:"jingji-iconyonghuliebiao mr10",
        path:"/personal",
        name:"个人信息",
    },
    {
        i:"jingji-iconxinzengxiajituiguangyuan mr10",
        path:"/player",
        name:"我的选手",
    },

]
export const routerOptionsE=[
    {
        i:"jingji-iconxiajicaozuo mr10",
        path:"/proxy",
        name:"推广管理",
        list:[
            {
                path:"/proxy",
                name:"推广管理",
            },
            {
                path:"/authority",
                name:"推广权限",
            },
            {
                path:"/audit",
                name:"推广审核",
            },
        ],
    },
    {
        i:"jingji-iconbokuanmingxi mr10",
        path:"/cashback",
        name:"收益管理",
        list:[
            {
                path:"/income",
                name:"收益明细",
            },
            {
                path:"/cashback",
                name:"收益比例管理",
            }
        ],
    },
    {
        i:"jingji-iconzhifufangshi1 mr10",
        path:"/management",
        name:"提现管理",
        list:[
            {
                path:"/wd",
                name:"提现明细",
            },
            {
                path:"/management",
                name:"提现审核",
            }
        ],
    },
]


export {timestampToTime,timestampToTime1}
