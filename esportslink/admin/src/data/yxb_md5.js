// import md5 from 'js-md5'
import {YXB} from "./YXB";
import {md5} from "./md5";

let addAttributes=(obj,...args)=>{
    var newObj={}
    for(let i in obj){
        if(i=='method'){newObj[i]=args[0]}else{newObj[i]=obj[i]}
        if(i=='versionName'){
            newObj['params']=JSON.stringify(args[1])
        }
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
    console.log(yxb)
    return yxb
}
export default yxbCotMd5






