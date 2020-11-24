import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/home/home'
import InstantScore from './views/instantScore/instantScore'
import Guess from './views/guess/guess'
import InvitationRegister from './views/invitationRegister/home' //体坛 邀请注册


Vue.use(Router)


const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass:"active",
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home,
        //     meta:{
        //         title:'即时比分',
        //         keepAlive:true,
        //     }
        // },
        // {
        //     path: '/',
        //     name: 'guess',
        //     component:Guess,
        //     meta:{
        //         title:'竞猜',
        //         keepAlive:false,
        //     }
        // },
        {
            path: '/',
            name: 'invitationRegister',
            component: InvitationRegister,
            meta:{
                title:'TITAN',
                keepAlive:true,
            }
        },
        {
            path: '/invitationRegisterRegister',
            name: 'invitationRegisterRegister',
            component: () => import('./views/invitationRegister/register'),
            meta:{
                title:'TITAN',
                keepAlive:true,
            }
        },
        {
            path: '/invitationRegisterDownload',
            name: 'invitationRegisterDownload',
            component: () => import('./views/invitationRegister/download'),
            meta:{
                title:'TITAN',
                keepAlive:true,
            }
        },
        {
            path: '/basketballGuess',
            name: 'basketballGuess',
            component: () => import('./views/basketball/basketballGuess'),
            meta:{
                title:'竞猜',
                keepAlive:false,
            }
        },
        {
            path: '/instantScore',
            name: 'instantScore',
            component: InstantScore,
            meta:{
                title:'即时比分',
                keepAlive:false,
            }
        },
        {
            path: '/basketball',
            name: 'basketball',
            component: () => import('./views/basketball/basketball'),
            meta:{
                title:'篮球',
                keepAlive:false,
            }
        },
        {
            path: '/articleDetails/:id',
            name: 'articleDetails',
            component: () => import('./views/articleDetails/articleDetails'),
            meta:{
                title:'详情',
                keepAlive:false,
            }
        },
        {
            path: '/gameResult',
            name: 'gameResult',
            component: () => import('./views/gameResult/gameResult'),
            meta:{
                title:'赛程赛果',
                keepAlive:false,
            }
        },
        {
            path: '/gameDetail',
            name: 'gameDetail',
            component: () => import('./views/gameDetail/exponent'),
            meta:{
                title:'指数',
                keepAlive:false,
            }
        },
        {
            path: '/basketballDetail/:id',
            name: 'basketballDetail',
            component: () => import('./views/basketballDetail/exponent'),
            meta:{
                title:'指数',
                keepAlive:false,
            }
        },
        {
            path: '/instantExponent',
            name: 'instantExponent',
            component: () => import('./views/gameDetail/instantExponent'),
            meta:{
                title:'即时指数',
                keepAlive:false,
            }
        },
        {
            path: '/guess',
            name: 'guess',
            component: () => import('./views/guess/guess'),
            meta:{
                title:'竞猜',
                keepAlive:false,
            }
        },
        {
            path: '/guessHistory',
            name: 'guessHistory',
            component: () => import('./views/guessHistory/guessHistory'),
            meta:{
                title:'竞猜记录',
                keepAlive:false,
            }
        },
        {
            path: '/guessHistoryBasketball',
            name: 'guessHistoryBasketball',
            component: () => import('./views/guessHistory/guessHistoryBasketball'),
            meta:{
                title:'竞猜记录',
                keepAlive:false,
            }
        },

        {
            path: '/bet',
            name: 'bet',
            component: () => import('./views/bet/bet'),
            meta:{
                title:'投注',
                keepAlive:false,
            }
        },
        {
            path: '/betBasketball',
            name: 'betBasketball',
            component: () => import('./views/bet/betBasketball'),
            meta:{
                title:'投注',
                keepAlive:false,
            }
        },
        {
            path: '/odds/:id',
            name: 'odds',
            component: () => import('./views/odds/odds'),
            meta:{
                title:'赔率',
                keepAlive:false,
            }
        },
        {
            path: '/matchboxDetail/:id',
            name: 'matchboxDetail',
            component: () => import('./components/detail/MatchboxDetail'),
            meta:{
                title:'火柴盒指数详情',
                keepAlive:false,
            }
        },
        {
            path: '/dataBank',
            name: 'dataBank',
            component: () => import('./views/dataBank/dataBank'),
            meta:{
                title:'资料库',
                keepAlive:false,
            }
        },
        {
            path: '/trading',
            name: 'trading',
            component: () => import('./views/trading/trading'),
            meta:{
                title:'火柴盒指数详情',
                keepAlive:false,
            }
        },
        {
            path: '/season/:id',
            name: 'season',
            component: () => import('./views/season/season'),
            meta:{
                title:'赛季',
                keepAlive:false,
            }
        },
        {
            path: '**',
            redirect: '/'
        },
    ],

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