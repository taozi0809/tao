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

      {path:'/prize', name: 'prize', component: () => import('@/views/prize')},
      {path:'/update', name: 'update', component: () => import('@/views/update')},

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
