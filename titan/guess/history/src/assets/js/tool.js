
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
    if(value){
        let val = value.toString()

        if(val.indexOf('.')==-1){
            // console.log('整数')
        }
        else{//小数
            // console.log('小数')
            var re = /([0-9]+\.[0-9]{4})[0-9]*/;
            val = val.replace(re,"$1");
        }


        return val
    }
}

