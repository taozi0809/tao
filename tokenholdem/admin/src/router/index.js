import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login/login'
import NotFound from '../views/notFound/404'

import store from '../vuex'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {path:'/',redirect:{name:"login"}},
        {path:'/login', name: 'login', component: Login},

        {path:'/home', name: 'home', component: () => import('@/views/home/home'),
            children:[
                {path:'/overview', name: 'overview', component: () => import('@/views/data_report/overview')},
                {path:'/user_analysis', name: 'user_analysis', component: () => import('@/views/data_report/user_analysis')},
                {path:'/game_match', name: 'game_match', component: () => import('@/views/data_report/game_match')},
                {path:'/game_match_details', name: 'game_match_details', component: () => import('@/views/data_report/game_match_details')},


                {path:'/finance', name: 'finance', component: () => import('@/views/finance/finance')},
                {path:'/usdt_recharge', name: 'usdt_recharge', component: () => import('@/views/finance/usdt_recharge')},
                {path:'/usdt_exchange', name: 'usdt_exchange', component: () => import('@/views/finance/usdt_exchange')},
                {path:'/gact_recharge', name: 'gact_recharge', component: () => import('@/views/finance/gact_recharge')},
                {path:'/gact_exchange', name: 'gact_exchange', component: () => import('@/views/finance/gact_exchange')},


                {path:'/change_password', name: 'change_password', component: () => import('@/views/user/password')},
                {path:'/userList', name: 'userList', component: () => import('@/views/user/userList')},
                {path:'/user_details', name: 'user_details', component: () => import('@/views/user/details')},

            ]
        },
        {path:'*',component:NotFound},
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = !!store.state.token
    const nextRoute = ['home','overview','user','game_details','change_password'];//未登录没权限进入的页面
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