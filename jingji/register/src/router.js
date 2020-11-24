import Vue from 'vue'
import Router from 'vue-router'

import Register from './views/register/register'
import Download from './views/download/download'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    },

  ]
})
