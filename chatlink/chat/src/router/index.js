import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login'
import store from '../vuex'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {path:'/',redirect:{name:"login"}},
        {path:'/login', name: 'login', component: Login, meta:{keepAlive: true}},
        {path:'/home', name: 'home', component: () => import('../views/home'), meta:{keepAlive: true}},
        {path:'*',component:Login},
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = !!store.state.token
    const nextRoute = ['home'];//未登录没权限进入的页面
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