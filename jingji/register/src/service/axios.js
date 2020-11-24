import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
    return config
},function (error) {
    return Promise.reject(error)
});
//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    return config
},function (error) {
    return Promise.reject(error)
});

export function post(url,data){
    data = data.data
    return new Promise((resolve,reject) => {
        axios.post(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
