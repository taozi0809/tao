import store from '../vuex'

var user=store.state.gameName==0?'http://123.207.12.67:6088':'http://123.207.12.67:7088'
// var user=store.state.gameName==0?'http://192.168.1.8:6088':'http://192.168.1.8:6090'


// var baseUrl={
//     // user:'http://192.168.1.8:6088',//测试
//     user:'http://123.207.12.67:6088',//线上
// }

var baseUrl={
    user:user,
}

export{baseUrl}
