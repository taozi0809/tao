import axios from 'axios'
import qs from 'qs'
import yxbCotMd5 from '../../data/yxb'
import {showLoading,hideLoading} from "./loading";
import { Toast } from 'vant';

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
    return config
},function (error) {
    // 对请求错误做些什么
    // hideLoading();
    // Toast.fail(error.data.message)
    return Promise.reject(error)
});

export function post(url,data = {}){
    data=qs.stringify(yxbCotMd5(data.method,data.data))
    return new Promise((resolve,reject) => {
        axios.post(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

export function postUpload(url,data = {},file){
    // data=qs.stringify(yxbCotMd5(data.method,data.data))
    data=yxbCotMd5(data.method,data.data)

    var formFile = new FormData();
    for(let i in data){
        formFile.append(i, data[i])
    }
    formFile.append("file", file)
    return new Promise((resolve,reject) => {
        axios.post(url,formFile).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}