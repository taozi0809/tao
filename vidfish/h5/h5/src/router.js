import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/login'
import NotFound from './views/notFound/404'

import store from './vuex'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {path:'/',redirect:{name:"home"}},
        {path:'/login', name: 'login', component: Login, meta:{keepAlive: false}},
        {path:'/home', name: 'home', component: () => import('@/views/home/home'), meta:{keepAlive:false}},
        {path:'/vip', name: 'vip', component: () => import('@/views/vip/vip'), meta:{keepAlive:false}},
        {path:'/user', name: 'user', component: () => import('@/views/user/user'), meta:{keepAlive:false}},




        {path:'/paySuccess', name: 'paySuccess', component: () => import('@/views/status/paySuccess'), meta:{keepAlive: false}},
        {path:'/payError', name: 'payError', component: () => import('@/views/status/payError'), meta:{keepAlive: false}},

        {path:'*',component:NotFound},//全不匹配的情况下，匹配NotFound组件，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = store.state.login==true
    // console.log(isLogin)
    const nextRoute = [''];//未登录没权限进入的页面
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