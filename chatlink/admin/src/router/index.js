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
        {path:'/',redirect:{name:"overview"}},
        {path:'/login', name: 'login', component: Login, meta:{keepAlive: true}},
        {path:'/home', name: 'home', component: () => import('@/views/home/home'),
            children:[
                {path:'/overview', name: 'overview', component: () => import('@/views/dr/overview'), meta:{keepAlive: true}},
                {path:'/user', name: 'user', component: () => import('@/views/dr/user'), meta:{keepAlive: true}},
                {path:'/game_details', name: 'game_details', component: () => import('@/views/dr/game_details'), meta:{keepAlive: true}},
            ]
        },
        {path:'*',component:NotFound},
    ]
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     var isLogin = !!store.state.token
//     const nextRoute = ['home'];//未登录没权限进入的页面
//     if (nextRoute.indexOf(to.name) >= 0) {
//         if (!isLogin) {
//             router.push({ name: 'login' })
//         }
//     }
//     // 已登录状态；当路由到login时，跳转至home
//     if (to.name === 'login') {
//         if (isLogin) {
//             router.push({ name: 'home' });
//         }
//     }
//     next();
// });

export default router