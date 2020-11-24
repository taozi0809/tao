//ascending升序
//descending降序

export const sortKey = (array,key)=>{
    return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return ((x>y)?-1:(x<y)?1:0)
    })
}

//json数组去重

export const duplicateRemoval=(arr1,arr2)=>{
    var arr=[];
    var l=arr2.length
    if(arr2.length==0){
        return sortKey(arr1,'lastTime')
    }else{
        for(let i in arr1){
            var n=0
            for(let j in arr2){
                if(arr1[i].groupIdCode!=arr2[j].groupIdCode){n++}
                if(n==l){arr.push(arr1[i])}
            }
        }
        return arr
    }

}