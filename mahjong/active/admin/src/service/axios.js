import axios from 'axios'
import { Message,MessageBox} from 'element-ui';

import store from '../vuex/index'
import Router from '../router'
// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//定义一个请求拦截器
axios.interceptors.request.use(function(config){
    return config
},function (error) {
    return Promise.reject(error)
});

//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    // console.log(config)
    // Router.push({path: '/login'})
    // if(config.data.errcode==2006){
    //      Message.error('请重新登录')
    //     // Router.push({path: '/login'})
    // }else if(config.data.errcode==2000||config.data.errcode==2002){
    //     return config
    // }else{
    //     Message.error(config.data.errmsg)
    // }
    return config

},function (error) {
    return Promise.reject(error)
});

export function post(url,data = {}){
    let formdata=new FormData();
    for(let i in data){
        // console.log(i)
        formdata.append(i,data[i])
    }
    return new Promise((resolve,reject) => {
        axios.post(url,formdata,{
            headers:{
                'Authorization':store.state.token
            }
        }).then(response => {
            // console.log(response)
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
export function get(url,params=null){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params,
            headers:{
                'Authorization':store.state.token
            }
        }).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
