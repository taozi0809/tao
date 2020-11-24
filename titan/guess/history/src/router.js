import Vue from 'vue'
import Router from 'vue-router'
import GuessHistory from './views/guessHistory/guessHistory'
import Content from './views/supplied/content'
import Supplied from './views/supplied/supplied'
import Recommend from './views/supplied/recommend'
import Details from './views/supplied/details'
import Strategy from './views/supplied/strategy'

Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'guessHistory',
            component: GuessHistory,
            meta:{
                title:'竞猜记录'
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
        // {
        //     path: '/',
        //     name: 'supplied',
        //     component: Supplied,
        //     meta:{
        //         title:'我的来料'
        //     }
        // },
        // {
        //     path: '/',
        //     name: 'recommend',
        //     component: Recommend,
        //     meta:{
        //         title:'我的推荐'
        //     }
        // },
        // {
        //     path: '/content/:predictionId',
        //     name: 'content',
        //     component: Content,
        //     meta:{
        //         title:'TITAN来料'
        //     }
        // },
        // {
        //     path: '/',
        //     name: 'details',
        //     component: Details,
        //     meta:{
        //         title:'TITAN来料'
        //     }
        // },
        // {
        //     path: '/',
        //     name: 'strategy',
        //     component: Strategy,
        //     meta:{
        //         title:'来料攻略'
        //     }
        // },

        {
            path: '**',
            redirect: '/'
        },
    ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
    // const nextRoute = ['home','crowd','live','auction','user','customer'];
    // let isLogin = true
    // if (nextRoute.indexOf(to.name) >= 0) {
    //     if (!isLogin) {
    //         router.push({ name: 'login' })
    //     }
    // }
    // if (to.name === 'login') {
    //     if (isLogin) {
    //         router.push({ name: 'home' });
    //     }
    // }
    window.document.title = to.meta.title;
    next();
});

export default router;