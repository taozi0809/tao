import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/index'},
  {path: '/index', name: 'Index', component: () => import('../views/index')},
  {path: '/score', name: 'score', component: () => import('../views/score')},

  {path: '/score/dota2', name: 'score', component: () => import('../views/score/dota2')},
  {path: '/score/csgo', name: 'score', component: () => import('../views/score/csgo')},
  {path: '/score/lol', name: 'score', component: () => import('../views/score/lol')},

  {path: '/schedule', name: 'schedule', component: () => import('../views/schedule')},
  {path: '/league', name: 'league', component: () => import('../views/league')},
  {path: '/league/details', name: 'leagueDetails', component: () => import('../views/league/details')},
  {path: '/live', name: 'live', component: () => import('../views/live')},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass:'active',
  routes
})

export default router
