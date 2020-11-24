import {YXB} from "./YXB";
import store from '../../vuex/index'



export const paramsToData=(data)=>{
    if(!!store.state.token){
        data.data['token']=store.state.token
    }
    let data1 = YXB.getBaseCtoInfo(data.method,data.data)
    let ret = ''
    for (let it in data1) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data1[it]) + '&'
    }
    data1 = ret
    return data1
}
