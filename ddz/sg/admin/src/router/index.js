import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/login'
import NotFound from '../views/notFound/404'

import store from '../vuex'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:{name:"login"}},
  {path:'/login', name: 'login', component: Login},

  {path:'/home', name: 'home', component: () => import('@/views/home/home'),
    children:[

      {path:'/password', name: 'password', component: () => import('@/views/user/password')},
      {path:'/userList', name: 'userList', component: () => import('@/views/user/userList')},
      {path:'/user_details', name: 'user_details', component: () => import('@/views/user/details')},
      {path:'/chips_record', name: 'chips_record', component: () => import('@/views/user/chips_record')},

      {path:'/overview', name: 'overview', component: () => import('@/views/data_report/overview')},
      {path:'/user_analysis', name: 'user_analysis', component: () => import('@/views/data_report/user_analysis')},
      {path:'/game_match', name: 'game_match', component: () => import('@/views/data_report/game_match')},
      {path:'/game_match_details', name: 'game_match_details', component: () => import('@/views/data_report/game_match_details')},

      {path:'/finance', name: 'finance', component: () => import('@/views/finance/finance')},
      {path:'/wxpay', name: 'usdt_recharge', component: () => import('@/views/finance/wxpay')},
      {path:'/redpacket', name: 'usdt_exchange', component: () => import('@/views/finance/redpacket')},

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
  var isLogin = !!store.state.sg_token
  const nextRoute = ['home',];//未登录没权限进入的页面
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
