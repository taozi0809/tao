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
        {path:'/login', name: 'login', component: Login, meta:{keepAlive: true}},
        {path:'/home', name: 'home', component: () => import('@/views/home/home'),
            children:[
                {path:'/overview', name: 'overview', component: () => import('@/views/dr/overview'), meta:{keepAlive: false}},
                {path:'/user', name: 'user', component: () => import('@/views/dr/user'), meta:{keepAlive: true}},
                {path:'/game_details', name: 'game_details', component: () => import('@/views/dr/game_details'), meta:{keepAlive: true}},
                {path:'/e_list', name: 'e_list', component: () => import('@/views/e/list'), meta:{keepAlive: true}},
                {path:'/e_count', name: 'e_count', component: () => import('@/views/e/count'), meta:{keepAlive: true}},
                {path:'/e_details', name: 'e_details', component: () => import('@/views/e/detail'), meta:{keepAlive: true}},
                {path:'/e_matching', name: 'e_matching', component: () => import('@/views/e/matching'), meta:{keepAlive: true}},
                {path:'/b_order', name: 'b_order', component: () => import('@/views/bo/index'), meta:{keepAlive: true}},
                {path:'/u_list', name: 'u_list', component: () => import('@/views/u/list'), meta:{keepAlive: true}},
                {path:'/u_data', name: 'u_data', component: () => import('@/views/u/data'), meta:{keepAlive: true}},
                {path:'/a_index', name: 'a_index', component: () => import('@/views/agent/index'), meta:{keepAlive: false}},
                {path:'/a_user', name: 'a_user', component: () => import('@/views/agent/user'), meta:{keepAlive: false}},
                {path:'/a_financial', name: 'a_financial', component: () => import('@/views/agent/financial'), meta:{keepAlive: false}},
                {path:'/a_billflow', name: 'a_billflow', component: () => import('@/views/agent/billflow'), meta:{keepAlive: false}},
                {path:'/a_billflow_user', name: 'a_billflow_user', component: () => import('@/views/agent/billflow_user'), meta:{keepAlive: false}},
                {path:'/a_billflow_f', name: 'a_billflow_f', component: () => import('@/views/agent/billflow_f'), meta:{keepAlive: false}},
            ]
        },
        {path:'*',component:NotFound},
    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var isLogin = !!store.state.token
    // var isLogin = true
    //未登录没权限进入的页面
    const nextRoute = ['home','overview','game_details','e_list','e_count','e_details',
    'e_matching','b_order','u_list','u_data','a_index','a_user','a_financial','a_billflow',
    'a_billflow_user','a_billflow_f'];
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            router.push({ name: 'login' })
        }
    }
    // 已登录状态；当路由到login时，跳转至home
    if (to.name === 'login') {
        if (isLogin) {
            router.push({ name: 'overview' });
        }
    }
    next();
});

export default router