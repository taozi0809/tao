import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta:{keepAlive: true,},
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta:{keepAlive: true,},
        },
        {
            path: '/tv',
            name: 'tv',
            component: () => import('./views/tv.vue'),
            meta:{keepAlive: true,},
        },
        {
            path: '/movie',
            name: 'movie',
            component: () => import('./views/movie.vue'),
            meta:{keepAlive: true,},
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('./views/vidfish/vidfish.vue'),
            meta:{keepAlive: false,},
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('./views/history.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path: '/genres/:type',
            name: 'genres',
            component: () => import('./views/genres.vue'),
            meta:{keepAlive: true,},
        },
        {
            path: '/details',
            name: 'details',
            component: () => import('./views/details_a.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path: '/all',
            name: 'all',
            component: () => import('./views/all.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('./views/search.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('./views/account/user'),
            // meta:{keepAlive: false,title: 'Your Account - Vidfish',},
        },
        {
            path: '/pay',
            name: 'pay',
            component: () => import('./views/account/pay'),
            // meta:{keepAlive: false,title: 'Vidfish Pass - Watch Latest VIP Videos, Remove Ads, and More',},
        },
        {
            path: '/sub_account',
            name: 'sub_account',
            component: () => import('./views/account/sub_account'),
            // meta:{keepAlive: false,title: 'Your Sub-Accounts - Vidfish',},
        },
        {
            path: '/member',
            name: 'member',
            component: () => import('./views/account/member'),
            // meta:{keepAlive: false,},
        },
        {
            path: '/forgetPassword',
            name: 'forgetPassword',
            component: () => import('./views/forgetPassword.vue'),
            // meta:{keepAlive: false,},
        },

        {
            path: '/blog_detail',
            name: 'blog_detail',
            component: () => import('./views/vidfish/detail.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path:'/404',
            name:'notFound',
            component: () => import('./views/404/err.vue'),
            // meta:{keepAlive: false,},
        },
        {
            path:'*',
            redirect:'/404'
        }
    ]
})


router.afterEach((to, from, next) => {
    gtag('config', 'UA-118996504-3', {'page_path': to.fullPath});
});


export default router
