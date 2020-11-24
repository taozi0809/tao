import axios from 'axios'
import qs from 'qs'
import { Message,MessageBox} from 'element-ui';
import store from '../vuex/index'
import Router from '../router'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'text/plain';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
    return config
},function (error) {
    return Promise.reject(error)
});

//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    if(config.data.code==2){
         Message.error('请重新登录')
         store.commit('TOKEN','')
         Router.push({path: '/login'})
    }
    if(config.data.code!=0){
        Message.error(config.data.desc)
    }
    return config
},function (error) {
    return Promise.reject(error)
});

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data,!!store.state.token?{
            headers:{
                token:store.state.token
            }
        }:'').then(response => {

            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
export function get(url,params=null){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:{
                data:JSON.stringify(params)
            },
            headers:{
                token:store.state.token
            }
        }).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
