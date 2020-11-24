
/*json数组按属性名分组*/
export const attributeGroup = (arr,name)=>{
    let map = {};
    let dest = [];

    for(let i = 0; i < arr.length; i++){
        let ai = arr[i];
        if(!map[ai.name]){
            dest.push({
                name: ai.name,
                data: [ai]
            });
            map[ai.name] = ai;
        }else{
            for(let j = 0; j < dest.length; j++){
                let dj = dest[j];
                if(dj.name == ai.name){
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }
    return dest
}

/*json数组添加属性*/
export const attributeAdd = (arr,name,value)=>{
    for(let i in arr){
        arr[i][name] = value
    }
    return arr
}

// 限制数字
export const limitNumber = (value)=>{
    if(value<1 &&value>0){
        return value.toFixed(4)
    }else{
        let val = value.toString()

        if(val.indexOf('.')!=-1){
            var re = /([0-9]+\.[0-9]{4})[0-9]*/;
            val = val.replace(re,"$1");
        }
        return val
    }
}

//判断是否微信
export const isWxChat = ()=>{
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    return false;
}

//判断是否ios
export const isIos = ()=>{
    let u = navigator.userAgent;
    if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        return true
    }
    return false
}

//取n位随机数
export const randomN = (n)=>{
    if (n > 21) return null
    return parseInt((Math.random() + 1) * Math.pow(10,n-1))
}

//取数组最小值
export const minN = (array)=> {
    return Math.min.apply( Math, array )
}
//取数组最大值
export const maxN = (array)=> {
    return Math.max.apply( Math, array )
}

//最大值组合
export const get_max_zuhe = (array,M)=>{
    var N=array.length;
    var top=0,queue=[],flag=[],arr=[],_arr=[];
    function comb(s, n, m)
    {
        var i;

        if (s > n)
            return ;

        if (top == m)
        {
            for (i = 0; i < m; i++)
            {_arr.push(queue[i]);
            }
            arr.push(_arr)
            _arr=[]
            return ;
        }

        queue[top++] = array[s];
        comb(s+1, n, m);
        top--;
        comb(s+1, n, m);
    }
    comb(0, N, M);
    return arr
}


//二维数组元素相乘
export const arrMultiply = (arr)=>{
    if(arr instanceof Array) {
        var len = arr.length;
        var result = len > 0 ? 1 : null;
        for(var i = 0; i < arr.length; i++) {
            result *= arr[i];
        }
        return result;
    }
    return null;
}
