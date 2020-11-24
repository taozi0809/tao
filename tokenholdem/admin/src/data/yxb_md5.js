import md5 from 'js-md5'
import {YXB} from "./YXB";

let addAttributes=(obj,...args)=>{
    var newObj={}
    for(let i in obj){
        newObj[i]=obj[i]
        if(i=='lang'){
            newObj['method']=args[0]
            if(!!args[1]){newObj['params']=JSON.stringify(args[1])}
        }
        if(i=='secretKey'){newObj['sendTime']=new Date().getTime()}
    }
    return newObj
}

let yxbCotMd5=(method,params)=>{
    var yxb=addAttributes(YXB,method,params)
    let content=""
    for(let i in yxb){
        content=content+i+"="+yxb[i]+"&"
    }
    yxb['sign'] = md5(content.substring(0, content.length - 1));
    return yxb
}
export default yxbCotMd5






