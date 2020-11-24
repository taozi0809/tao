import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/home/home'
import InstantScore from './views/instantScore/instantScore'
import Guess from './views/guess/guess'
Vue.use(Router)


const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta:{
                title:'即时比分'
            }
        },
        {
            path: '/',
            name: 'guess',
            component:Guess,
            meta:{
                title:'竞猜'
            }
        },
        {
            path: '/instantScore',
            name: 'instantScore',
            component: InstantScore,
            meta:{
                title:'即时比分'
            }
        },
        {
            path: '/basketball',
            name: 'basketball',
            component: () => import('./views/basketball/basketball'),
            meta:{
                title:'篮球'
            }
        },
        {
            path: '/gameResult',
            name: 'gameResult',
            component: () => import('./views/gameResult/gameResult'),
            meta:{
                title:'赛程赛果'
            }
        },
        {
            path: '/gameDetail/:id',
            name: 'gameDetail',
            component: () => import('./views/gameDetail/exponent'),
            meta:{
                title:'指数'
            }
        },
        {
            path: '/instantExponent',
            name: 'instantExponent',
            component: () => import('./views/gameDetail/instantExponent'),
            meta:{
                title:'即时指数'
            }
        },
        {
            path: '/guess',
            name: 'guess',
            component: () => import('./views/guess/guess'),
            meta:{
                title:'竞猜'
            }
        },
        {
            path: '/guessHistory',
            name: 'guessHistory',
            component: () => import('./views/guessHistory/guessHistory'),
            meta:{
                title:'竞猜记录'
            }
        },
        {
            path: '/bet',
            name: 'bet',
            component: () => import('./views/bet/bet'),
            meta:{
                title:'投注'
            }
        },
        {
            path: '/odds/:id',
            name: 'odds',
            component: () => import('./views/odds/odds'),
            meta:{
                title:'赔率'
            }
        },
        {
            path: '/matchboxDetail/:id',
            name: 'matchboxDetail',
            component: () => import('./components/detail/MatchboxDetail'),
            meta:{
                title:'火柴盒指数详情'
            }
        },
        {
            path: '/dataBank',
            name: 'dataBank',
            component: () => import('./views/dataBank/dataBank'),
            meta:{
                title:'资料库'
            }
        },
        {
            path: '/trading',
            name: 'trading',
            component: () => import('./views/trading/trading'),
            meta:{
                title:'火柴盒指数详情'
            }
        },
        {
            path: '/season/:id',
            name: 'season',
            component: () => import('./views/season/season'),
            meta:{
                title:'赛季'
            }
        },
        {
            path: '**',
            redirect: '/'
        },
    ]
})


// 全局路由守卫
router.beforeEach((to, from, next) => {
    const nextRoute = ['home','crowd','live','auction','user','customer'];
    let isLogin = true
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            router.push({ name: 'login' })
        }
    }
    if (to.name === 'login') {
        if (isLogin) {
            router.push({ name: 'home' });
        }
    }
    window.document.title = to.meta.title;
    next();
});

export default router;