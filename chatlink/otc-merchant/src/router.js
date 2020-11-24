import Vue from 'vue'
import Router from 'vue-router'
import CoinBuy from './views/CoinBuy'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
       path: '/',
       name: 'CoinBuy',
       component: CoinBuy,
        meta:{keepAlive: false},
    },
    {
       path: '/CoinSale',
       name: 'CoinSale',
       component: () => import('./views/CoinSale'),
        meta:{keepAlive: false},
    },
    {
        path: '/ConfigureA',
        name: 'ConfigureA',
        component: () => import('./views/ConfigureA'),
        meta:{keepAlive: false},
    },
    {
        path: '/ConfigureBBuy',
        name: 'ConfigureBBuy',
        component: () => import('./views/ConfigureBBuy'),
        meta:{keepAlive: true},
    },
    {
        path: '/ConfigureBSale',
        name: 'ConfigureBSale',
        component: () => import('./views/ConfigureBSale'),
        meta:{keepAlive: true},
    },
    {
        path: '/ConfigureCBuy',
        name: 'ConfigureCBuy',
        component: () => import('./views/ConfigureCBuy'),
        meta:{keepAlive: false},
    },
    {
        path: '/ConfigureCSale',
        name: 'ConfigureCSale',
        component: () => import('./views/ConfigureCSale'),
        meta:{keepAlive: false},
    },
    {
        path: '/EditorSale',
        name: 'EditorSale',
        component: () => import('./views/EditorSale'),
        meta:{keepAlive: false},
    },
    {
        path: '/EditorBuy',
        name: 'EditorBuy',
        component: () => import('./views/EditorBuy'),
        meta:{keepAlive: false},
    },
    {
        path: '/Cim',
        name: 'Cim',
        component: () => import('./views/cim'),
        meta:{keepAlive: false},
    },

  ]
})
