import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
Vue.use(Router)

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {path:'/',redirect:{name:"home"}},
        {path:'/login', name: 'login', component:resolve => require(['../views/login/login'], resolve)},
        {path:'/home', name: 'home', component:resolve => require(['../views/home/home'], resolve),
            children:[
                {path:'/handicap', name: 'handicap', component:resolve => require(['../views/handicap'], resolve),meta:{keepAlive: true}},

                {path:'/handicap_details', name: 'handicap_details', component:resolve => require(['../views/handicap/details'], resolve)},
                {path:'/fourth_details', name: 'fourth_details', component:resolve => require(['../views/handicap/fourth_details'], resolve)},

                {path:'/fight', name: 'fight', component:resolve => require(['../views/fight/fight'], resolve)},

                {path:'/propaganda', name: 'propaganda', component:resolve => require(['../views/propaganda'], resolve)},

            ]
        },
        {path:'*',component:resolve => require(['../views/notFound/404'], resolve)},
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = !!store.state.token
    const nextRoute = ['home','handicap','handicap_details','/fight'];//未登录没权限进入的页面
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            router.push({ name: 'login' })
        }
    }
    // 已登录状态；当路由到login时，跳转至home
    if (to.name === 'login') {
        if (isLogin) {
            router.push({ name: 'home' });
        }
    }
    next();
});

export default router