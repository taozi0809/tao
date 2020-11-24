import axios from 'axios'
import qs from 'qs'
import {getBaseCtoInfo} from "../data/YXB";

import {showLoading,hideLoading} from "./loading";
import { Message} from 'element-ui';
// import store from '../store/'


// axios.defaults.headers.common['Authorization'] = store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
    //请求发出前操作
    // showLoading();
    return config
},function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    //在这里对返回的数据进行处理
    // hideLoading();
    if(config.data.code==91001){Message.error(config.data.message)}
    return config
},function (error) {
    // 对请求错误做些什么
    // hideLoading();
    // Message.error(error.data.message)
    return Promise.reject(error)
});

export function post(url,data = {}){
    data = getBaseCtoInfo(data.method,data.data)
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    data = ret


    return new Promise((resolve,reject) => {
        axios.post(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}


