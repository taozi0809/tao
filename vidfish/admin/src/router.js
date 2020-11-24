import Vue from 'vue'
import Router from 'vue-router'
import {getSessionStore} from "./storage";
import Home from './views/home/home'
Vue.use(Router)


const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [  //这里就是二级路由的配置
          {
              path: '/',
              name: 'index',
              component: () => import('./views/index/index'),
          },
          {
              path: '/videoManage',
              name: 'videoManage',
              component: () => import('./views/video/video'),
          },
          {
              path: '/videoTop',
              name: 'videoTop',
              component: () => import('./views/video/videoTop'),
          },
          {
              path: '/addVideo',
              name: 'addVideo',
              component: () => import('./views/video/addVideo'),
          },
          {
              path: '/videoDetails/:id',
              name: 'videoDetails',
              component: () => import('./views/video/videoDetails'),
          },
          {
              path: '/prevueDetails/:id',
              name: 'prevueDetails',
              component: () => import('./views/prevue/prevueDetails'),
          },
          {
              path: '/tvManage',
              name: 'tvManage',
              component: () => import('./views/tv/tv'),
          },
          {
              path: '/tvTop',
              name: 'tvTop',
              component: () => import('./views/tv/tvTop'),
          },
          {
              path: '/addTv',
              name: 'addTv',
              component: () => import('./views/tv/addTv'),
          },
          {
              path: '/tvDetailsSon/:id/:parentId/:coverPhotoUrl/:backPhotoUrl',
              name: 'tvDetailsSon',
              component: () => import('./views/tv/tvDetailsSon'),
          },
          {
              path: '/tvDetails/:id',
              name: 'tvDetails',
              component: () => import('./views/tv/tvDetails'),
          },
          {
              path: '/addTvs/:id',
              name: 'addTvs',
              component: () => import('./views/tv/addTvs'),
          },
          {
              path: '/prevueManage',
              name: 'prevueManage',
              component: () => import('./views/prevue/prevue'),
          },

          {
              path: '/addPrevue',
              name: 'addPrevue',
              component: () => import('./views/prevue/addPrevue'),
          },
          {
              path: '/channel',
              name: 'channel',
              component: () => import('./views/channel/channel')
          },
          {
              path: '/userManage',
              name: 'userManage',
              component: () => import('./views/account/userManage'),
          },
          {
              path: '/userDetails/:id/:idCode',
              name: 'userDetails',
              component: () => import('./views/account/userDetails'),
          },
          {
              path: '/feedback',
              name: 'feedback',
              component: () => import('./views/account/feedback'),
          },
          {
              path: '/searchRecord',
              name: 'searchRecord',
              component: () => import('./views/account/searchRecord'),
          },
          {
              path: '/carousel',
              name: 'carousel',
              component: () => import('./views/content/carousel'),
          },
          {
              path: '/addCarousel',
              name: 'addCarousel',
              component: () => import('./views/content/addCarousel'),
          },
          {
              path: '/addCarouselTv',
              name: 'addCarouselTv',
              component: () => import('./views/content/addCarouselTv'),
          },
          {
              path: '/startPage',
              name: 'startPage',
              component: () => import('./views/content/startPage'),
          },
          {
              path: '/langPage',
              name: 'langPage',
              component: () => import('./views/content/langPage'),
          },
          {
              path: '/pushMsg',
              name: 'pushMsg',
              component: () => import('./views/content/pushMsg'),
          },
          {
              path: '/actorManage',
              name: 'actorManage',
              component: () => import('./views/content/actorManage'),
          },
          {
              path: '/columnMange',
              name: 'columnMange',
              component: () => import('./views/content/columnMange'),
          },
          {
              path: '/addActor',
              name: 'addActor',
              component: () => import('./views/content/addActor'),
          },
          {
              path: '/actorDetails',
              name: 'actorDetails',
              component: () => import('./views/content/actorDetails'),
          },
          {
              path: '/subtitleManage',
              name: 'subtitleManage',
              component: () => import('./views/content/subtitleManage'),
          },
          {
              path: '/roleManage',
              name: 'roleManage',
              component: () => import('./views/administrator/roleManage')
          },
          {
              path: '/promotionManage',
              name: 'promotionManage',
              component: () => import('./views/administrator/promotionManage')
          },
          {
              path: '/rechargeManage',
              name: 'rechargeManage',
              component: () => import('./views/administrator/rechargeManage')
          },
          {
              path: '/rechargeUserManage',
              name: 'rechargeUserManage',
              component: () => import('./views/administrator/rechargeUserManage')
          },
          {
              path: '/freeManage',
              name: 'freeManage',
              component: () => import('./views/administrator/freeManage')
          },
          {
              path: '/typeManage',
              name: 'typeManage',
              component: () => import('./views/typeManage')
          },
          {
              path: '/help',
              name: 'help',
              component: () => import('./views/help')
          },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login')
    },
    {
        path: '**',
        redirect: '/'
    },
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
    const nextRoute = ['home','index','video','movieAdd','movieResource','tvAdd','tvResource','prevueAdd','prevueResource','account','add','feedback','content','redact','notification','startPage','channelManagement','administrator'];
    let isLogin = getSessionStore('isLogin')
    if (nextRoute.indexOf(to.name) >= 0) {
        if (isLogin!='true') {
            router.push({ name: 'login' })
        }
    }
    if (to.name === 'login') {
        if (isLogin==='true') {
            router.push({ name: 'index' });
        }
    }
    next();
});

export default router;
