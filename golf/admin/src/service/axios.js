import axios from 'axios'
import {paramsToData} from "./config/paramsToData";
import {YXB} from "@/service/config/YXB";
import Router from '../router'
import {Message} from 'element-ui'
import store from '../vuex/index'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'text/plain';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// var instance = axios.creat({
//         responseType: 'blob', //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
// })

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
    return config
},function (error) {
    return Promise.reject(error)
});

//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    if(config.data.code==91001){
        Message.error('请重新登录')
        store.commit('TOKEN','')
        Router.push({path: '/login'})
    }
    return config
},function (error) {
    return Promise.reject(error)
});

export function post(url,data){
    return new Promise((resolve,reject) => {
        axios.post(url,paramsToData(data)).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

export function get(url,data=null){
axios.defaults.headers.post['Content-Type'] = 'application/vnd.ms-excel;charset=utf-8';
    return new Promise((resolve,reject) => {
        axios.get(url,{params: data}).then(response => {
            console.log(response)
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}


export function uploadImg (url,data={},config){
    let file = data.data.file
    data = YXB.getBaseCtoInfo(data.method,data.data)
    var formFile = new FormData()
    for(let i in data) {
        formFile.append(i, data[i])
    }
    formFile.append("file", file);
    return new Promise((resolve,reject)=>{
        axios.post(url,formFile).then(response=>{
            resolve(response.data)
        },err=>{
            reject(err)
        })
    })
}

