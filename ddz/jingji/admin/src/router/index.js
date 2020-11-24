import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/login'
import REVISEPASSWORD from '../views/revisePassword/revisePassword'
import NotFound from '../views/notFound/404'

import store from '../vuex'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)



const routes = [
  {path:'/',redirect:{name:"login"}},
  {path:'/login', name: 'login', component: Login},
  {path:'/revisePassword', name: 'revisePassword', component: REVISEPASSWORD},
  {path:'/home', name: 'home',component: () => import('@/views/home/home'),
    children:[
      {path:'/wd', name:'wd',component: () => import('@/views/wd/wd')},
      {path:'/income', name:'income',component: () => import('@/views/income/income')},
      {path:'/management', name:'management',component: () => import('@/views/management/management')},
      {path:'/player', name:'player',component: () => import('@/views/player/player')},
      {path:'/audit', name:'audit',component: () => import('@/views/audit/audit')},
      {path:'/authority', name:'authority',component: () => import('@/views/authority/authority')},
      {path:'/personal', name: 'personal',component: () => import('@/views/personal/personal')},
      {path:'/proxy', name: 'proxy',component: () => import('@/views/proxy/proxy')},
      {path:'/cashback', name: 'cashback',component: () => import('@/views/cashback/cashback')},

      {path:'/set', name: 'set',component: () => import('@/views/set/set')},

    ]
  },
  {path:'*',component:NotFound},

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  var isLogin = !!store.state.token
  const nextRoute = ['home','/wd','management', 'player','audit','authority', 'personal','proxy','cashback','income'];//未登录没权限进入的页面

  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'login') {
    if (isLogin) {
      next({ name : 'home'})
    }else{
      next();
    }
    return
  }
  if (nextRoute.indexOf(to.name)>= 0) {
    if (!isLogin) {
      next({ name : 'login'})
    }else{
      next()
    }
  }else{
    next()
  }


});

export default router
