import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../views/notFound/404'
import Login from "../views/login/login"
import Home from "../views/home/home"

import store from '../vuex'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: "/login"
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {path:'homeconfig', name:'homeconfig',component: () => import('@/views/config/homeconfig/homeconfig')},
      {path:'match',name:"match",component: () => import('@/views/config/match/match')},
      {path:'guess/:matchId',name:"guess",component: () => import('@/views/config/match/guess/guess')},
      {path:'bet/:betTypeId/:betTypeName/:type',name:'bet',component: () => import('@/views/config/match/bet/bet')},
      {path:'detail/:betSelectionId', name: 'betdetail', component: () => import('@/views/config/match/bet/detail/detail')},

      {path:'userlist', name: 'userlist', component: () => import('@/views/userlist/userlist')},
    ],
  },
  {path:'*',component:NotFound},

]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = !!store.state.token
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
