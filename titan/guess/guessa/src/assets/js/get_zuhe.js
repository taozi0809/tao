
export const get_zuhe = (arr,n)=>{
    var c_num = n
    var xhzh = [];
    for (var i = 1; i <= 3; i++) {
        xhzh.push([i, arr[i-1]]);
    }
    var ff = function (n, i) {
        return Math.pow(xhzh[i][0], n) * c(xhzh[i][1], n);
    };

    var dgzygg = function (tmparr, idx) {
        var res_sum = 0;
        if (idx == xhzh.length) {
            if (arrayAdd(tmparr) == c_num)
                return arrayMultiple(arrayEach(tmparr, ff, []));
            return 0;
        }
        for (var j = 0; j <= xhzh[idx][1]; j++) {
            res_sum += dgzygg(tmparr.concat(j), idx + 1);
        }
        return res_sum;
    }
    return dgzygg([], 0);
}

//数组相加
function arrayAdd(a){
    var n = 0;
    for (var i=0,l=a.length;i<l;i++) n+=a[i];
    return n;
};

function arrayEach(a, cb, r){
    if(r) for(var i=0,t,l=a.length;i<l;i++)(t=cb(a[i],i))!=undefined&&r.push(t);
    else for(var i=a.length-1;i>=0;i--)(a[i]=cb(a[i],i))==undefined&&a.splice(i,1);
    return r||a;
}

//数组相乘
function arrayMultiple(a){
    var n = 1;
    for (var i=0,l=a.length;i<l;i++) n*=a[i];
    return n;
};

// 求组合
function c(len, m) {
    return (function(n1, n2, j, i, n) {
        for (; j <= m;) {
            n2 *= j++;
            n1 *= i--;
        }
        return n1 / n2;
    })(1, 1, 1, len, len);
};