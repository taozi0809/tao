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
        {path:'/',redirect:{name:"home"}},
        {path:'/login', name: 'login', component: Login},
        {path:'/home', name: 'home', component: () => import('@/views/home/home'),
            children:[
                {path:'/bet_order', name: 'bet_order', component: () => import('@/views/bet/order')},

                {path:'/e_list', name: 'e_list', component: () => import('@/views/e/list')},
                {path:'/e_count', name: 'e_count', component: () => import('@/views/e/count')},
                {path:'/e_details', name: 'e_details', component: () => import('@/views/e/detail')},
                {path:'/e_matching', name: 'e_matching', component: () => import('@/views/e/matching')},

                {path:'/data_overview', name: 'data_overview', component: () => import('@/views/data/overview')},
                {path:'/data_user', name: 'data_user', component: () => import('@/views/data/user')},
                {path:'/data_details', name: 'data_details', component: () => import('@/views/data/details')},

                {path:'/user', name: 'user_details', component: () => import('@/views/user/user')},
                {path:'/user_miner', name: 'user_miner', component: () => import('@/views/user/miner')},
                {path:'/user_details', name: 'user_details', component: () => import('@/views/user/details')},

                {path:'/finance', name: 'finance', component: () => import('@/views/finance/finance')},
                {path:'/finance_deposit', name: 'finance_deposit', component: () => import('@/views/finance/deposit')},
                {path:'/finance_usdt', name: 'finance_usdt', component: () => import('@/views/finance/usdt')},
                {path:'/finance_exchange', name: 'finance_exchange', component: () => import('@/views/finance/exchange')},
                {path:'/finance_recording', name: 'finance_recording', component: () => import('@/views/finance/recording')},

                {path:'/app', name: 'app', component: () => import('@/views/app/app')},
                {path:'/app_version', name: 'app_details', component: () => import('@/views/app/version')},
                {path:'/app_details', name: 'app_details', component: () => import('@/views/app/details')},
            ],
        },
        {path:'*',component:NotFound},
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = !!store.state.token
    const nextRoute = ['home','bet_order','e_list','e_count','e_details','e_matching','data_overview','data_user',
        'data_details','user','user_miner','user_details','finance','finance_deposit','finance_usdt','finance_exchange',
        'finance_recording','app','app_version','app_details'];//未登录没权限进入的页面
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