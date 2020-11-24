export const isIos = ()=>{
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isWeiXin = ()=>{
    let u = navigator.userAgent;
    return (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})()
}