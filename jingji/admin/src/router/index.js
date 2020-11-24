import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/login'
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
  {path:'/home', name: 'home',component: () => import('@/views/home/home'),
    children:[
      {
        path:'/user/list',
        name: 'user_list',
        component: () => import('@/views/user/list'),
        children: [
          {path:'info/:accountid', name: 'user_info',component: () => import('@/views/user/info')},
          {path:'race/:accountid', name: 'user_race',component: () => import('@/views/user/race')},
          {path:'log/:accountid', name: 'user_log',component: () => import('@/views/user/log')},
          {path:'details/:matchid', name: 'user_details',component: () => import('@/views/user/details')},

        ],
      },
      {path:'/user/whitelist', name: 'whitelist',component: () => import('@/views/user/whitelist')},

      {
        path:'/race/list',
        name: 'race_list',
        component: () => import('@/views/race/list'),
        children: [
          {path:'report/:id', name: 'race_report',component: () => import('@/views/race/report')},
        ],
      },
      {
        path:'/race/details',
        name: 'race_details',
        component: () => import('@/views/race/details'),
        children: [
          {path:'detail/:id', name: 'race_detail',component: () => import('@/views/race/detail')},
        ]
      },
      {
        path:'/race/abnormal',
        name: 'race_abnormal',
        component: () => import('@/views/race/abnormal'),
        children: [
          {path:'detail/:id', name: 'race_abnormal_detail',component: () => import('@/views/race/detail')},
        ]
      },
      {path:'/race/competition', name: 'competition',component: () => import('@/views/race/competition')},
      {path:'/race/master', name: 'master',component: () => import('@/views/race/master')},
      {path:'/race/profit', name: 'profit',component: () => import('@/views/race/profit')},


      {
        path:'/payment/mall',
        name: 'payment_mall',
        component: () => import('@/views/payment/mall'),
        children: [
          {path:'config/:id', name: 'payment_config',component: () => import('@/views/payment/config')},
          {path:'goods/:id', name: 'payment_goods',component: () => import('@/views/payment/goods')},
        ],
      },
      {path:'/payment/bonus', name: 'payment_bonus',component: () => import('@/views/payment/bonus')},
      {path:'/payment/recording', name: 'payment_recording',component: () => import('@/views/payment/recording')},
      {path:'/payment/offline', name: 'payment_offline',component: () => import('@/views/payment/offline')},

      {path:'/hall/email', name: 'hall_email',component: () => import('@/views/hall/email')},
      {path:'/hall/active', name: 'hall_active',component: () => import('@/views/hall/active')},
      {path:'/hall/bulletin', name: 'hall_bulletin',component: () => import('@/views/hall/bulletin')},
      {path:'/hall/props', name: 'hall_props',component: () => import('@/views/hall/props')},
      {path:'/hall/welfare', name: 'hall_welfare',component: () => import('@/views/hall/welfare')},
      {path:'/hall/share', name: 'hall_share',component: () => import('@/views/hall/share')},
      {path:'/hall/marquee', name: 'hall_marquee',component: () => import('@/views/hall/marquee')},

      {path:'/finance/overview', name: 'finance_overview',component: () => import('@/views/finance/overview')},
      {path:'/finance/recharge', name: 'finance_recharge',component: () => import('@/views/finance/recharge')},
      {path:'/finance/withdraw', name: 'finance_withdraw',component: () => import('@/views/finance/withdraw')},
      {path:'/finance/bonus', name: 'finance_bonus',component: () => import('@/views/finance/bonus')},

      {path:'/data/analysis', name: 'data_analysis',component: () => import('@/views/data/analysis')},
      {path:'/data/match', name: 'data_match',component: () => import('@/views/data/match')},
      {path:'/data/user', name: 'data_user',component: () => import('@/views/data/user')},
      {path:'/data/userAdd', name: 'data_userAdd',component: () => import('@/views/data/userAdd')},
      {path:'/data/recharge', name: 'data_recharge',component: () => import('@/views/data/recharge')},
      {path:'/data/balance', name: 'data_balance',component: () => import('@/views/data/balance')},
      {path:'/data/couponUse', name: 'data_couponUse',component: () => import('@/views/data/couponUse')},
      {path:'/data/bonusGet', name: 'data_bonusGet',component: () => import('@/views/data/bonusGet')},

      {
        path:'/robot/configuration',
        name: 'configuration',
        component: () => import('../views/robot/configuration'),
        children: [
          {path:'details/:match_type', name: 'robot_details', component: () => import('../views/robot/details')}
        ],
      },

      {path:'/set', name: 'set',component: () => import('@/views/set/set')},
      {path:'/feedback', name: 'feedback',component: () => import('@/views/set/feedback')},
      {path:'/sysAccount', name: 'sysAccount',component: () => import('@/views/set/sysAccount')},

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
  const nextRoute = ['home','/user/list','/user/info/:accountid','/user/race/:accountid','/user/log/:accountid','/user/details/:matchid',
    '/race/list','/race/report/:id','/race/details','/race/detail/:id','/payment/mall','/payment/bonus','/payment/offline','/payment/recording',
    '/operation','/finance/overview','/finance/user','/finance/bonus','/finance/agent','/management','/player','/audit','/authority','/race/competition',
    '/payment/config/:id','/feedback',

  ];//未登录没权限进入的页面

  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'login') {
    if (isLogin) {
      router.push({ name: 'home' });
    }
  }
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      router.push({ name: 'login' })
    }
  }
  next();
});

export default router
