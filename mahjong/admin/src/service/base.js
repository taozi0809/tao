import store from '../vuex'

var user=store.state.gameName==0?'https://139.199.221.33:6088':'https://139.199.221.33:7088'


/**
 * 本地
 *login:'http://139.199.221.33:6088',
 * */



var baseUrl={
    user:user,
    login:'https://139.199.221.33:6088',
}
export{baseUrl}
